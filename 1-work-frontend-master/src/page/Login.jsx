import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { publicRequest } from "../publicRequest.js";

export default function Login() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(`${publicRequest}/users/signin`, {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error("รหัสผ่านหรือ email ไม่ถูกต้อง");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className='user-container'>
      <div className="user-1">
        <div>
          <title>เข้าสู่ระบบ</title>
        </div>
        <h1 className="my-3">เข้าสู่ระบบ</h1>
        <div className='form-ctn-1'>
          <form onSubmit={submitHandler} className='container-form'>
            <div className="input" controlId="email">
              <label>Email</label>
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input" controlId="password">
              <label>Password</label>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-btn">
              <button type="submit">Sign In</button>
            </div>
            <div className="new-user">
              <h1> New customer?{' '}<Link to={`/register?redirect=${redirect}`}>Create your account</Link><br/></h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}