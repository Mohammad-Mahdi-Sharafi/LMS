import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar.jsx";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherAddCourses() {
    const navigate = useNavigate();
    const teacherId = localStorage.getItem("teacherId");
    const [category, setCategory] = useState([]);
    const [courseData, setCourseData] = useState({
        category: "",
        courseTitle: "",
        courseDescription: "",
        courseImage: "",
        remarks: "",
    });

    useEffect(() => {
        document.title = "Teacher Add Courses";

        axios
            .get(baseUrl + "/category", {
                headers: {
                    Authorization:
                        "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => {
                setCategory(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const handleChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.files[0],
        });
    };

    const formSubmit = (event) => {
        event.preventDefault();

        const _formData = new FormData();
        _formData.append("category", courseData.category);
        _formData.append("teacher", teacherId);
        _formData.append("title", courseData.courseTitle);
        _formData.append("description", courseData.courseDescription);
        _formData.append("featured_image", courseData.courseImage);
        _formData.append("technologies", courseData.remarks);

        try {
            axios
                .post(baseUrl + "/course", _formData, {
                    headers: {
                        Authorization:
                            "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                        "content-type": "multipart/form-data",
                    },
                })
                .then(() => {
                    navigate("/teacher-my-courses");
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Sidebar */}
                <aside className="col-md-3 mb-4">
                    <TeacherSidebar/>
                </aside>

                {/* Form Section */}
                <section className="col-md-9">
                    <div className="card shadow-sm rounded-3 border-0">
                        <h5 className="card-header bg-dark text-white py-3">
                            اضافه کردن دوره
                        </h5>
                        <div className="card-body p-4">
                            <form onSubmit={formSubmit}>
                                {/* Category */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="category"
                                        className="form-label fw-semibold"
                                    >
                                        دسته‌بندی
                                    </label>
                                    <select
                                        name="category"
                                        onChange={handleChange}
                                        value={courseData.category}
                                        className="form-select"
                                        id="category"
                                    >
                                        <option value="" disabled>
                                            --- انتخاب دسته‌بندی ---
                                        </option>
                                        {category.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Title */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="courseTitle"
                                        className="form-label fw-semibold"
                                    >
                                        عنوان
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="courseTitle"
                                        name="courseTitle"
                                        placeholder="مثال: دوره مقدماتی پایتون"
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="courseDescription"
                                        className="form-label fw-semibold"
                                    >
                                        توضیحات
                                    </label>
                                    <textarea
                                        onChange={handleChange}
                                        className="form-control"
                                        id="courseDescription"
                                        name="courseDescription"
                                        rows="4"
                                        placeholder="توضیحات کامل دوره را وارد کنید..."
                                    ></textarea>
                                </div>

                                {/* Course Image */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="courseImage"
                                        className="form-label fw-semibold"
                                    >
                                        عکس دوره
                                    </label>
                                    <input
                                        onChange={handleFileChange}
                                        type="file"
                                        className="form-control"
                                        id="courseImage"
                                        name="courseImage"
                                    />
                                </div>

                                {/* Technologies */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="remarks"
                                        className="form-label fw-semibold"
                                    >
                                        تکنولوژی‌ها
                                    </label>
                                    <textarea
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Python, Java, C, Javascript"
                                        id="remarks"
                                        name="remarks"
                                        rows="3"
                                    ></textarea>
                                </div>

                                {/* Submit */}
                                <div className="d-flex justify-content-end pt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-dark px-4 fw-semibold"
                                    >
                                        ثبت دوره
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

export default TeacherAddCourses;


