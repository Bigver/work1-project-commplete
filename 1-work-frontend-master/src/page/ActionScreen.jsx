import React from 'react'
import action1 from '../assets/action1.png';
import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store.jsx';
import { publicRequest } from "../publicRequest.js";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass , faUser ,  faHeart , faCheck  } from '@fortawesome/free-solid-svg-icons'

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ActionScreen = () => {
  const params = useParams();
  const { id } = params;

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
  useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });



  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`${publicRequest}/post/${id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [id]);


  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 0 : 1;
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };
    const [learn, setLearn] = useState([]);
    useEffect(() => {
      const getLearn = async () => {
        try  {
          const res = await axios.get(`${publicRequest}/users/${userInfo._id}`);
          setLearn(res.data);
        } catch (err) {}
      };
      getLearn();
    }, []);

  const array1 = learn.learn || [];

  const submitHandler = async (e) => {
    array1.push(product._id)
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `${publicRequest}/users/learn/${userInfo._id}`,
        {
          learn: array1
         
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('เรียนแล้ว');
      navigate('/');
    } catch (err) {
      toast.error(err);
      navigate('/login');
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <div className='action-ctn'>
      <div className="img">        
        <img src={product.img} alt="" />
        <div className="btn">
          <button onClick={submitHandler}><FontAwesomeIcon icon={faCheck} style={{color: "#11ff00",}} />เรียนแล้ว</button>
          <button onClick={addToCartHandler}><FontAwesomeIcon icon={faHeart} size="xxl" style={{color: "#ff0000",}} />favorite</button>
        </div>
      </div>
        <div className="details">
            <div className="text">
                <h1>{product.action}</h1>
                <h2>{product.detail}</h2>
                <h1 className='d-1'>การฝึกปฎิบัติ</h1>
                <h2>{product.practice}</h2>
            </div>
            <iframe width="700" height="500"
             src={product.vdo}>
            </iframe>
        </div>
    </div>
  )
}

export default ActionScreen