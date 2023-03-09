import React from 'react'

const Search = () => {

    const [search, setSearch] = React.useState('')

    return (
        <div>
            <h1>Search</h1>
            <input
                type="text"
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value)
                }}
            />
        </div>
    )
}

export default Search