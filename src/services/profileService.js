import API from "../api/axios";

export const getProfile = async () => {
    const { data } = await API.get("/profile");
    return data;
};

export const updateProfile = (formData) => {
    return API.put("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const addSocial = async (socialData) => {
    const { data } = await API.post("/profile/social", socialData);
    return data;
};

export const updateCareerVision = async (careerData) => {
    const { data } = await API.put("/profile/career-vision", careerData);
    return data;
};

export const addSkill = async (name) => {
    const { data } = await API.post("/profile/skills", { name });
    return data;
};

export const removeSkill = async (name) => {
    const { data } = await API.delete("/profile/skills", {
        data: { name },
    });
    return data;
};

export const addExperience = async (experienceData) => {
    const { data } = await API.post("/profile/experience", experienceData);
    return data;
};

export const updateExperience = async (id, experienceData) => {
    const { data } = await API.put(`/profile/experience/${id}`, experienceData);
    return data;
};

export const deleteExperience = async (id) => {
    const { data } = await API.delete(`/profile/experience/${id}`);
    return data;
};

export const addEducation = async (educationData) => {
    const { data } = await API.post("/profile/education", educationData);
    return data;
};

export const updateEducation = async (id, educationData) => {
    const { data } = await API.put(`/profile/education/${id}`, educationData);
    return data;
};

export const deleteEducation = async (id) => {
    const { data } = await API.delete(`/profile/education/${id}`);
    return data;
};

export const addCertification = async (certificationData) => {
    const { data } = await API.post("/profile/certification", certificationData);
    return data;
};

export const updateCertification = async (id, certificationData) => {
    const { data } = await API.put(`/profile/certification/${id}`, certificationData);
    return data;
};

export const deleteCertification = async (id) => {
    const { data } = await API.delete(`/profile/certification/${id}`);
    return data;
};
