import React, { useState, useRef, useEffect } from "react";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { Award, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { deleteCertification } from "../../services/profileService";
import { formatMonthYear } from "../helper/formDate";

const Certification = ({ data = [], onAdd, refreshProfile }) => {
    const [openId, setOpenId] = useState(null);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteCertification(id);
            refreshProfile();
            setOpenId(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <SectionHeader
                title="Certifications"
                onAdd={() => onAdd(null)}
            />

            {data.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                    🎖️ Add Your Certifications!
                </p>
            ) : (
                data.map((cert) => (
                    <div
                        key={cert._id}
                        className="flex justify-between items-start py-2 border-b last:border-b-0 border-gray-200 dark:border-gray-600 relative"
                    >
                        {/* Left Side */}
                        <div className="flex gap-4 flex-1 min-w-0">
                            <div className="w-14 h-14 shrink-0 bg-blue-50 dark:bg-blue-900 flex items-center justify-center rounded-lg">
                                <Award className="text-blue-500 dark:text-blue-400" size={22} />
                            </div>

                            <div className="min-w-0">
                                <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                    {cert.title}
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                                    {cert.provider}
                                </p>

                                {cert.certificateId && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        ID NO: {cert.certificateId}
                                        {cert.certificateUrl && (
                                            <a
                                                href={cert.certificateUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-500 dark:text-blue-400 ml-2 hover:underline"
                                            >
                                                Certificate Link
                                            </a>
                                        )}
                                    </p>
                                )}

                                {cert.issuedDate && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Provided on: {formatMonthYear(cert.issuedDate)}
                                    </p>
                                )}
                                {cert.expiryDate && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Expires: {formatMonthYear(cert.expiryDate)}
                                    </p>
                                )}
                                {cert.description && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {cert.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Dropdown */}
                        <div className="relative shrink-0" ref={dropdownRef}>
                            <MoreVertical
                                className="w-5 h-5 text-gray-500 dark:text-gray-300 cursor-pointer"
                                onClick={() => setOpenId(openId === cert._id ? null : cert._id)}
                            />

                            {openId === cert._id && (
                                <div className="absolute right-0 lg:left-0 mt-2 w-28 bg-white dark:bg-gray-700 shadow-lg border border-gray-100 dark:border-gray-600 py-2 z-50 rounded-md transition-colors duration-300">
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 w-full text-left text-xs text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                                        onClick={() => onAdd(cert)}
                                    >
                                        <Pencil size={14} className="text-blue-500 dark:text-blue-400" />
                                        Edit
                                    </button>

                                    <button
                                        className="flex items-center gap-2 px-4 py-2 w-full text-left text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition-colors duration-200"
                                        onClick={() => handleDelete(cert._id)}
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

export default Certification;
