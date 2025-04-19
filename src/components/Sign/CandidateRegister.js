import "./SignUtils/CSS/Sign.css";
import "./SignUtils/CSS/CandidateRegister.css";
import "./SignUtils/CSS/style.css.map";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../helper";
import { useNavigate } from 'react-router-dom';

const CandidateRegister = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        party: '',
        bio: '',
        image: null,
        symbol: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.post(`${BASE_URL}/createCandidate`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success("Candidate Created Successfully!", {
                    className: "toast-message",
                });
                setTimeout(() => {
                    navigate('/Candidate');
                }, 2000);
            } else {
                toast.error("Invalid Details. Please try again!", {
                    className: "toast-message",
                });
            }
        } catch (error) {
            console.error("Error creating candidate:", error);
            toast.error("Something went wrong. Please try again!", {
                className: "toast-message",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <section className="Candidatesignup">
                <div className="FormTitle">
                    <h2>New Candidate</h2>
                </div>

                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <ToastContainer />
                            <form onSubmit={handleSubmit} encType="multipart/form-data" className="register-form" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="fullName"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Candidate Name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="age"><i className="zmdi zmdi-calendar"></i></label>
                                    <input
                                        type="number"
                                        name="age"
                                        id="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="Candidate Age"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="party"><i className="zmdi zmdi-flag"></i></label>
                                    <input
                                        type="text"
                                        name="party"
                                        id="party"
                                        value={formData.party}
                                        onChange={handleChange}
                                        placeholder="Party Name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bio"><i className="zmdi zmdi-comment"></i></label>
                                    <input
                                        type="text"
                                        name="bio"
                                        id="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Candidate Bio"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image"><i className="zmdi zmdi-camera"></i></label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="symbol"><i className="zmdi zmdi-label"></i></label>
                                    <input
                                        type="file"
                                        name="symbol"
                                        id="symbol"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        required
                                    />
                                </div>
                                <div className="form-group form-button">
                                    <button type="submit" disabled={loading} className="form-submit">
                                        {loading ? <div className="spinner"></div> : 'Create Candidate'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CandidateRegister;
