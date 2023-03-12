import React from 'react'
import './index.css'

const Search = ({ handleSearch, handleInputChange, handleClearClick, filter }) => {
    return (
        <div className='search'>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search" value={filter} onChange={handleInputChange}/>
                <div className='actions'>
                    {
                        filter.length > 2 &&
                        <button className='button' type="submit">Search</button>
                    }
                    <button className='button' onClick={handleClearClick}>Clear</button>
                </div>
            </form>
        </div>
    )
}

export default Search