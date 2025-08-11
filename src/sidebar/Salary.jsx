
import React from 'react'
import Button from './Button'
import InputField from '../components/InputField'

const salaryRanges = {
  Hourly: [
    { value: 10, title: '< $10/hr' },
    { value: 20, title: '< $20/hr' },
    { value: 40, title: '< $40/hr' },
    { value: 60, title: '< $60/hr' },
  ],
  Monthly: [
    { value: 3000, title: '< $3,000/mo' },
    { value: 5000, title: '< $5,000/mo' },
    { value: 8000, title: '< $8,000/mo' },
    { value: 10000, title: '< $10,000/mo' },
  ],
  Yearly: [
    { value: 30000, title: '< $30,000/yr' },
    { value: 50000, title: '< $50,000/yr' },
    { value: 80000, title: '< $80,000/yr' },
    { value: 100000, title: '< $100,000/yr' },
  ],
}

const Salary = ({handleChange, handleClick, salaryType}) => {
  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>Salary</h4>
      <div className='mb-4'>
        <Button onClickHandler={handleClick} value="" title="Hourly"/>
        <Button onClickHandler={handleClick} value="Monthly" title="Monthly"/>
        <Button onClickHandler={handleClick} value="Yearly" title="Yearly"/>
      </div>

      <div>
        <label className='sidebar-label-container'>
            <input 
            type="radio"
            name="test"
            id="test"
            value="" 
            onChange={handleChange}/>
            <span className='checkmark'></span>All
        </label>

        <InputField 
        handleChange={handleChange} 
        value={30} 
        title="< 30000k" 
        name="test2"
        />
        <InputField 
        handleChange={handleChange} 
        value={50} 
        title="< 50000k" 
        name="test2"
        />
        <InputField 
        handleChange={handleChange} 
        value={80} 
        title="< 80000k" 
        name="test2"
        />
        <InputField 
        handleChange={handleChange} 
        value={100} 
        title="< 100000k" 
        name="test2"
        />
      </div>
    </div>
  )
}

export default Salary
