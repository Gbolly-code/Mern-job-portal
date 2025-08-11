import React from 'react'
import Location from './Location'
import Salary from './Salary'

const Sidebar = ({handleChange, handleClick, salaryType}) => {
  return (
    <div className='space-y-5'>
      <h3 className='text-lg font-bold mb-2'>Filters</h3>

      <Location handleChange={handleChange}/>
      <Salary handleChange={handleChange} handleClick={handleClick} salaryType={salaryType}/>
    </div>
  )
}

export default Sidebar
