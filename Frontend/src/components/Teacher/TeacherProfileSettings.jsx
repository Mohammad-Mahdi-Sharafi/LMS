import { useEffect, useState } from "react";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar.jsx";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherProfileSettings() {
    const teacherId = localStorage.getItem("teacherId");
    const [teacherData, setTeacherData] = useState({
        full_name: "",
        bio: "",
        email: "",
        password: "", // keep in state but not shown in UI
        qualification: "",
        phone_number: "",
        profile_image: null,
        skills: "",
    });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        document.title = "Teacher Profile Settings";

        if (teacherId) {
            axios
                .get(`${baseUrl}/teacher/${teacherId}`, {
                    headers: {
                        Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    },
                })
                .then((res) => {
                    setTeacherData({
                        ...res.data,
                        profile_image: null, // reset for new file upload
                    });
                    if (res.data.profile_image) {
                        setPreviewImage(res.data.profile_image);
                    }
                })
                .catch((err) => console.error("Error fetching profile:", err));
        }
    }, [teacherId]);

    const handleChange = (e) => {
        setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setTeacherData({ ...teacherData, profile_image: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const submitForm = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("full_name", teacherData.full_name);
        formData.append("bio", teacherData.bio || "");
        formData.append("email", teacherData.email);
        formData.append("password", teacherData.password); // always include old password
        formData.append("qualification", teacherData.qualification);
        formData.append("phone_number", teacherData.phone_number);
        formData.append("skills", teacherData.skills);

        if (teacherData.profile_image instanceof File) {
            formData.append("profile_image", teacherData.profile_image);
        }

        axios
            .put(`${baseUrl}/teacher/${teacherId}`, formData, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "موفق!",
                    text: "پروفایل با موفقیت به‌روزرسانی شد ✅",
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
                    <TeacherSidebar />
                </aside>

                {/* Profile Settings */}
                <section className="col-md-9 col-lg-10">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">⚙️ تنظیمات پروفایل</h5>
                            <span className="badge bg-primary px-3 py-2 rounded-pill">مدرس</span>
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
                                        value={teacherData.full_name}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="نام کامل"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">ایمیل</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={teacherData.email}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="ایمیل"
                                        required
                                    />
                                </div>

                                {/* Qualification */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">مدارک</label>
                                    <input
                                        type="text"
                                        name="qualification"
                                        value={teacherData.qualification}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="مثال: کارشناسی ارشد"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">شماره تلفن</label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        value={teacherData.phone_number}
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
                                        value={teacherData.bio || ""}
                                        onChange={handleChange}
                                        className="form-control"
                                        rows="3"
                                        placeholder="چند خط درباره خودتان بنویسید..."
                                    ></textarea>
                                </div>

                                {/* Skills */}
                                <div className="col-12">
                                    <label className="form-label fw-bold">مهارت‌ها</label>
                                    <textarea
                                        name="skills"
                                        value={teacherData.skills}
                                        onChange={handleChange}
                                        className="form-control"
                                        rows="2"
                                        placeholder="React, Python, تدریس"
                                    ></textarea>
                                    <div className="form-text">مهارت‌ها را با ویرگول از هم جدا کنید</div>
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

export default TeacherProfileSettings;


