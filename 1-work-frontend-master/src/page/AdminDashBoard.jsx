import React from 'react'
import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store.jsx';
import { publicRequest } from "../publicRequest.js";
import { toast } from 'react-toastify';

const AdminDashBoard = () => {
    const [user, setUser] = useState([]);
    const [action, setAction] = useState([]);
    const { state } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();

    useEffect(() => {
      const getLocaion = async () => {
        try  {
          const res = await axios.get(`${publicRequest}/users`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          setUser(res.data);
        } catch (err) {}
      };
      getLocaion();
    }, []);

    useEffect(() => {
        const getLocaion = async () => {
          try  {
            const res = await axios.get(`${publicRequest}/post`, {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            setAction(res.data);
          } catch (err) {}
        };
        getLocaion();
      }, []);
    useEffect(() => {
        const getLocaion = async () => {
          try  {
            const res = await axios.get(`${publicRequest}/users`, {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            setUser(res.data);
          } catch (err) {}
        };
        getLocaion();
      }, []);

      const deleteHandler = async (item) => {
        if (window.confirm('Are you sure to delete?')) {
          try {
            await axios.delete(`${publicRequest}/post/${item._id}`, {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            toast.success('product deleted successfully');
            navigate('/admin');
          } catch (err) {
            toast.error(err);
          }
        }
      };
  return (
    <div className='admin-ctn'>
        <div class="container">
            <table class="responsive-table">
                <caption>สมาชิก ({user.length} คน)</caption>
                <thead>
                <tr>
                     <th scope="col">ID</th>
                    <th scope="col">ชื่อ</th>
                    <th scope="col">Email</th>
                </tr>
                </thead>
                <tfoot>
                </tfoot>
                <tbody>
                {user.map((item) => (
                    <tr>
                    <th scope="row">{item._id}</th>
                    <th scope="row">{item.name}</th>
                    <td data-title="Released">{item.email}</td>
                </tr>
                ))}
                </tbody>
            </table>
        </div>
        <div class="container">
            <table class="responsive-table">
                <caption> ({action.length} ท่า) <a href="/add">เพิ่มท่า(Click)</a></caption>
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">ท่า</th>
                    <th scope="col">แก้ไข/ลบ</th>
                </tr>
                </thead>
                <tfoot>
                </tfoot>
                <tbody>
                {action.map((item) => (
                    <tr>
                    <th scope="row">{item._id}</th>
                    <td data-title="Released">{item.action}</td>
                    <td data-title="Released" >
                        <div className='edit'>
                            <Link to={`/edit/${item._id}`}><button>Edit</button></Link>
                            <button className='delete'  onClick={() => deleteHandler(item)}>Delete</button>
                        </div>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AdminDashBoard