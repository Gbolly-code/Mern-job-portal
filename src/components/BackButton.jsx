import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

const BackButton = ({ to = null, label = "Back" }) => {
    const navigate = useNavigate()

    const handleBack = () => {
        if (to) {
            navigate(to)
        } else {
            navigate(-1) // Go back to previous page
        }
    }

    return (
        <button
            onClick={handleBack}
            className='flex items-center gap-2 text-primary hover:text-blue transition-colors duration-200 mb-4 group'
        >
            <FiArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200' />
            <span className='font-medium'>{label}</span>
        </button>
    )
}

export default BackButton

