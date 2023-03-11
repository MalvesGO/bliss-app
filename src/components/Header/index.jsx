import React from 'react'
import { Link } from 'react-router-dom'

import './index.css'

import Logo from '../../assets/logo.png'

const Header = ({health}) => {
  return (
    <div className='header'>
      <Link to='/questions'>
        <img src={Logo} alt='Bliss Logo' />
      </Link>
    </div>
  )
}

export default Header