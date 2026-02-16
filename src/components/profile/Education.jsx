import React, { useState, useEffect, useRef } from "react";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { MoreVertical, GraduationCap, Pencil, Trash2 } from "lucide-react";
import { deleteEducation } from "../../services/profileService";
import { formatMonthYear } from "../helper/formDate";

const Education = ({ data = [], onAdd, refreshProfile }) => {
    const [openId, setOpenId] = useState(null);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteEducation(id);
            refreshProfile();
            setOpenId(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <SectionHeader title="Education" onAdd={onAdd} />

            {data.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                    🎓 Add Your Education!
                </p>
            ) : (
                data.map((item) => (
                    <div
                        key={item._id}
                        className="flex justify-between items-start py-2 border-b last:border-b-0 border-gray-200 dark:border-gray-600 relative"
                    >
                        <div className="flex gap-4">
                            {/* Icon */}
                            <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                            </div>

                            {/* Text Section */}
                            <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                    {item.degree} - {item.fieldOfStudy}
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{item.college}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatMonthYear(item.startDate)} —{" "}
                                    {item.currentlyStudying
                                        ? "Present"
                                        : formatMonthYear(item.endDate)}
                                </p>
                            </div>
                        </div>

                        {/* Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <MoreVertical
                                className="w-5 h-5 text-gray-500 dark:text-gray-300 cursor-pointer"
                                onClick={() =>
                                    setOpenId(openId === item._id ? null : item._id)
                                }
                            />

                            {openId === item._id && (
                                <div className="absolute right-0 lg:left-0 mt-2 w-28 bg-white dark:bg-gray-700 shadow-lg border border-gray-100 dark:border-gray-600 py-2 z-50 rounded-md transition-colors duration-300">
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 w-full text-left text-xs text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                                        onClick={() => onAdd(item)}
                                    >
                                        <Pencil size={14} className="text-blue-500 dark:text-blue-400" />
                                        Edit
                                    </button>

                                    <button
                                        className="flex items-center gap-2 px-4 py-2 w-full text-left text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition-colors duration-200"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        <Trash2 size={14} className="text-red-500 dark:text-red-400" />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </Card>
    );
};

export default Education;
