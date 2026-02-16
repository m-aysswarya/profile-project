import { useState, useEffect } from "react";
import { Camera, CloudUpload } from "lucide-react";
import Input from "../ui/Input";
import { updateProfile } from "../../services/profileService";

export const ProfileForm = ({ profile, onClose, onSuccess }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [resume, setResume] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (profile) {
            setFirstName(profile.user.firstName || "");
            setLastName(profile.user.lastName || "");
            setLocation(profile.location || "");
            setBio(profile.bio || "");
            setImagePreview(profile.profilePic || "");
        }
    }, [profile]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResume(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("location", location);
        formData.append("bio", bio);

        if (profilePic) formData.append("profilePic", profilePic);
        if (resume) formData.append("resume", resume);

        try {
            const data = await updateProfile(formData);
            onSuccess?.(data.data); // update parent state
            onClose?.();
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="py-6 px-6 md:px-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300"
        >
            <div className="flex flex-col items-center mb-6">
                <div className="relative">
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="profile"
                            className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                        />
                    ) : (
                        <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                            No Image
                        </div>
                    )}

                    <label className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full cursor-pointer shadow-md">
                        <Camera size={16} className="text-white" />
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
            </div>

            <div className="space-y-4">
                <Input
                    label="First Name *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />

                <Input
                    label="Last Name *"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />

                <Input
                    label="Email ID *"
                    value={profile?.user?.email || ""}
                    disabled
                    className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                />

                <Input
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
            </div>

            <div className="mt-5">
                <label className="text-sm font-medium">Bio</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength={500}
                    rows={4}
                    className="w-full border border-gray-400 dark:border-gray-600 rounded-sm p-2 mt-1 text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:border-black dark:hover:border-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">
                    {bio.length} / 500
                </p>
            </div>

            <div className="mt-6 border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 rounded-md 
                 flex flex-col items-center justify-center text-center gap-3 relative">

                <CloudUpload size={50} className="text-neutral-300" />

                <input
                    type="file"
                    id="resumeUpload"
                    onChange={handleResumeChange}
                    className="hidden"
                />
                <label
                    htmlFor="resumeUpload"
                    className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-black dark:hover:text-white"
                >
                    Upload Resume
                </label>
                {resume && (
                    <p className="text-xs text-center text-blue-500 dark:text-blue-400 mt-1">
                        Selected: {resume.name}
                    </p>
                )}
            </div>


            <div className="flex justify-end gap-4 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="text-blue-500 dark:text-blue-400 text-sm cursor-pointer"
                >
                    CANCEL
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="text-blue-500 dark:text-blue-400 text-sm cursor-pointer bg-blue-50 dark:bg-blue-900 px-5 py-2 rounded-lg disabled:opacity-50 transition-colors duration-200"
                >
                    {loading ? "Updating..." : "UPDATE"}
                </button>
            </div>
        </form>
    );
};

export default ProfileForm;
