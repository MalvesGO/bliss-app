import React from 'react'
import './index.css'

const Search = ({ search, setSearch, fetchQuestions, cancelSearch }) => {
    return (
        <div className='search'>
            <input type='text' placeholder='Pesquisar' value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className='actions'>
                <button className='button' onClick={() => fetchQuestions()}>Pesquisar</button>
                <button className='button' onClick={() => cancelSearch()}>Cancelar</button>
            </div>
        </div>
    )
}

export default Search