import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherRegister() {
    const [teacherData, setTeacherData] = useState({
        full_name: "",
        email: "",
        password: "",
        qualification: "",
        phone_number: "",
        skills: "",
        status: "",
    });

    // Handle input changes
    const handleChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        document.title = "Teacher Register";
    }, []); // Run only once

    //submit form
    const submitForm = (event) => {
        const teacherFormData = new FormData();
        teacherFormData.append("full_name", teacherData.full_name);
        teacherFormData.append("email", teacherData.email);
        teacherFormData.append("password", teacherData.password);
        teacherFormData.append("qualification", teacherData.qualification);
        teacherFormData.append("phone_number", teacherData.phone_number);
        teacherFormData.append("skills", teacherData.skills);

        try {
            axios
                .post(baseUrl + "/teacher", teacherFormData, {
                    headers: {
                        Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    },
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    // <-- handle axios errors here
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };
    const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
    if (teacherLoginStatus === "true") {
        window.location.href = "/teacher-dashboard";
    }

    // end

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h3 className="card-header">ثبت نام مدرس</h3>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="full_name" className="form-label">
                                        نام و نام خانوادگی
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="full_name"
                                        name="full_name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        ایمیل
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        رمز عبور
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="qualification" className="form-label">
                                        مدارک
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="qualification"
                                        name="qualification"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone_number" className="form-label">
                                        شماره تلفن همراه
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="phone_number"
                                        name="phone_number"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="skills" className="form-label">
                                        مهارت ها
                                    </label>
                                    <textarea
                                        onChange={handleChange}
                                        className="form-control"
                                        id="skills"
                                        name="skills"
                                    ></textarea>
                                    <div id="emailHelp" className="form-text">
                                        sth
                                    </div>
                                </div>
                                <button
                                    onClick={submitForm}
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    ثبت نام
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherRegister;
