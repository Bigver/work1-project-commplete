import React from 'react'
import logo from '../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass , faUser ,  faHeart  } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';


const Navbar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };
  return (
    <div className='navbar-ctn'>
        <div className="logo">     
        <Link to={`/`} ><img src="https://i.pinimg.com/originals/a1/11/9e/a1119e66edaaf7d022d8d3efc2b10402.jpg" alt="" /></Link>    
        </div>
        <div className="search-bar">
            {userInfo ?  (
                <div className='login'>
                   <a onClick={signoutHandler}><FontAwesomeIcon icon={faUser} /> ออกจากระบบ</a>
               </div>
            ) : (
              <div className='login'>
               <a href="/login"><FontAwesomeIcon icon={faUser} /> Login</a>
              </div>
            )}
            {userInfo && userInfo.isAdmin ?  (
              <div className='login'>
                  <a href='/admin'> ADMIN</a>
              </div>
            ) : ""}
              <div className="heart">
                    <a href="/cart"><FontAwesomeIcon icon={faHeart} size="xxl" style={{color: "#ff0000",}} /></a>
              </div>
        </div>
    </div>
  )
}

export default Navbar