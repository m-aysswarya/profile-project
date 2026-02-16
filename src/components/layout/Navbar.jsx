import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="bg-white dark:bg-gray-950 px-6 py-4 flex justify-between items-center shadow-sm transition-colors duration-300">
            {/* Left: Logo + Menu */}
            <div className="flex items-center gap-12">
                <h2 className="text-xl font-serif font-semibold text-gray-900 dark:text-gray-100">
                    Gidy
                </h2>

                <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                    <span className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Jobs</span>
                    <span className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Hackathons</span>
                    <span className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Projects</span>
                    <span className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Tasks</span>
                    <span className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Organization</span>
                </div>
            </div>

            {/* Right: Theme Toggle + Avatar */}
            <div className="flex gap-4 items-center">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-8 h-8 rounded-full flex items-center justify-center 
                     bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors"
                >
                    {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
                </button>

                {/* Avatar / Initial */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center 
                        bg-blue-500 text-white font-semibold hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors">
                    A
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
