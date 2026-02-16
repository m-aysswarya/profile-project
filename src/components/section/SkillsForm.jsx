import { useState } from "react";
import { X } from "lucide-react";
import { addSkill, removeSkill } from "../../services/profileService";

const SkillsForm = ({ profile, onClose, onSuccess }) => {
    const [skills, setSkills] = useState(profile?.skills || []);
    const [input, setInput] = useState("");

    const handleAdd = async () => {
        if (!input.trim()) return;

        try {
            const updated = await addSkill(input.trim());
            setSkills(updated);
            onSuccess?.(updated);
            setInput("");
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemove = async (name) => {
        try {
            const updated = await removeSkill(name);
            setSkills(updated);
            onSuccess?.(updated);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col h-full">

            <div className="flex-1 overflow-y-auto px-8 py-6">
                <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100">Skills</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                    {skills.map((skill) => (
                        <div
                            key={skill.name}
                            className="flex items-center gap-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full text-sm"
                        >
                            {skill.name}
                            <X
                                size={14}
                                className="cursor-pointer text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
                                onClick={() => handleRemove(skill.name)}
                            />
                        </div>
                    ))}
                </div>

                <input
                    type="text"
                    value={input}
                    placeholder="Add skill..."
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), handleAdd())
                    }
                    className="w-full border-b border-gray-400 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 py-2 placeholder-gray-400 dark:placeholder-gray-500"
                />
            </div>

            <div className="px-8 py-4 flex justify-end gap-4 bg-white dark:bg-gray-900">
                <button
                    onClick={onClose}
                    className="text-blue-500 dark:text-blue-400 text-sm hover:text-black dark:hover:text-white transition-colors"
                >
                    CANCEL
                </button>

                <button
                    onClick={handleAdd}
                    className="text-blue-500 dark:text-blue-400 text-sm bg-blue-50 dark:bg-blue-900 px-5 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                >
                    ADD
                </button>
            </div>

        </div>
    );
};

export default SkillsForm;
