import React from 'react'
import "./SortFilter.css"

function SortFilter({onSortChange}) {
  return (
    <>
    <div className="sort-container">
        <label htmlFor="sort" className='sort-label'>
            Sort By: 
        </label>
        <select id="sort" onChange={((e)=>{
            onSortChange(e.target.value)
        })}>

            <option value="name">Name</option>
            <option value="featured_desc">Featured</option>
            <option value="popularity_desc">Popularity</option>
            <option value="cashback">Cashback</option>
        </select>
    </div>
    </>
  )
}

export default SortFilter