import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMapPin, FiSearch, FiMapPin as FiLocationIcon, FiBriefcase } from 'react-icons/fi'

const Banner = ({query, handleInputChange, jobs}) => {
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const searchRef = useRef(null)
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault() // Prevent page refresh
    }

    // Filter jobs as user types
    useEffect(() => {
        if (query && query.length > 1) {
            const searchQuery = query.toLowerCase()
            const filtered = jobs.filter(job => {
                const matchesTitle = job.jobTitle && job.jobTitle.toLowerCase().includes(searchQuery)
                const matchesCompany = job.companyName && job.companyName.toLowerCase().includes(searchQuery)
                const matchesLocation = job.jobLocation && job.jobLocation.toLowerCase().includes(searchQuery)
                return matchesTitle || matchesCompany || matchesLocation
            }).slice(0, 5) // Limit to 5 suggestions
            
            setFilteredSuggestions(filtered)
            setShowSuggestions(filtered.length > 0)
        } else {
            setShowSuggestions(false)
            setFilteredSuggestions([])
        }
    }, [query, jobs])

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSuggestionClick = (jobId) => {
        setShowSuggestions(false)
        navigate(`/job/${jobId}`)
    }

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14'>
      <h1 className='text-5xl font-bold text-primary mb-3'>
        Find your <span className='text-blue '>new job</span> today
      </h1>
      <p className='text-lg text-black/70 mb-8'>Thousands of jobs in the computer, engineering and technology sectors are waiting for you.</p>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-start md:flex-row flex-col md:gap-0 gap-4'>
            {/* Search Input with Suggestions */}
            <div className='relative md:w-1/2 w-full' ref={searchRef}>
                <div className='flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset
                focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                    <input 
                        type="text" 
                        name='title' 
                        id='title' 
                        placeholder='Search by job title, company, or keywords' 
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6'
                        onChange={handleInputChange}
                        value={query}
                        onFocus={() => query.length > 1 && filteredSuggestions.length > 0 && setShowSuggestions(true)}
                    />
                    <FiSearch className='absolute mt-2.5 ml-2 text-gray-400'/>
                </div>
                
                {/* Search Suggestions Dropdown */}
                {showSuggestions && (
                    <div className='absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto'>
                        {filteredSuggestions.map((job) => (
                            <div
                                key={job.id}
                                onClick={() => handleSuggestionClick(job.id)}
                                className='px-4 py-3 hover:bg-blue/5 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors'
                            >
                                <div className='flex items-start gap-3'>
                                    {job.companyLogo && (
                                        <img 
                                            src={job.companyLogo} 
                                            alt={job.companyName}
                                            className='w-10 h-10 object-contain rounded border border-gray-200 flex-shrink-0'
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}
                                    <div className='flex-grow'>
                                        <h4 className='font-semibold text-gray-900 hover:text-blue transition-colors'>
                                            {job.jobTitle}
                                        </h4>
                                        <div className='flex items-center gap-3 mt-1 text-sm text-gray-600'>
                                            <span className='flex items-center gap-1'>
                                                <FiBriefcase className='w-3 h-3' />
                                                {job.companyName}
                                            </span>
                                            {job.jobLocation && (
                                                <span className='flex items-center gap-1'>
                                                    <FiLocationIcon className='w-3 h-3' />
                                                    {job.jobLocation}
                                                </span>
                                            )}
                                        </div>
                                        {(job.minPrice || job.maxPrice) && (
                                            <p className='text-xs text-blue mt-1 font-medium'>
                                                ${job.minPrice} - ${job.maxPrice}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Location Input */}
            <div className='flex md:rounded-s-none rounded shadow-sm ring-1 ring-inset
            focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full'>
                <input type="text" name='location' id='location' placeholder='Location' className='block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0
                sm:text-sm sm:leading-6'
                 />
                 <FiMapPin className='absolute mt-2.5 ml-2 text-gray-400'/>
            </div>
            
            {/* Search Button */}
            <button type='submit' className='bg-blue py-2 px-8 text-white md:rounded-s-none rounded hover:bg-blue-600 transition-colors'>
                Search
            </button>
        </div>
      </form>
    </div>
  )
}

export default Banner
