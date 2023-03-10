import React from 'react'
import './index.css'

import Logo from '../../assets/logo.png'

const Loading = () => {
  return (
    <div className="main">
        <div className="loading">
            <img src={Logo} alt="logo" className="logo"/>
            <div className="animation-bar"></div>
        </div>
    </div>
  )
}

export default Loading