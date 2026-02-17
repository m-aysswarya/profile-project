import React, { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button';
import { Download, EllipsisVertical, Instagram, Mail, Settings, Share2, UserPen, UserStar } from 'lucide-react';
import Modal from '../ui/Modal';
import toast from 'react-hot-toast';

const ProfileHeader = ({ profile }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const openModal = (type) => {
        setModalType(type);
        setModalOpen(true);
        setOpen(false);
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Profile link copied!");
            setOpen(false);
        } catch (err) {
            toast.error("Failed to copy link");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm pt-6 pb-4 px-6 mt-2 transition-colors duration-300">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <img
                            src={profile?.profilePic || "https://ui-avatars.com/api/?name=User&background=random"}
                            alt="profile"
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover shrink-0"
                        />
                        <div>
                            <h2 className="text-md font-semibold text-gray-900 dark:text-gray-100 inline">
                                {profile.user.firstName} {profile.user.lastName}
                            </h2>
                            <span className="text-gray-700 dark:text-gray-300 font-semibold ml-2">
                                ( {profile.role} )
                            </span>
                            <p className="text-gray-500 dark:text-gray-400">{profile.location}</p>
                        </div>
                    </div>
                    <div className="relative" ref={dropdownRef}>
                        <EllipsisVertical
                            className="self-center cursor-pointer text-gray-700 dark:text-gray-300"
                            onClick={() => setOpen(!open)}
                        />
                        {open && (
                            <div className="absolute right-0 lg:left-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-lg border border-gray-100 dark:border-gray-600 py-2 z-50 rounded-md animate-in fade-in zoom-in-95">
                                {[
                                    { type: 'profile', icon: <UserPen size={14} className="text-blue-500" />, label: 'Edit Profile' },
                                    { type: 'share', icon: <Share2 size={14} className="text-blue-500" />, label: 'Share Profile' },
                                    { type: 'social', icon: <Instagram size={14} className="text-blue-500" />, label: 'Add Socials' },
                                    { type: 'career', icon: <UserStar size={14} className="text-blue-500" />, label: 'Career Vision' },
                                    { type: 'settings', icon: <Settings size={14} className="text-blue-500" />, label: 'Settings', red: true },
                                ].map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            if (item.type === "share") {
                                                handleShare();
                                            } else if (item.type !== "settings") {
                                                openModal(item.type);
                                            }
                                        }}
                                        className={`flex items-center gap-3 px-4 py-2 text-left text-xs w-full transition-colors duration-200
                      hover:bg-gray-100 dark:hover:bg-gray-600
                      text-gray-900 dark:text-gray-100`}
                                    >
                                        {item.icon} {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <p className="mt-3 p-2 text-gray-800 dark:text-gray-200">{profile.bio}</p>

                <div className="flex flex-col md:flex-row justify-between gap-4">

                    <div className="flex flex-col gap-2 items-center lg:items-baseline">
                        <p className="flex items-center gap-2 text-blue-500">
                            <Mail className="w-5 h-5" />
                            <span>{profile.user.email}</span>
                        </p>
                        <a href="/resume.pdf" download>
                            <Button>
                                <Download className="w-4 h-4" />
                                Download Resume
                            </Button>
                        </a>
                    </div>

                    <div className="w-full lg:w-64 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-6 py-4 transition-colors duration-300">
                        <div className="grid grid-cols-3 gap-6 text-center place-items-center">
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-xs text-gray-500 dark:text-gray-400">League</p>
                                <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{profile.league.name}</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Rank</p>
                                <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{profile.league.rank}</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Points</p>
                                <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{profile.league.points}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal
                open={modalOpen}
                type={modalType}
                profile={profile}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
};

export default ProfileHeader;
