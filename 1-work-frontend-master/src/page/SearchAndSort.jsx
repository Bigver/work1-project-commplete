import React, { useState, useEffect } from 'react';
import { Link  } from 'react-router-dom';
import axios from "axios";
import { publicRequest } from "../publicRequest";
import { faMagnifyingGlass , faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchAndSort = () => {
  const initialData = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' },
    { id: 4, name: 'Grapes' },
    // Add more data as needed
  ];

  const [content, setContent] = useState([]);
  useEffect(() => {
    const getLocaion = async () => {
      try  {
        const res = await axios.get(`${publicRequest}/post`);
        setContent(res.data);
      } catch (err) {}
    };
    getLocaion();
  }, []);
  const [data, setData] = useState(content);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    // Filter data based on the search term
    const filteredData = content.filter(item =>
      item.action.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered data alphabetically
    const sortedFilteredData = [...filteredData].sort((a, b) =>
      a.action.localeCompare(b.action)
    );

    setSortedData(sortedFilteredData);
  }, [searchTerm]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='bar'>
      <input
        type="text"
        placeholder="ค้นหาท่า"
        value={searchTerm}
        onChange={handleSearch}
      />
       <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      <ul>
        {sortedData.map(item => (
          <li key={item._id}><Link to={`/action/${item._id}`} className='link'>{item.action}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default SearchAndSort;