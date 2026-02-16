import React from 'react';
import Card from '../ui/Card';
import { Sparkles } from 'lucide-react';

const CareerVision = ({ data }) => {
    return (
        <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">
                        Your Career Vision
                    </p>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {data.title}
                    </h2>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-yellow-400">
                    ✨
                </div>
            </div>

            {/* Divider */}
            <div className="border-b border-gray-200 dark:border-gray-600" />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        What you're growing into right now
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {data.currentLevel}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        The space you want to grow in
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {data.growthArea}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Inspired by</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {data.inspiredBy}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default CareerVision;
