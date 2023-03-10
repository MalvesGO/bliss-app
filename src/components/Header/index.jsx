import React from 'react'

import './index.css'

import Logo from '../../assets/logo.png'

const Header = ({health}) => {
  return (
    <div className='header'>
      <div>
        <img src={Logo} alt="" />
      </div>
    </div>
  )
}

export default Header