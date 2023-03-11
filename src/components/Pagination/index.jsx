import React from 'react'
import './index.css'

const Pagination = ({offset, setOffset, limit, total}) => {
    return (
        <div className='pagination'>
            <button className='button' onClick={() => setOffset(offset - limit)} disabled={offset === 0}>Prev</button>
            <button className='button' onClick={() => setOffset(offset + limit)}>Next</button>
        </div>
    )
}

export default Pagination