import { useState, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Container from '../components/layout/Container'
import ProfileHeader from '../components/profile/ProfileHeader'
import CareerVision from '../components/profile/CareerVision'
import LevelUpCard from '../components/profile/LevelUpCard'
import Skills from '../components/profile/Skills'
import Experience from '../components/profile/Experience'
import Education from '../components/profile/Education'
import Certification from '../components/profile/Certification'
import { getProfile } from '../services/profileService'
import Modal from '../components/ui/Modal'

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    const openModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalType(null);
    };
    const fetchProfile = async () => {
        try {
            const data = await getProfile();
            setProfile(data);
        } catch (error) {
            console.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);
    if (loading) return <p>Loading...</p>;
    if (!profile) return <p>No profile found.</p>;

    return (
        <div className='bg-[#f6f7f9] dark:bg-gray-900 min-h-screen'>
            <Navbar />
            <Container>
                <ProfileHeader profile={profile} />
                <CareerVision data={profile.careerVision} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <div className="space-y-2">
                        <LevelUpCard profile={profile} onAdd={openModal} />
                        <Skills
                            skills={profile?.skills}
                            profile={profile}
                            onAdd={() => openModal("skills")}
                            onUpdate={(updatedSkills) =>
                                setProfile({ ...profile, skills: updatedSkills })
                            }
                        />

                    </div>

                    <div className="space-y-2 lg:col-span-2">
                        <Experience
                            data={profile.experiences}
                            onAdd={() => openModal("experience")}
                            refreshProfile={fetchProfile}
                        />

                        <Education
                            data={profile.education}
                            onAdd={() => openModal("education")}
                            refreshProfile={fetchProfile}
                        />

                        <Certification
                            data={profile.certifications}
                            onAdd={() => openModal("certification")}
                            refreshProfile={fetchProfile}
                        />
                    </div>
                </div>
            </Container>
            <Modal
                open={modalOpen}
                onClose={closeModal}
                type={modalType}
                profile={profile}
                onSuccess={async () => {
                    await fetchProfile();
                    closeModal();
                }}
            />

        </div>
    )
}

export default ProfilePage
