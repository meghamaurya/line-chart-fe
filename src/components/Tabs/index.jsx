import React, { useState } from 'react'
import './styles.css'

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
    </div>
  )
}

export default TabsComponent
