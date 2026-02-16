import { useEffect, useState } from "react";
import { Select } from "../ui/Input";
import Input from "../ui/Input";
import { updateCareerVision } from "../../services/profileService";

const CareerVisionForm = ({ profile, onClose, onSuccess }) => {
    const [role, setRole] = useState("");
    const [title, setTitle] = useState("");
    const [growthArea, setGrowthArea] = useState("");
    const [inspiredBy, setInspiredBy] = useState("");
    const [currentLevel, setCurrentLevel] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (profile) {
            setRole(profile.role || "");
            setTitle(profile?.careerVision?.title || "");
            setGrowthArea(profile?.careerVision?.growthArea || "");
            setInspiredBy(profile?.careerVision?.inspiredBy || "");
            setCurrentLevel(profile?.careerVision?.currentLevel || "");
        }
    }, [profile]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await updateCareerVision({
                role,
                title,
                growthArea,
                inspiredBy,
                currentLevel,
            });

            onSuccess?.(data.data);
            onClose?.();
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
        >
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-10 py-6 space-y-5">
                <h2 className="text-lg font-semibold">Career Vision</h2>

                <Select
                    label="What best describes you? *"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    options={[
                        { label: "Fresher / Graduate", value: "Fresher / Graduate" },
                        { label: "Working Professional", value: "Working Professional" },
                        { label: "Student", value: "Student" },
                    ]}
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />

                <Input
                    label="What is your long-term career aspiration? *"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />

                <Input
                    label="Aspirational Field *"
                    value={growthArea}
                    onChange={(e) => setGrowthArea(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />

                <Input
                    label="Who is your inspiration? *"
                    value={inspiredBy}
                    onChange={(e) => setInspiredBy(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />

                <Select
                    label="What are you aiming for right now? *"
                    value={currentLevel}
                    onChange={(e) => setCurrentLevel(e.target.value)}
                    options={[
                        { label: "Entry Level Professional", value: "Entry Level Professional" },
                        { label: "Mid Level Professional", value: "Mid Level Professional" },
                        { label: "Senior Professional", value: "Senior Professional" },
                    ]}
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
            </div>

            {/* Fixed Footer */}
            <div className="border-t px-10 py-4 flex justify-end gap-4 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <button
                    type="button"
                    onClick={onClose}
                    className="text-blue-500 dark:text-blue-400 text-sm hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                    CANCEL
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="text-blue-500 dark:text-blue-400 text-sm bg-blue-50 dark:bg-blue-900 px-5 py-2 rounded-lg disabled:opacity-50 transition-colors duration-200"
                >
                    {loading ? "Updating..." : "UPDATE"}
                </button>
            </div>
        </form>
    );
};

export default CareerVisionForm;
