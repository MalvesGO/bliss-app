import React from 'react'
import './index.css'

const Search = ({ handleSearch, handleInputChange, handleClearClick, filter }) => {
    return (
        <div className='search'>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search" value={filter} onChange={handleInputChange}/>
                <div className='actions'>
                    <button className='button' type="submit">Search</button>
                    <button className='button' onClick={handleClearClick}>Clear</button>
                </div>
            </form>
        </div>
        // <div className='search'>
        //     <input type='text' placeholder='Search by keyword' value={search} onChange={(e) => setSearch(e.target.value)} />
        //     <div className='actions'>
        //         {
        //             search.length > 2 &&
        //             <button className='button' onClick={() => fetchQuestions()}>Search</button>
        //         }
        //         <button className='button' onClick={() => {
        //                 setSearch('')
        //                 fetchQuestions()
        //             }}>Cancel</button>
        //     </div>
        // </div>
    )
}

export default Search