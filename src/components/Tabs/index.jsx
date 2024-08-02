import React from 'react';
import './styles.css';
import { MdOpenInFull } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

const TabsComponent = ({activeTab ,setActiveTab}) => {
  const tabs = ['Summary', 'Chart', 'Statistics', 'Analysis', 'Settings']
  
  return (
    <div className='tab-container'>
      <div className='tabs'>
        {tabs.map((tab) => {
            return(
                <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
            )
        })}
      </div>
      <div className='links'>
        <div className='full-screen'>
        <MdOpenInFull />
          <p>Fullscreen</p>
        </div>
        <div className='compare'>
        <IoIosAddCircleOutline />
          <p>Compare</p>
        </div>
      </div>
    </div>
  )
}

export default TabsComponent
