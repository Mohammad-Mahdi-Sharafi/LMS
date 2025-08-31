import {useEffect, useState} from "react";
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

    const submitForm = (event) => {
        event.preventDefault();

        const loginFormData = new FormData();
        loginFormData.append("email", studentLoginData.email);
        loginFormData.append("password", studentLoginData.password);

        try {
            axios
                .post(baseUrl + "/student-login", loginFormData, {
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
                        setErrorMsg("Invalid Email or Password");
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus === "true") {
        window.location.href = "/student-dashboard";
    }

    useEffect(() => {
        document.title = "Student Login";
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h3 className="card-header">ورود کاربر</h3>
                        <div className="card-body">
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">ایمیل</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        value={studentLoginData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">رمز عبور</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        id="password"
                                        value={studentLoginData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input float-end" id="rememberMe"/>
                                    <label className="form-check-label me-4" htmlFor="rememberMe">
                                        مرا به خاطر داشته باش
                                    </label>
                                </div>
                                <button onClick={submitForm} type="submit" className="btn btn-primary">ورود</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentLogin;


