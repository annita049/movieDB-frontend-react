import React from 'react'

const Search = ({searchString, setSearchString}) => {

  console.log(searchString);
  return (
    <div className='search text-white text-3xl'>
        <div>
            <img src="search.svg" alt="search" />

            <input
            type="text"
            placeholder='search movies ...'
            value={searchString}
            onChange = {(e)=> setSearchString(e.target.value)}
            />
        </div>
        {/* <h1>{setSearchString}</h1> */}
    </div>
  )
}

export default Search