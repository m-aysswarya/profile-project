import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import {
    addCertification,
    updateCertification,
} from "../../services/profileService";

const CertificationForm = ({ existingData, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: "",
        provider: "",
        certificateUrl: "",
        certificateId: "",
        issuedDate: "",
        expiryDate: "",
        description: "",
    });

    useEffect(() => {
        if (existingData) {
            const certItem = Array.isArray(existingData) ? existingData[0] : existingData;

            setFormData({
                title: certItem?.title || "",
                provider: certItem?.provider || "",
                certificateUrl: certItem?.certificateUrl || "",
                certificateId: certItem?.certificateId || "",
                issuedDate: certItem?.issuedDate ? certItem.issuedDate.split("T")[0] : "",
                expiryDate: certItem?.expiryDate ? certItem.expiryDate.split("T")[0] : "",
                description: certItem?.description || "",
            });
        } else {
            setFormData({
                title: "",
                provider: "",
                certificateUrl: "",
                certificateId: "",
                issuedDate: "",
                expiryDate: "",
                description: "",
            });
        }
    }, [existingData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const certItem = Array.isArray(existingData)
                ? existingData[0]
                : existingData;

            if (certItem?._id) {
                await updateCertification(certItem._id, formData);
            } else {
                await addCertification(formData);
            }

            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold mb-4">
                {existingData ? "Edit Certification" : "Add Certification"}
            </h2>

            <Input
                label="Certification *"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />

            <Input
                label="Provider *"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
            />

            <Input
                label="Certificate Url"
                name="certificateUrl"
                value={formData.certificateUrl}
                onChange={handleChange}
            />

            <Input
                label="Certificate ID"
                name="certificateId"
                value={formData.certificateId}
                onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Issued Date"
                    type="date"
                    name="issuedDate"
                    value={formData.issuedDate}
                    onChange={handleChange}
                />

                <Input
                    label="Expiry Date"
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                />
            </div>

            <div className="mt-4">
                <label className="text-sm font-medium">
                    Description
                </label>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    maxLength={200}
                    rows={3}
                    className="w-full border rounded-lg p-2 mt-1 text-sm"
                />

                <p className="text-xs text-gray-400 text-right mt-1">
                    max character (200 - {formData.description.length})
                </p>
            </div>

            <div className="flex justify-end gap-3 mt-6">
                <Button type="button" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
};

export default CertificationForm;
