import { CirclePlus } from "lucide-react";

const LevelUpItem = ({ title, description, percent, onClick }) => {
    return (
        <div
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex justify-between items-center mb-3 
                 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
            <div>
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                    {title}{" "}
                    <span className="text-green-600 dark:text-green-400 ml-2">{percent}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            </div>

            <CirclePlus
                onClick={onClick}
                className="w-5 h-5 text-blue-500 dark:text-blue-400 cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200"
            />
        </div>
    );
};

export default LevelUpItem;
