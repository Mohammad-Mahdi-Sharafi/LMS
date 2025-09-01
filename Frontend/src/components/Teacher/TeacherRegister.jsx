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

    const handleChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        document.title = "Teacher Register";
    }, []);

    const submitForm = (e) => {
        e.preventDefault(); // prevent reload
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
                        Authorization:
                            "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    },
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
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

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow border-0 rounded-3">
                        <div className="card-header bg-primary text-white text-center py-3">
                            <h4 className="mb-0">ثبت نام مدرس</h4>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="full_name" className="form-label fw-bold">
                                        نام و نام خانوادگی
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="full_name"
                                        name="full_name"
                                        placeholder="نام کامل خود را وارد کنید"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-bold">
                                        ایمیل
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="email"
                                        className="form-control form-control-lg"
                                        id="email"
                                        name="email"
                                        placeholder="ایمیل خود را وارد کنید"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-bold">
                                        رمز عبور
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="password"
                                        className="form-control form-control-lg"
                                        id="password"
                                        name="password"
                                        placeholder="رمز عبور انتخاب کنید"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="qualification" className="form-label fw-bold">
                                        مدارک
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="qualification"
                                        name="qualification"
                                        placeholder="مثال: کارشناسی ارشد مهندسی کامپیوتر"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone_number" className="form-label fw-bold">
                                        شماره تلفن همراه
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="phone_number"
                                        name="phone_number"
                                        placeholder="0912xxxxxxx"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="skills" className="form-label fw-bold">
                                        مهارت ها
                                    </label>
                                    <textarea
                                        onChange={handleChange}
                                        className="form-control form-control-lg"
                                        id="skills"
                                        name="skills"
                                        rows="3"
                                        placeholder="مهارت‌های خود را وارد کنید (مثال: React, Python, تدریس)"
                                    ></textarea>
                                    <div className="form-text">می‌توانید چند مهارت را با ویرگول جدا کنید</div>
                                </div>

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg shadow-sm"
                                    >
                                        ثبت نام
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

export default TeacherRegister;
