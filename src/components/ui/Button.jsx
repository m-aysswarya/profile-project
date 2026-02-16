import React from 'react'

const Button = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="
                flex items-center gap-2 self-center
                bg-blue-200 border-2 border-blue-300/50
                text-blue-500 font-medium px-4 py-2 rounded-lg
            "
        >
            {children}
        </button>
    )
}

export default Button
