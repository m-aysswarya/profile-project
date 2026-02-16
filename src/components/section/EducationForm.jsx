import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { addEducation, updateEducation } from "../../services/profileService";

const EducationForm = ({ existingData, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        college: "",
        degree: "",
        fieldOfStudy: "",
        location: "",
        startDate: "",
        endDate: "",
        currentlyStudying: false,
    });

    useEffect(() => {
        if (existingData) {
            const educationItem = Array.isArray(existingData) ? existingData[0] : existingData;

            setFormData({
                college: educationItem?.college || "",
                degree: educationItem?.degree || "",
                fieldOfStudy: educationItem?.fieldOfStudy || "",
                location: educationItem?.location || "",
                startDate: educationItem?.startDate ? educationItem.startDate.split("T")[0] : "",
                endDate: educationItem?.endDate ? educationItem.endDate.split("T")[0] : "",
                currentlyStudying: educationItem?.currentlyStudying || false,
            });
        } else {
            setFormData({
                college: "",
                degree: "",
                fieldOfStudy: "",
                location: "",
                startDate: "",
                endDate: "",
                currentlyStudying: false,
            });
        }
    }, [existingData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const educationItem = Array.isArray(existingData) ? existingData[0] : existingData;

            if (educationItem?._id) {
                await updateEducation(educationItem._id, formData);
            } else {
                await addEducation(formData);
            }

            onSuccess?.();
            onClose?.();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full text-gray-900 dark:text-gray-100">
            <h2 className="text-lg font-semibold mb-4">
                {existingData ? "Edit Education" : "Add Education"}
            </h2>

            <Input
                label="College *"
                name="college"
                value={formData.college}
                onChange={handleChange}
                required
            />

            <Input
                label="Degree *"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
            />

            <Input
                label="Field of Study *"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                required
            />

            <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Date of Joining"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />

                {!formData.currentlyStudying && (
                    <Input
                        label="Date of Completion"
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                )}
            </div>

            <div className="mt-2">
                <label className="text-sm flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="currentlyStudying"
                        checked={formData.currentlyStudying}
                        onChange={handleChange}
                        className="accent-blue-500 dark:accent-blue-400"
                    />
                    Currently studying here
                </label>
            </div>

            <div className="flex justify-end gap-3 mt-6">
                <Button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="bg-blue-50 dark:bg-blue-900 text-blue-500 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800"
                >
                    {existingData ? "Update" : "Save"}
                </Button>
            </div>
        </form>
    );
};

export default EducationForm;
