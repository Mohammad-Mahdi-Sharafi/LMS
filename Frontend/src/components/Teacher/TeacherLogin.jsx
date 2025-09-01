import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherLogin() {
    const [teacherLoginData, setTeacherLoginData] = useState({
        email: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (event) => {
        setTeacherLoginData({
            ...teacherLoginData,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault(); // prevent default reload
        const teacherFormData = new FormData();
        teacherFormData.append("email", teacherLoginData.email);
        teacherFormData.append("password", teacherLoginData.password);
        try {
            axios
                .post(baseUrl + "/teacher-login", teacherFormData, {
                    headers: {
                        Authorization:
                            "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    },
                })
                .then((response) => {
                    if (response.data.bool === true) {
                        localStorage.setItem("teacherLoginStatus", true);
                        localStorage.setItem("teacherId", response.data.teacher_id);
                        window.location.href = "/teacher-dashboard";
                    } else {
                        setErrorMsg("ایمیل یا رمز عبور نادرست است");
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
    if (teacherLoginStatus === "true") {
        window.location.href = "/teacher-dashboard";
    }

    useEffect(() => {
        document.title = "Teacher Login";
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow border-0 rounded-3">
                        <div className="card-header bg-dark text-white text-center py-3">
                            <h4 className="mb-0">ورود مدرس</h4>
                        </div>
                        <div className="card-body p-4">
                            {errorMsg && (
                                <div className="alert alert-danger text-center">
                                    {errorMsg}
                                </div>
                            )}
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-bold">
                                        ایمیل
                                    </label>
                                    <input
                                        name="email"
                                        onChange={handleChange}
                                        type="email"
                                        className="form-control form-control-lg"
                                        id="email"
                                        placeholder="ایمیل خود را وارد کنید"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-bold">
                                        رمز عبور
                                    </label>
                                    <input
                                        name="password"
                                        onChange={handleChange}
                                        type="password"
                                        className="form-control form-control-lg"
                                        id="password"
                                        placeholder="رمز عبور خود را وارد کنید"
                                        required
                                    />
                                </div>

                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="rememberMe"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="rememberMe"
                                    >
                                        مرا به خاطر داشته باش
                                    </label>
                                </div>

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg shadow-sm"
                                    >
                                        ورود
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center text-muted py-2">
                            <small>© 2025 مکتب | تمامی حقوق محفوظ است</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherLogin;

