import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { publicRequest } from "../publicRequest";

export default function Register() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await Axios.post(`${publicRequest}/users/signup`, {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error("Email นี้มีการลงทะเบียนแล้ว");
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
            <title>สมัครสมาชิก</title>
        </div>
        <h1 className="my-3">สมัครสมาชิก</h1>
        <div  className='form-ctn-1'>
            <form onSubmit={submitHandler} className='container-form'> 
            <div className="input" controlId="name">
                <label>Name</label>
                <input onChange={(e) => setName(e.target.value)} required />
            </div>

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
                <div className="input" controlId="confirmPassword">
                <label>Confirm Password</label>
                <input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                </div>
            </div>
            <div className="input-btn">
                <button type="submit">Sign Up</button>
            </div>
            <div className="new-user">
                <h1>Already have an account?{' '}<Link to={`/login?redirect=${redirect}`}>Sign-In</Link></h1>
            </div>
            </form>
        </div>
        </div>
    </div>
  );
}
