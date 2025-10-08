import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Jobs from './Jobs'
import Card from '../components/Card'
import Sidebar from '../sidebar/Sidebar'
import Newsletter from '../components/Newsletter'
import { getAllJobs } from '../services/firebaseService'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [salaryType, setSalaryType] = useState('Hourly');
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setIsCurrentPage] = useState(1)
  const [query, setQuery] = useState("")
  const itemsPerPage = 6

  useEffect(() => {
    setIsLoading(true)
    getAllJobs()
      .then(data => {
        setJobs(data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching jobs:', error)
        setIsLoading(false)
      })
  }, [])

  // Reset to page 1 when search query or category changes
  useEffect(() => {
    setIsCurrentPage(1)
  }, [query, selectedCategory])

  // Handle input change 
  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  // Enhanced search - filter jobs by multiple fields
  const filteredItems = jobs.filter((job) => {
    if (!query) return true; // If no search query, return all jobs
    
    const searchQuery = query.toLowerCase();
    
    // Search across multiple fields
    const matchesTitle = job.jobTitle && job.jobTitle.toLowerCase().includes(searchQuery);
    const matchesCompany = job.companyName && job.companyName.toLowerCase().includes(searchQuery);
    const matchesLocation = job.jobLocation && job.jobLocation.toLowerCase().includes(searchQuery);
    const matchesDescription = job.description && job.description.toLowerCase().includes(searchQuery);
    const matchesEmploymentType = job.employmentType && job.employmentType.toLowerCase().includes(searchQuery);
    const matchesExperience = job.experienceLevel && job.experienceLevel.toLowerCase().includes(searchQuery);
    
    // Check if any skills match
    const matchesSkills = job.skills && job.skills.length > 0 && 
      job.skills.some(skill => {
        const skillValue = skill.value || skill.label || skill;
        return skillValue && skillValue.toLowerCase().includes(searchQuery);
      });
    
    return matchesTitle || matchesCompany || matchesLocation || 
           matchesDescription || matchesEmploymentType || 
           matchesExperience || matchesSkills;
  })

  // Radio Filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  // Button-based filtering for salary type
  const handleSalaryTypeClick = (event) => {
    setSalaryType(event.target.value)
  }

  // Calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return {startIndex, endIndex}
  }

  // Function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setIsCurrentPage(currentPage + 1)
    }
  }

  // Function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setIsCurrentPage(currentPage - 1)
    }
  }

  // Main filtering function 
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    // Filtering input items
    if (query) {
      filteredJobs = filteredItems;
    }

    // Category filtering 
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({ 
          jobLocation, 
          maxPrice, 
          experienceLevel, 
          salaryType, 
          employmentType, 
          postingDate, 
        }) =>
        (jobLocation && jobLocation.toLowerCase() === selected.toLowerCase()) || 
        (maxPrice && parseInt(maxPrice) <= parseInt(selected)) ||
        (postingDate && postingDate >= selected) ||
        (salaryType && salaryType.toLowerCase() === selected.toLowerCase()) ||
        (experienceLevel && experienceLevel.toLowerCase() === selected.toLowerCase()) ||
        (employmentType && employmentType.toLowerCase() === selected.toLowerCase())
      );
    }

    // Slice the data based on current page
    const {startIndex, endIndex} = calculatePageRange()
    filteredJobs = filteredJobs.slice(startIndex, endIndex)
    return filteredJobs.map((data, i) => <Card key={i} data={data} />)
  }
  
  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} jobs={jobs} />

{/*main content*/}
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
        {/*left side*/}
        <div className='bg-white p-4 rounded'>
          <Sidebar 
            handleChange={handleChange} 
            handleClick={handleSalaryTypeClick}
            salaryType={salaryType}
          />
          </div>

        {/* job cards*/}
        <div className='col-span-2 bg-white p-4 rounded-sm'>
          {
            isLoading ? (<p className='font-medium'>Loading...</p>) : result.length > 0 ? (<Jobs result={result}/>)
            : <><h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3> <p>No data found</p>
            </>
  
          }

          {/* pagination here */}
          {
            result.length > 0 ? (
            <div className='flex justify-center mt-4 space-x-8'>
              <button onClick={prevPage}disabled={currentPage === 1} className='hover:underline'>Previous</button>
              <span className='mx-2'>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
              <button onClick={nextPage}disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
              className='hover:underline'>Next</button>
            </div>
            ) : "" 
          }
          </div>

        {/*right side */}
        <div className='bg-white p-4 rounded'><Newsletter/></div>
        
      </div>
    </div>
  )
}

export default Home