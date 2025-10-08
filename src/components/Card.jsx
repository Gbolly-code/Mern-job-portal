import React from 'react'
import { Link } from 'react-router-dom';
import {FiCalendar, FiClock, FiDollarSign, FiMapPin} from 'react-icons/fi'

const Card = ({data}) => {
    const {id, companyName, jobTitle, companyLogo, minPrice, maxPrice, salaryType, jobLocation, employmentType, postingDate, description} = data;
  return (

    <section className='card p-5 mb-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-xl hover:border-blue/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer group'>
       <Link to={`/job/${id}`} className='flex gap-4 flex-col sm:flex-row items-start'>
         {companyLogo && (
           <img 
             src={companyLogo} 
             alt={companyName}
             className='h-16 w-16 object-contain rounded-md border border-gray-100 p-2 group-hover:border-blue/30 transition-colors duration-300'
             onError={(e) => e.target.style.display = 'none'}
           />
         )}
         <div className='flex-grow'>
            <h4 className='text-gray-600 mb-1 group-hover:text-blue transition-colors duration-300'>{companyName}</h4>
            <h3 className='text-lg font-bold mb-2 text-primary group-hover:text-blue transition-colors duration-300'>{jobTitle}</h3>

            <div className='text-gray-600 text-sm flex flex-wrap gap-3 mb-3'>
                <span className='flex items-center gap-1.5'>
                  <FiMapPin className='text-blue' /> 
                  {jobLocation}
                </span>
                <span className='flex items-center gap-1.5'>
                  <FiClock className='text-blue' /> 
                  {employmentType}
                </span>
                <span className='flex items-center gap-1.5 font-semibold text-blue'>
                  <FiDollarSign /> 
                  ${minPrice}-{maxPrice}k
                </span>
                <span className='flex items-center gap-1.5'>
                  <FiCalendar className='text-blue' /> 
                  {postingDate}
                </span>
            </div>
            <p className='text-gray-600 text-sm line-clamp-2'>{description}</p>
         </div>
       </Link>
    </section>
  )
}

export default Card
