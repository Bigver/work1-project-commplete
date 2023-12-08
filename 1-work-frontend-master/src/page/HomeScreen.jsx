import React from 'react'
import img1 from '../assets/img1.jpg'
import Content from '../components/Content'

import SearchAndSort from './SearchAndSort'

const HomeScreen = () => {
  return (
    <div className='home-ctn'>
        <div className="text" data-aos="zoom-in" data-aos-duration="3000">
            <img src="https://www.rtarf.mi.th/assets/images/sol.png" alt="" />
            <h1>คู่มือการฝึก<br/>ว่าด้วย<br/>ฝึกบุคคลท่ามือเปล่า</h1>
        </div>
        <div>
          <div className="search-bar1">
            <form action="">
                <SearchAndSort/>
            </form>
          </div>
            <Content/>
        </div>
    </div>
  )
}

export default HomeScreen
