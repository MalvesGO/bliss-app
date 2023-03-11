import React from 'react'
import './index.css'

const Pagination = ({offset, setOffset, limit, total}) => {
    return (
        <div className='pagination'>
            <button className='button' onClick={() => setOffset(offset - limit)} disabled={offset === 0}>Anterior</button>
            <b>PAGE: {offset / limit + 1} - RESULTS: {total}</b>
            <button className='button' onClick={() => setOffset(offset + limit)}>Próximo</button>
        </div>
    )
}

export default Pagination