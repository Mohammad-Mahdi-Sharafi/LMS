import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function StudentLogin() {
    const [studentLoginData, setStudentLoginData] = useState({
        email: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (event) => {
        setStudentLoginData({
            ...studentLoginData,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault();

        const loginFormData = new FormData();
        loginFormData.append("email", studentLoginData.email);
        loginFormData.append("password", studentLoginData.password);

        axios
            .post(`${baseUrl}/student-login`, loginFormData, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => {
                if (response.data.bool === true) {
                    localStorage.setItem("studentLoginStatus", "true");
                    localStorage.setItem("studentId", response.data.student_id);
                    window.location.href = "/student-dashboard";
                } else {
                    setErrorMsg("ایمیل یا رمز عبور نادرست است");
                }
            })
            .catch(() => setErrorMsg("مشکلی پیش آمد. دوباره تلاش کنید."));
    };

    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    console.log(studentLoginStatus);
    // if (studentLoginStatus === "true") {
    //     window.location.href = "/student-dashboard";
    // }

    useEffect(() => {
        document.title = "Student Login";
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow border-0 rounded-3">
                        <div className="card-header bg-dark text-white text-center py-3">
                            <h4 className="mb-0">ورود دانشجو</h4>
                        </div>
                        <div className="card-body p-4">
                            {errorMsg && (
                                <div className="alert alert-danger text-center">
                                    {errorMsg}
                                </div>
                            )}
                            <form>
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
                                        onClick={submitForm}
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

export default StudentLogin;


