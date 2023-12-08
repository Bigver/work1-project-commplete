import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Store } from '../Store';
import { publicRequest } from "../publicRequest"


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};

const AddAction = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState('');
    const [detail, setDetail] = useState('');
    const [practice, setPractice] = useState('');
    const [img, setImg] = useState('');
    const [vdo, setVdo] = useState('');
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
              `${publicRequest}/post`,
              {
                action,
                slug : action,
                detail,
                practice,
                img,
                vdo
              },
            {
            headers: { Authorization: `Bearer ${userInfo.token}` },
            }
            );
            toast.success('add successfu');
            navigate('/admin');
          }
         catch (err) {
          toast.error(err);
        }
      };

      const uploadFileHandler = async (e, forImages) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        try {
          dispatch({ type: 'UPLOAD_REQUEST' });
          const { data } = await axios.post(`${publicRequest}/upload`, bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: `Bearer ${userInfo.token}`,
            },
          });
          dispatch({ type: 'UPLOAD_SUCCESS' });
    
        
          setImg(data.secure_url);
          
          toast.success('Image uploaded successfully. click Update to apply it');
        } catch (err) {
          toast.error(err);
          dispatch({ type: 'UPLOAD_FAIL', err });
        }
      };

      
  return (
   <div>
         <div className='form-ctn'>
        <form onSubmit={submitHandler} className='container-form'>
          <div  className="input" controlId="name">
            <label>ท่า</label>
            <input
              value={action}
              onChange={(e) => setAction(e.target.value)}
              required
            />
          </div>
          <div className="input" controlId="slug">
            <label>รายละเอียด</label>
            <input
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              required
            />
          </div>
          <div className="input" controlId="name">
            <label>วิธีปฎิบัติ</label>
            <input
              value={practice}
              onChange={(e) => setPractice(e.target.value)}
              required
            />
          </div>
          <div className="input" controlId="image">
            <label>รูปภาพ</label>
            <input
              value={img}
              onChange={(e) => setImg(e.target.value)}
              required
            />
          </div>
          <div className="input-img" controlId="additionalImageFile">
            <label>Upload Image</label>
            <input
              type="file"
              onChange={(e) => uploadFileHandler(e, true)}
            />
          </div>
          <div className="input" controlId="image">
            <label>ลิ้งวีดีโอสอน</label>
            <input
              value={vdo}
              onChange={(e) => setVdo(e.target.value)}
              required
            />
          </div>
          <div className="input-btn">
            <button type="submit">
              เพิ่มท่า
            </button>
          </div>
        </form>
        </div>
    </div>
  )
}

export default AddAction