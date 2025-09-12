import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar.jsx";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherEditCourses() {
    const navigate = useNavigate();
    const {course_id} = useParams();
    const teacherId = localStorage.getItem("teacherId");

    const [category, setCategory] = useState([]);
    const [courseData, setCourseData] = useState({
        category: "",
        title: "",
        description: "",
        featured_image: "",
        technologies: "",
    });

    // Fetch categories + course detail
    useEffect(() => {
        document.title = "Teacher Edit Courses";

        axios
            .get(`${baseUrl}/category`, {
                headers: {Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf"},
            })
            .then((response) => setCategory(response.data))
            .catch(() =>
                Swal.fire({
                    icon: "error",
                    title: "خطا",
                    text: "مشکلی در دریافت دسته‌بندی‌ها رخ داد",
                })
            );

        axios
            .get(`${baseUrl}/teacher-course-detail/${course_id}`, {
                headers: {Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf"},
            })
            .then((response) => {
                setCourseData({
                    category: response.data.category,
                    title: response.data.title,
                    description: response.data.description,
                    featured_image: response.data.featured_image,
                    technologies: response.data.technologies,
                });
            })
            .catch(() =>
                Swal.fire({
                    icon: "error",
                    title: "خطا",
                    text: "مشکلی در دریافت اطلاعات دوره رخ داد",
                })
            );
    }, [course_id]);

    // Handle text input
    const handleChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.value,
        });
    };

    // Handle file input
    const handleFileChange = (event) => {
        setCourseData({
            ...courseData,
            featured_image: event.target.files[0],
        });
    };

    // Submit form
    const formSubmit = (event) => {
        event.preventDefault();

        const _formData = new FormData();
        _formData.append("category", courseData.category);
        _formData.append("teacher", teacherId);
        _formData.append("title", courseData.title);
        _formData.append("description", courseData.description);

        if (courseData.featured_image instanceof File) {
            _formData.append("featured_image", courseData.featured_image);
        }

        _formData.append("technologies", courseData.technologies);

        axios
            .put(`${baseUrl}/teacher-course-detail/${course_id}`, _formData, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    "content-type": "multipart/form-data",
                },
            })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "موفقیت",
                    text: "اطلاعات دوره با موفقیت ویرایش شد",
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    navigate("/teacher-my-courses");
                });
            })
            .catch(() =>
                Swal.fire({
                    icon: "error",
                    title: "خطا",
                    text: "ویرایش دوره انجام نشد، لطفاً دوباره تلاش کنید",
                })
            );
    };

    // Preview for old or new image
    const renderImagePreview = () => {
        if (!courseData.featured_image) return null;

        if (courseData.featured_image instanceof File) {
            return (
                <img
                    src={URL.createObjectURL(courseData.featured_image)}
                    alt="پیش‌نمایش دوره"
                    className="img-fluid rounded mt-3 shadow-sm border"
                    style={{maxWidth: "220px"}}
                />
            );
        }

        return (
            <img
                src={courseData.featured_image}
                alt="پیش‌نمایش دوره"
                className="img-fluid rounded mt-3 shadow-sm border"
                style={{maxWidth: "220px"}}
            />
        );
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar/>
                </aside>
                <section className="col-md-9">
                    <div className="card shadow-sm">
                        <h5 className="card-header bg-primary text-white">ویرایش دوره</h5>
                        <div className="card-body">
                            <form onSubmit={formSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label fw-bold">دسته‌بندی</label>
                                    <select
                                        name="category"
                                        onChange={handleChange}
                                        value={courseData.category}
                                        className="form-select"
                                        id="category"
                                    >
                                        <option value="" disabled>--- انتخاب دسته‌بندی ---</option>
                                        {category.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label fw-bold">عنوان دوره</label>
                                    <input
                                        value={courseData.title}
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        placeholder="مثلاً: دوره جامع پایتون"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label fw-bold">توضیحات</label>
                                    <textarea
                                        value={courseData.description}
                                        onChange={handleChange}
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="4"
                                        placeholder="توضیح مختصر درباره محتوای دوره"
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="featured_image" className="form-label fw-bold">عکس دوره</label>
                                    <input
                                        onChange={handleFileChange}
                                        type="file"
                                        className="form-control"
                                        id="featured_image"
                                        name="featured_image"
                                    />
                                    {renderImagePreview()}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="technologies" className="form-label fw-bold">تکنولوژی‌ها</label>
                                    <textarea
                                        value={courseData.technologies}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Python, Java, C, Javascript"
                                        id="technologies"
                                        name="technologies"
                                        rows="3"
                                    ></textarea>
                                </div>

                                <hr/>
                                <button type="submit" className="btn btn-success">ذخیره تغییرات</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherEditCourses;
