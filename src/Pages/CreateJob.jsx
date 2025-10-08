import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import { postJob } from '../services/firebaseService'
import BackButton from '../components/BackButton'

const CreateJob = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
      if (isSubmitting) return; // Prevent multiple submissions
      
      // Basic validation
      if (!data.jobTitle || !data.companyName || !data.postedBy) {
        alert('Please fill in all required fields (Job Title, Company Name, and Email)');
        return;
      }
      
      console.log('Form submitted with data:', data);
      setIsSubmitting(true);
      data.skills = selectedOption;
      
      console.log('Posting job to Firebase...');
      postJob(data)
        .then((result) => {
          console.log('Job posted successfully:', result);
          alert('Job posted successfully!');
          reset();
          setSelectedOption(null);
        })
        .catch(error => {
          console.error('Error posting job:', error);
          alert('Error posting job: ' + error.message);
        })
        .finally(() => {
          console.log('Post job process completed');
          setIsSubmitting(false);
        });
    };

    const options = [
        {value: 'Javascript', label: 'Javascript'},
        {value: 'C++', label: 'C++'},
        {value: 'HTML', label: 'HTML'},
        {value: 'CSS', label: 'CSS'},
        {value: 'Node', label: 'Node'},
        {value: 'React', label: 'React'},
        {value: 'MongoDB', label: 'MongoDB'},
        {value: 'Redux', label: 'Redux'},
    ]


  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <BackButton to="/" label="Back to Home" />
      {/* form */}
      <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

            {/* first row */}
            <div className='create-job-flex'>
             <div className='lg:w-1/2 w-full'>
               <label className='block mb-2 text-lg'>Job Title</label>
                <input type="text" defaultValue={"Web Developer"} {...register("jobTitle")} 
                className='create-job-input'/>
             </div>
             <div className='lg:w-1/2 w-full'>
               <label className='block mb-2 text-lg'>Company Name</label>
                <input type="text" placeholder="Ex: Microsoft" {...register("companyName")} 
                className='create-job-input'/>
             </div>
            </div>

            {/* second row */}
            <div className='create-job-flex'>
             <div className='lg:w-1/2 w-full'>
               <label className='block mb-2 text-lg'>Minimum Salary</label>
                <input type="text" placeholder="$20k" {...register("minPrice")} 
                className='create-job-input'/>
             </div>
             <div className='lg:w-1/2 w-full'>
               <label className='block mb-2 text-lg'>Maximum Salary</label>
                <input type="text" placeholder="$120k" {...register("maxPrice")} 
                className='create-job-input'/>
             </div>
            </div>

            {/*3rd row */}
            <div className='create-job-flex'>
             <div className='lg:w-1/2 w-full'>
               <label className='block mb-2 text-lg'>Salary Type</label>
                <select {...register("salaryType")} className='create-job-input'>
                     <option value="">Choose your salary</option>
                     <option value="Hourly">Hourly</option>
                     <option value="Monthly">Monthly</option>
                     <option value="Yearly">Yearly</option>
                </select>
             </div>
             <div className='lg:w-1/2 w-full'>
               <label className='block mb-2 text-lg'>Job Location</label>
                <input type="text" placeholder="Ex: New York" {...register("jobLocation")} 
                className='create-job-input'/>
             </div>
            </div>

            {/*4th row*/}
            <div className='create-job-flex'>
                <div className='lg:w-1/2 w-full'>
               <label className='block mb-2 text-lg'>Job Posting Date</label>
                <input type="date" placeholder="Ex: 2025-08-11" {...register("postingDate")} 
                className='create-job-input'/>
             </div>
             <div className='lg:w-1/2 w-full'>
               <label className='block mb-2 text-lg'>Experience Level</label>
                <select {...register("experienceLevel")} className='create-job-input'>
                     <option value="">Choose your experience</option>
                     <option value="NoExperience">No Experience</option>
                     <option value="Internship">Internship</option>
                     <option value="Entry">Entry Level</option>
                     <option value="Mid-level">Mid-level</option>
                     <option value="Senior">Senior</option>
                </select>
             </div>
            </div>

            {/*5th row*/}
            <div>
                <label className='block mb-2 text-lg'>Required Skill Sets:</label>
                  <CreatableSelect
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  isMulti
                  className='create-job-input py-4 '/>

            </div>

            {/* 6th row */}
            
            <div className='create-job-flex'>
                <div className='lg:w-1/2 w-full'>
               <label className='block mb-2 text-lg'>Company Logo</label>
                <input type="url" placeholder="Paste your company logo URL: https://weshare.com/img1" {...register("companyLogo")} 
                className='create-job-input'/>
             </div>
             <div className='lg:w-1/2 w-full'>
               <label className='block mb-2 text-lg'>Employment Type</label>
                <select {...register("employmentType")} className='create-job-input'>
                     <option value={""}>Choose your employment</option>
                     <option value={"full-time"}>Full-Time</option>
                     <option value={"Part-time"}>Part-time</option>
                     <option value={"Temporary"}>Temporary</option>
                </select>
             </div>
            </div>

            {/* 7th row */}
            <div className='w-full'>
                <label className='block mb-2 text-lg'>Job Description</label>
                <textarea className='w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700'
                rows={6}
                defaultValue={"Mollit in laborum tempur lorem incidunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incidunt eiusmod culpa. laborum tempor lorem incidunt."}
                placeholder='job decription'
                {...register("description")}/>
            </div>

            {/* last row */}
            <div className='w-full'>
               <label className='block mb-2 text-lg'>Job Posted By</label>
                <input 
                type="email" 
                placeholder="your email" 
                {...register("postedBy")} 
                className='create-job-input'/>
            </div>

            <input 
                type="submit" 
                value={isSubmitting ? "Posting Job..." : "Post Job"}
                disabled={isSubmitting}
                className={`block mt-12 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer ${
                    isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue hover:bg-blue-600'
                }`}
            />
        </form>

      </div>
    </div>
  )
}

export default CreateJob
