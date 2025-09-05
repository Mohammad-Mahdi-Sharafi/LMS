import { useEffect, useState } from "react";
import axios from "axios";
import TeacherSidebar from "./TeacherSidebar.jsx";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherChangePassword() {
    const teacherId = localStorage.getItem("teacherId");

    const [teacherData, setTeacherData] = useState(null); // store existing teacher
    const [formData, setFormData] = useState({
        old_password: "",
        new_password: "",
        confirm_password: "",
    });

    // Fetch current teacher details once
    useEffect(() => {

        document.title = "Teacher Change Password";

        if (teacherId) {
            axios
                .get(`${baseUrl}/teacher/${teacherId}`, {
                    headers: {
                        Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    },
                })
                .then((res) => setTeacherData(res.data))
                .catch((err) => console.error("Error fetching teacher:", err));
        }
    }, [teacherId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitForm = (e) => {
        e.preventDefault();

        if (formData.new_password !== formData.confirm_password) {
            Swal.fire({
                icon: "warning",
                title: "خطا",
                text: "رمز عبور جدید و تکرار آن یکسان نیستند!",
                confirmButtonColor: "#d33",
            });
            return;
        }

        if (!teacherData) {
            Swal.fire({
                icon: "error",
                title: "خطا",
                text: "اطلاعات مدرس بارگذاری نشد.",
                confirmButtonColor: "#d33",
            });
            return;
        }

        // Construct full data with previous teacher info + new password
        const data = new FormData();
        data.append("full_name", teacherData.full_name);
        data.append("bio", teacherData.bio || "");
        data.append("email", teacherData.email);
        data.append("password", formData.new_password); // only password changes
        data.append("qualification", teacherData.qualification || "");
        data.append("phone_number", teacherData.phone_number || "");
        data.append("skills", teacherData.skills || "");

        // keep profile_image unchanged
        if (teacherData.profile_image instanceof File) {
            formData.append("profile_image", teacherData.profile_image);
        }

        axios
            .put(`${baseUrl}/teacher/${teacherId}`, data, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "موفق!",
                    text: "رمز عبور با موفقیت تغییر یافت ✅",
                    confirmButtonColor: "#198754",
                });
                setFormData({
                    old_password: "",
                    new_password: "",
                    confirm_password: "",
                });
            })
            .catch((err) => {
                console.error("Error updating password:", err);
                Swal.fire({
                    icon: "error",
                    title: "خطا",
                    text: "تغییر رمز عبور با خطا مواجه شد.",
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

                {/* Change Password */}
                <section className="col-md-9 col-lg-10">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">🔒 تغییر رمز عبور</h5>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={submitForm} className="row g-3">
                                {/* Old Password */}
                                <div className="col-12">
                                    <label className="form-label fw-bold">رمز عبور فعلی</label>
                                    <input
                                        type="password"
                                        name="old_password"
                                        value={formData.old_password}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="رمز عبور فعلی"
                                        required
                                    />
                                </div>

                                {/* New Password */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">رمز عبور جدید</label>
                                    <input
                                        type="password"
                                        name="new_password"
                                        value={formData.new_password}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="رمز عبور جدید"
                                        required
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">تکرار رمز عبور جدید</label>
                                    <input
                                        type="password"
                                        name="confirm_password"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="تکرار رمز عبور"
                                        required
                                    />
                                </div>

                                {/* Save */}
                                <div className="col-12 text-end">
                                    <button type="submit" className="btn btn-success px-4">
                                        💾 ذخیره رمز عبور
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

export default TeacherChangePassword;
