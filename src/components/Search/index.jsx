import React from 'react'
import './index.css'

const Search = ({ search, setSearch, fetchQuestions }) => {
    return (
        <div className='search'>
            <input type='text' placeholder='Search by keyword' value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className='actions'>
                {
                    search.length > 2 &&
                    <button className='button' onClick={() => fetchQuestions()}>Search</button>
                }
                <button className='button' onClick={() => {
                        setSearch('')
                        fetchQuestions()
                    }}>Cancel</button>
            </div>
        </div>
    )
}

export default Search