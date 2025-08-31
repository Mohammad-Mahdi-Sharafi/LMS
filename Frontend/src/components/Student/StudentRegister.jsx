import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function StudentRegister() {
    const [studentData, setStudentData] = useState({
        full_name: "",
        email: "",
        user_name: "",
        password: "",
        interested_categories: "",
        status: "",
    });

    useEffect(() => {
        document.title = "Student Register";
    }, []);

    const handleChange = (event) => {
        setStudentData({
            ...studentData,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = (event) => {
        event.preventDefault(); // prevent form reload

        const studentFormData = new FormData();
        studentFormData.append("full_name", studentData.full_name);
        studentFormData.append("email", studentData.email);
        studentFormData.append("user_name", studentData.user_name);
        studentFormData.append("password", studentData.password);
        studentFormData.append("interested_categories", studentData.interested_categories);

        try {
            axios
                .post(baseUrl + "/student", studentFormData, {
                    headers: {
                        Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    setStudentData({
                        full_name: "",
                        email: "",
                        user_name: "",
                        password: "",
                        interested_categories: "",
                        status: "success",
                    });
                })
                .catch((error) => {
                    console.log(error.response?.data || error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus === "true") {
        window.location.href = "/student-dashboard";
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h3 className="card-header">ثبت نام دانشجو</h3>
                        <div className="card-body">
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="full_name" className="form-label">نام و نام خانوادگی</label>
                                    <input
                                        onChange={handleChange}
                                        value={studentData.full_name}
                                        type="text"
                                        className="form-control"
                                        name="full_name"
                                        id="full_name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">ایمیل</label>
                                    <input
                                        onChange={handleChange}
                                        value={studentData.email}
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="user_name" className="form-label">نام کاربری</label>
                                    <input
                                        onChange={handleChange}
                                        value={studentData.user_name}
                                        type="text"
                                        className="form-control"
                                        name="user_name"
                                        id="user_name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">رمز عبور</label>
                                    <input
                                        onChange={handleChange}
                                        value={studentData.password}
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        id="password"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="interested_categories" className="form-label">علاقه‌مندی‌ها</label>
                                    <textarea
                                        onChange={handleChange}
                                        value={studentData.interested_categories}
                                        name="interested_categories"
                                        id="interested_categories"
                                        className="form-control"
                                    />
                                    <div className="form-text">مثال: Python, Java, etc</div>
                                </div>
                                <button type="submit" className="btn btn-primary">ثبت نام</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentRegister;


