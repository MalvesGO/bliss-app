import { useState, useEffect } from 'react'

import api from '../../services/api'

const Health = ({health}) => {

    return (
        <div className='health'>
            <h1>Server Status: {health}</h1>
        </div>
    )
}

export default Health