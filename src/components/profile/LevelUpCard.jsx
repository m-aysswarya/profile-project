import React from 'react';
import Card from '../ui/Card';
import LevelUpItem from '../ui/LevelUpItem';

const LevelUpCard = ({ profile, onAdd }) => {
    const educationDone = !!profile?.education?.length;
    const experienceDone = !!profile?.experiences?.length;
    const certificationDone = !!profile?.certifications?.length;

    const total = 3;
    const completed = [educationDone, experienceDone, certificationDone].filter(Boolean).length;
    const progress = Math.round((completed / total) * 100);

    return (
        <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <h3 className="font-semibold mb-2">🎓 Level Up Profile</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Just a few clicks away from awesomeness!
            </p>

            {/* Progress */}
            <p className="text-sm mb-2 text-gray-700 dark:text-gray-200">Progress: {progress}%</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-4">
                <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Level Up Items */}
            {!certificationDone && (
                <LevelUpItem
                    title="Upload Your Certificates"
                    description="Showcase your achievements"
                    percent="+10%"
                    onClick={() => onAdd('certification')}
                />
            )}
            {!experienceDone && (
                <LevelUpItem
                    title="Add Your Experience"
                    description="Tell us where you've worked"
                    percent="+20%"
                    onClick={() => onAdd('experience')}
                />
            )}
            {!educationDone && (
                <LevelUpItem
                    title="Add Your Education"
                    description="Add your academic background"
                    percent="+20%"
                    onClick={() => onAdd('education')}
                />
            )}
        </Card>
    );
};

export default LevelUpCard;
