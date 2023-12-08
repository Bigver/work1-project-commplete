import React from 'react'
import action1 from '../assets/action1.png';
import { Link  } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { publicRequest } from "../publicRequest";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import { Store } from '../Store';


const Content = () => {
  const [content, setContent] = useState([]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state
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

  useEffect(() => {
    const getLocaion = async () => {
      try  {
        const res = await axios.get(`${publicRequest}/post`);
        setContent(res.data);
      } catch (err) {}
    };
    getLocaion();
  }, []);

  const array1 = learn.learn || [];
  const array2 = [];
  content.map((item) => ( array2.push( item._id )))
  const commonElementsArray = array1.filter(value => array2.includes(value));
  
  return (
    <div className='content-ctn'>
        <div className="content">
            {content.map((item) => (        
                <div className="card" data-aos="fade-up" data-aos-duration="500">
                    {commonElementsArray.includes(item._id)  ? (
                      <div className="learn">
                        <h1>เรียนแล้ว</h1>
                      </div>
                      ) : ""}
                    <img src={item.img} alt="" />
                    <h1>{item.action}</h1>
                    <Link to={`/action/${item._id}`} >
                        <button>คลิกเพื่อดูรายละเอียด</button>
                    </Link>            
                </div>
            ))}          
        </div>
    </div>
  )
}

export default Content