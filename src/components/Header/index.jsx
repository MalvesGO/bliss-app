import React from 'react'

import './index.css'

const Header = ({health}) => {
  return (
    <div className='header'>
      <div>
        <h1>Bliss Applications</h1>
      </div>
      <div>
        <h2>Server status</h2>
      </div>
    </div>
  )
}

export default Header