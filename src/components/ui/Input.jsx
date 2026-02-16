import React from 'react'

const Input = ({ label, disabled, ...props }) => {
    return (
        <div className="mt-3">
            <label className="text-sm font-medium text-gray-500">{label}</label>
            <input
                {...props}
                disabled={disabled}
                className={`w-full border dark:border-gray-700 border-gray-400 rounded-sm p-2 mt-1 text-sm hover:border-black focus:outline-none focus:ring-1 focus:ring-blue-500
                    ${disabled ? "text-gray-400 cursor-not-allowed hover:border-gray-400" : ""}`}
            />
        </div>
    )
}

export default Input

export const Select = ({ label, value, onChange, options }) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">{label}</label>

            <select
                value={value}
                onChange={onChange}
                className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
                <option value="">Select</option>
                {options.map((option) => (
                    <option
                        className='dark:bg-gray-800'
                        key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};


