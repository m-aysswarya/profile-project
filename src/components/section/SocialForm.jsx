import { useState } from "react";
import Input, { Select } from "../ui/Input";
import { addSocial } from "../../services/profileService";

export const SocialForm = ({ onClose, onSuccess }) => {
    const [platform, setPlatform] = useState("");
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!platform || !link) return;

        try {
            setLoading(true);
            const data = await addSocial({ platform, link });
            onSuccess?.(data.data);
            onClose?.();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
        >
            <div className="flex-1 overflow-y-auto px-10 py-6 space-y-5">
                <h2 className="text-lg font-semibold">Add Social</h2>

                <Select
                    label="Social Media *"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    options={[
                        { label: "LinkedIn", value: "LinkedIn" },
                        { label: "Instagram", value: "Instagram" },
                        { label: "GitHub", value: "GitHub" },
                    ]}
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />

                <Input
                    label="Link *"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://..."
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
            </div>

            <div className="px-4 py-2 flex justify-end gap-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <button
                    type="button"
                    onClick={onClose}
                    className="text-blue-500 dark:text-blue-400 text-sm"
                >
                    CANCEL
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="text-blue-500 dark:text-blue-400 text-sm bg-blue-50 dark:bg-blue-900 px-5 py-2 rounded-lg disabled:opacity-50 transition-colors duration-200"
                >
                    ADD
                </button>
            </div>
        </form>
    );
};

export default SocialForm;
