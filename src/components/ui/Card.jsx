import React from 'react'

const Card = ({ children }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md px-5 py-6 mt-2 text-gray-700 dark:text-gray-200">
            {children}
        </div>
    )
}

export default Card
