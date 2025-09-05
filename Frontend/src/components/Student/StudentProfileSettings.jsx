import { useEffect, useState } from "react";
import axios from "axios";
import StudentSidebar from "./StudentSidebar.jsx";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function StudentProfileSettings() {
    const studentId = localStorage.getItem("studentId");
    const [studentData, setStudentData] = useState({
        full_name: "",
        bio: "",
        user_name: "",
        email: "",
        profile_image: null,
        interested_categories: "",
        phone_number: "",
        password: "", // keep in state but not shown in UI
    });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        document.title = "Student Profile Settings";

        if (studentId) {
            axios
                .get(`${baseUrl}/student/${studentId}`, {
                    headers: {
                        Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    },
                })
                .then((res) => {
                    setStudentData({
                        ...res.data,
                        profile_image: null, // reset for new file upload
                    });
                    if (res.data.profile_image) {
                        setPreviewImage(res.data.profile_image);
                    }
                })
                .catch((err) => console.error("Error fetching student profile:", err));
        }
    }, [studentId]);

    const handleChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setStudentData({ ...studentData, profile_image: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const submitForm = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("full_name", studentData.full_name);
        formData.append("bio", studentData.bio || "");
        formData.append("user_name", studentData.user_name || "");
        formData.append("email", studentData.email);
        formData.append("interested_categories", studentData.interested_categories);
        formData.append("phone_number", studentData.phone_number);
        formData.append("password", studentData.password); // always include old password

        if (studentData.profile_image instanceof File) {
            formData.append("profile_image", studentData.profile_image);
        }

        axios
            .put(`${baseUrl}/student/${studentId}`, formData, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "موفق!",
                    text: "پروفایل شما با موفقیت به‌روزرسانی شد ✅",
                    confirmButtonColor: "#198754",
                });
            })
            .catch((err) => {
                console.error("Error updating profile:", err);
                Swal.fire({
                    icon: "error",
                    title: "خطا",
                    text: "مشکلی در ذخیره پروفایل رخ داد.",
                    confirmButtonColor: "#d33",
                });
            });
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <aside className="col-md-3 col-lg-2 mb-4">
                    <StudentSidebar />
                </aside>

                {/* Profile Settings */}
                <section className="col-md-9 col-lg-10">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">⚙️ تنظیمات پروفایل</h5>
                            <span className="badge bg-primary px-3 py-2 rounded-pill">دانشجو</span>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={submitForm} className="row g-3">
                                {/* Profile Image */}
                                <div className="col-12 text-center">
                                    <div className="mb-3">
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="پروفایل"
                                                className="rounded-circle shadow-sm"
                                                style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                            />
                                        ) : (
                                            <div
                                                className="bg-light border rounded-circle d-flex align-items-center justify-content-center mx-auto"
                                                style={{ width: "120px", height: "120px" }}
                                            >
                                                📷
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                    <div className="form-text">می‌توانید تصویر پروفایل خود را تغییر دهید</div>
                                </div>

                                {/* Full Name */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">نام و نام خانوادگی</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={studentData.full_name}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="نام کامل"
                                        required
                                    />
                                </div>

                                {/* Username */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">نام کاربری</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        value={studentData.user_name || ""}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="username"
                                    />
                                </div>

                                {/* Email */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">ایمیل</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={studentData.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="ایمیل"
                                        required
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">شماره تلفن</label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        value={studentData.phone_number || ""}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="0912xxxxxxx"
                                    />
                                </div>

                                {/* Bio */}
                                <div className="col-12">
                                    <label className="form-label fw-bold">بیوگرافی</label>
                                    <textarea
                                        name="bio"
                                        value={studentData.bio || ""}
                                        onChange={handleChange}
                                        className="form-control"
                                        rows="3"
                                        placeholder="چند خط درباره خودتان بنویسید..."
                                    ></textarea>
                                </div>

                                {/* Interested Categories */}
                                <div className="col-12">
                                    <label className="form-label fw-bold">علاقه‌مندی‌ها</label>
                                    <textarea
                                        name="interested_categories"
                                        value={studentData.interested_categories}
                                        onChange={handleChange}
                                        className="form-control"
                                        rows="2"
                                        placeholder="Python, AI, JavaScript"
                                    ></textarea>
                                    <div className="form-text">علاقه‌مندی‌ها را با ویرگول جدا کنید</div>
                                </div>

                                {/* Save */}
                                <div className="col-12 text-end">
                                    <button type="submit" className="btn btn-success px-4">
                                        💾 ذخیره تغییرات
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default StudentProfileSettings;
