import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeartCircleMinus } from '@fortawesome/free-solid-svg-icons'
import { publicRequest } from "../publicRequest";
import { Store } from '../Store';
import { useContext } from 'react';


const CartScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const checkoutHandler = () => {
    navigate('/');
  };
  return (
    <div className='content-ctn1'>
        {
            cartItems.length === 0 ? (
                <div className="text-none">
                    <div className='text-ctn'>
                         <h1>ยังไม่มีท่าที่ถูกใจ</h1>
                         <a href="/">กลับไปหน้าแรก</a>
                    </div>
                </div>
            ) : " "
        }
        <div className="content">
            {cartItems.map((item) => (               
                <div className="card" data-aos="fade-up" data-aos-duration="500">
                    <img src={item.img} alt="" />
                    <div className="text">
                        <h1>{item.action}</h1>
                        <Link to={`/action/${item._id}`} >
                            <button>คลิกเพื่อดูรายละเอียด</button>
                        </Link>           
                    </div> 
                    <button className='btn-2' onClick={() => removeItemHandler(item)}><FontAwesomeIcon icon={faHeartCircleMinus} style={{color: "#ff004c",}} /></button>
                </div>
            ))}          
        </div>
</div>
  )
}

export default CartScreen