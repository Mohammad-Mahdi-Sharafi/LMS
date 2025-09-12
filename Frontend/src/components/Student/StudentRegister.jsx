import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function StudentRegister() {
    const [studentData, setStudentData] = useState({
        full_name: "",
        email: "",
        user_name: "",
        profile_image: null,
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
        event.preventDefault();

        const studentFormData = new FormData();
        studentFormData.append("full_name", studentData.full_name);
        studentFormData.append("email", studentData.email);
        studentFormData.append("user_name", studentData.user_name);
        studentFormData.append("password", studentData.password);
        studentFormData.append("interested_categories", studentData.interested_categories);

        if (studentData.profile_image instanceof File) {
            studentFormData.append("profile_image", studentData.profile_image);
        }

        try {
            axios
                .post(baseUrl + "/student", studentFormData, {
                    headers: {
                        Authorization:
                            "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    },
                })
                .then((response) => {
                    console.log(response.data);

                    Swal.fire({
                        icon: "success",
                        title: "ثبت نام موفقیت‌آمیز بود!",
                        text: "اکنون می‌توانید وارد حساب کاربری خود شوید.",
                        confirmButtonText: "باشه",
                        confirmButtonColor: "#198754",
                    }).then(() => {
                        // redirect after confirmation
                        window.location.href = "/student-login";
                    });

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

                    Swal.fire({
                        icon: "error",
                        title: "خطا در ثبت نام",
                        text: "لطفاً اطلاعات وارد شده را بررسی کنید و دوباره تلاش کنید.",
                        confirmButtonText: "باشه",
                        confirmButtonColor: "#dc3545",
                    });
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow border-0 rounded-3">
                        <div className="card-header bg-success text-white text-center py-3">
                            <h4 className="mb-0">ثبت نام دانشجو</h4>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label htmlFor="full_name" className="form-label fw-bold">
                                        نام و نام خانوادگی
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={studentData.full_name}
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
                                        value={studentData.email}
                                        type="email"
                                        className="form-control form-control-lg"
                                        id="email"
                                        name="email"
                                        placeholder="ایمیل خود را وارد کنید"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="user_name" className="form-label fw-bold">
                                        نام کاربری
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={studentData.user_name}
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="user_name"
                                        name="user_name"
                                        placeholder="یک نام کاربری انتخاب کنید"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-bold">
                                        رمز عبور
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        value={studentData.password}
                                        type="password"
                                        className="form-control form-control-lg"
                                        id="password"
                                        name="password"
                                        placeholder="رمز عبور انتخاب کنید"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="interested_categories" className="form-label fw-bold">
                                        علاقه‌مندی‌ها
                                    </label>
                                    <textarea
                                        onChange={handleChange}
                                        value={studentData.interested_categories}
                                        className="form-control form-control-lg"
                                        id="interested_categories"
                                        name="interested_categories"
                                        rows="3"
                                        placeholder="مثال: Python, Java, React"
                                    ></textarea>
                                    <div className="form-text">
                                        می‌توانید چند مورد را با ویرگول جدا کنید
                                    </div>
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

export default StudentRegister;
