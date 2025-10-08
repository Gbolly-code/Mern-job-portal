import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getJobById } from '../services/firebaseService'
import BackButton from '../components/BackButton'
import { FiCalendar, FiClock, FiDollarSign, FiMapPin, FiBriefcase, FiUser } from 'react-icons/fi'

const JobDetails = () => {
    const {id} = useParams()
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getJobById(id)
            .then(data => {
                setJob(data)
                setLoading(false)
            })
        .catch(error => {
            console.error('Error fetching job:', error);
                setLoading(false)
        });
    }, [id])

    const handleApply = async () => {
      const { value: url } = await Swal.fire({
            title: 'Apply for this position',
         input: "url",
            inputLabel: "Portfolio/Resume URL",
            inputPlaceholder: "Enter your portfolio or resume URL",
            showCancelButton: true,
            confirmButtonText: 'Submit Application',
            confirmButtonColor: '#3575E2',
        });
        
if (url) {
            Swal.fire({
                title: 'Application Submitted!',
                text: `Your application has been submitted successfully.`,
                icon: 'success',
                confirmButtonColor: '#3575E2',
            });
        }
    }
    
    if (loading) {
        return (
            <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-12'>
                <BackButton to="/" label="Back to Jobs" />
                <div className='text-center py-20'>
                    <p className='text-lg'>Loading job details...</p>
                </div>
            </div>
        )
    }

    if (!job) {
        return (
            <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-12'>
                <BackButton to="/" label="Back to Jobs" />
                <div className='text-center py-20'>
                    <p className='text-lg text-red-600'>Job not found</p>
                </div>
            </div>
        )
    }
    
  return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-8'>
            <BackButton to="/" label="Back to Jobs" />
            
            {/* Job Header */}
            <div className='bg-white rounded-lg shadow-lg p-8 mb-6'>
                <div className='flex flex-col md:flex-row gap-6 items-start'>
                    {/* Company Logo */}
                    {job.companyLogo && (
                        <div className='flex-shrink-0'>
                            <img 
                                src={job.companyLogo} 
                                alt={job.companyName}
                                className='w-24 h-24 object-contain rounded-lg border border-gray-200 p-2'
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                }}
                            />
                        </div>
                    )}
                    
                    {/* Job Title and Company */}
                    <div className='flex-grow'>
                        <h1 className='text-3xl font-bold text-primary mb-2'>{job.jobTitle}</h1>
                        <h2 className='text-xl text-gray-600 mb-4'>{job.companyName}</h2>
                        
                        {/* Quick Info Icons */}
                        <div className='flex flex-wrap gap-4 text-gray-600'>
                            {job.jobLocation && (
                                <div className='flex items-center gap-2'>
                                    <FiMapPin className='text-blue' />
                                    <span>{job.jobLocation}</span>
                                </div>
                            )}
                            {job.employmentType && (
                                <div className='flex items-center gap-2'>
                                    <FiClock className='text-blue' />
                                    <span>{job.employmentType}</span>
                                </div>
                            )}
                            {(job.minPrice || job.maxPrice) && (
                                <div className='flex items-center gap-2'>
                                    <FiDollarSign className='text-blue' />
                                    <span>
                                        ${job.minPrice} - ${job.maxPrice}
                                        {job.salaryType && ` (${job.salaryType})`}
                                    </span>
                                </div>
                            )}
                            {job.experienceLevel && (
                                <div className='flex items-center gap-2'>
                                    <FiBriefcase className='text-blue' />
                                    <span>{job.experienceLevel}</span>
                                </div>
                            )}
                            {job.postingDate && (
                                <div className='flex items-center gap-2'>
                                    <FiCalendar className='text-blue' />
                                    <span>Posted: {job.postingDate}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Apply Button */}
                    <div className='flex-shrink-0'>
                        <button 
                            className='bg-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-md'
                            onClick={handleApply}
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Job Details */}
            <div className='grid md:grid-cols-3 gap-6'>
                {/* Main Content */}
                <div className='md:col-span-2 bg-white rounded-lg shadow-lg p-8'>
                    {/* Job Description */}
                    <div className='mb-8'>
                        <h3 className='text-2xl font-bold text-primary mb-4'>Job Description</h3>
                        <div className='text-gray-700 leading-relaxed whitespace-pre-line'>
                            {job.description || 'No description available.'}
                        </div>
                    </div>

                    {/* Required Skills */}
                    {job.skills && job.skills.length > 0 && (
                        <div className='mb-8'>
                            <h3 className='text-2xl font-bold text-primary mb-4'>Required Skills</h3>
                            <div className='flex flex-wrap gap-2'>
                                {job.skills.map((skill, index) => (
                                    <span 
                                        key={index}
                                        className='bg-blue/10 text-blue px-4 py-2 rounded-full text-sm font-medium'
                                    >
                                        {skill.value || skill.label || skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Apply Section */}
                    <div className='border-t pt-6'>
                        <button 
                            className='bg-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-md w-full md:w-auto'
                            onClick={handleApply}
                        >
                            Apply for this Position
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className='space-y-6'>
                    {/* Job Overview */}
                    <div className='bg-white rounded-lg shadow-lg p-6'>
                        <h3 className='text-xl font-bold text-primary mb-4'>Job Overview</h3>
                        <div className='space-y-4'>
                            {job.jobLocation && (
                                <div>
                                    <div className='flex items-center gap-2 text-gray-600 mb-1'>
                                        <FiMapPin className='text-blue' />
                                        <span className='font-semibold'>Location</span>
                                    </div>
                                    <p className='text-gray-700 ml-6'>{job.jobLocation}</p>
                                </div>
                            )}
                            
                            {job.employmentType && (
                                <div>
                                    <div className='flex items-center gap-2 text-gray-600 mb-1'>
                                        <FiClock className='text-blue' />
                                        <span className='font-semibold'>Job Type</span>
                                    </div>
                                    <p className='text-gray-700 ml-6'>{job.employmentType}</p>
                                </div>
                            )}
                            
                            {(job.minPrice || job.maxPrice) && (
                                <div>
                                    <div className='flex items-center gap-2 text-gray-600 mb-1'>
                                        <FiDollarSign className='text-blue' />
                                        <span className='font-semibold'>Salary</span>
                                    </div>
                                    <p className='text-gray-700 ml-6'>
                                        ${job.minPrice} - ${job.maxPrice}
                                        {job.salaryType && <span className='text-sm'> ({job.salaryType})</span>}
                                    </p>
                                </div>
                            )}
                            
                            {job.experienceLevel && (
                                <div>
                                    <div className='flex items-center gap-2 text-gray-600 mb-1'>
                                        <FiBriefcase className='text-blue' />
                                        <span className='font-semibold'>Experience</span>
                                    </div>
                                    <p className='text-gray-700 ml-6'>{job.experienceLevel}</p>
                                </div>
                            )}
                            
                            {job.postingDate && (
                                <div>
                                    <div className='flex items-center gap-2 text-gray-600 mb-1'>
                                        <FiCalendar className='text-blue' />
                                        <span className='font-semibold'>Posted On</span>
                                    </div>
                                    <p className='text-gray-700 ml-6'>{job.postingDate}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Posted By */}
                    {job.postedBy && (
                        <div className='bg-white rounded-lg shadow-lg p-6'>
                            <h3 className='text-xl font-bold text-primary mb-4'>Contact</h3>
                            <div className='flex items-center gap-2 text-gray-600'>
                                <FiUser className='text-blue' />
                                <span className='font-semibold'>Posted by:</span>
                            </div>
                            <p className='text-gray-700 ml-6 mt-1'>{job.postedBy}</p>
                        </div>
                    )}
                </div>
            </div>
    </div>
  )
}

export default JobDetails
