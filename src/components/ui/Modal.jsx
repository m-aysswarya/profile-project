import React, { useEffect } from "react";
import { X } from "lucide-react";
import ProfileForm from "../section/ProfileForm";
import SocialForm from "../section/SocialForm";
import CareerVisionForm from "../section/CareerVisionForm";
import SkillsForm from "../section/SkillsForm";
import ExperienceForm from "../section/ExperienceForm";
import EducationForm from "../section/EducationForm";
import CertificationForm from "../section/CertificationForm";

const Modal = ({ open, onClose, type, profile, onSuccess }) => {
    useEffect(() => {
        if (open) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [open]);

    if (!open) return null;

    const renderContent = () => {
        switch (type) {
            case "profile":
                return <ProfileForm onClose={onClose} profile={profile} onSuccess={onSuccess} />;
            case "social":
                return <SocialForm onClose={onClose} onSuccess={onSuccess} />;
            case "career":
                return <CareerVisionForm profile={profile} onClose={onClose} onSuccess={onSuccess} />;
            case "skills":
                return <SkillsForm profile={profile} onClose={onClose} onSuccess={onSuccess} />;
            case "experience":
                return (
                    <ExperienceForm
                        onClose={onClose}
                        onSuccess={onSuccess}
                        existingData={profile?.experiences?.[0] || null}
                    />
                );
            case "education":
                return (
                    <EducationForm
                        onClose={onClose}
                        onSuccess={onSuccess}
                        existingData={profile?.education?.[0] || null}
                    />
                );
            case "certification":
                return (
                    <CertificationForm
                        onClose={onClose}
                        onSuccess={onSuccess}
                        existingData={profile?.certifications?.[0] || null}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-start bg-black/50 backdrop-sm overflow-y-auto scrollbar-hide">
            <div className="relative mt-10 w-[95%] md:w-xl max-h-[90vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-2xl rounded-lg transition-colors duration-300 flex flex-col">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full transition-colors duration-200 z-10"
                >
                    <X size={18} />
                </button>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Modal;
