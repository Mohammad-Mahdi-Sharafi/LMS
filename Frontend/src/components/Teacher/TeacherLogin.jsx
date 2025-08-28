import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherLogin() {
    const [teacherLoginData, setTeacherLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setTeacherLoginData({
            ...teacherLoginData,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = () => {
        const teacherFromData = new FormData();
        teacherFromData.append("email", teacherLoginData.email);
        teacherFromData.append("password", teacherLoginData.password);
        try {
            axios
                .post(baseUrl + "/teacher-login", teacherFromData, {
                    headers: {
                        Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    },
                })
                .then((response) => {
                    if (response.data.bool === true) {
                        localStorage.setItem("teacherLoginStatus", true);
                        localStorage.setItem("teacherId", response.data.teacher_id)
                        window.location.href = "/teacher-dashboard";
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
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-6 offset-3">
                        <div className="card">
                            <h3 className="card-header">ورود مدرس</h3>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            ایمیل
                                        </label>
                                        <input
                                            name="email"
                                            onChange={handleChange}
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            aria-describedby="usernameHelp"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            رمز عبور
                                        </label>
                                        <input
                                            name="password"
                                            onChange={handleChange}
                                            type="password"
                                            className="form-control"
                                            id="password"
                                        />
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input
                                            name="checkbox"
                                            type="checkbox"
                                            className="form-check-input float-end"
                                            id="rememberMe"
                                        />
                                        <label
                                            className="form-check-label me-4"
                                            htmlFor="rememberMe"
                                        >
                                            مرا به خاطر داشته باش
                                        </label>
                                    </div>
                                    <button
                                        name="button"
                                        onClick={submitForm}
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        ورود
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeacherLogin;
