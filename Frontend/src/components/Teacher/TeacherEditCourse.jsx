import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar.jsx";
import axios from "axios";

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

    useEffect(() => {
        document.title = "Teacher Edit Courses";

        // Fetch categories
        axios
            .get(`${baseUrl}/category`, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => setCategory(response.data))
            .catch((error) => console.error("Error fetching categories:", error));

        // Fetch course data
        axios
            .get(`${baseUrl}/teacher-course-detail/${course_id}`, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => setCourseData(response.data))
            .catch((error) => console.error("Error fetching course:", error));
    }, [course_id]);

    const handleChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        setCourseData({
            ...courseData,
            featured_image: event.target.files[0],
        });
    };

    const formSubmit = (event) => {
        event.preventDefault();

        const _formData = new FormData();
        _formData.append("category", courseData.category);
        _formData.append("teacher", teacherId); // adjust as needed
        _formData.append("title", courseData.title);
        _formData.append("description", courseData.description);
        if (courseData.featured_image instanceof File) {
            _formData.append("featured_image", courseData.featured_image);
        }
        _formData.append("technologies", courseData.technologies);

        axios
            .put(`${baseUrl}/course-detail/${course_id}`, _formData, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    "content-type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
                navigate("/teacher-my-courses");
            })
            .catch((error) => console.error(error));
    };

    const renderImagePreview = () => {
        if (!courseData.featured_image || courseData.featured_image instanceof File) return null;

        const fileUrl = courseData.featured_image.url || courseData.featured_image;
        return (
            <img
                src={fileUrl}
                alt="Course preview"
                width="200"
                className="rounded mt-2 border"
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
                    <div className="card">
                        <h5 className="card-header">ویرایش دوره</h5>
                        <div className="card-body">
                            <form onSubmit={formSubmit}>
                                <div className="mb-3 row">
                                    <label htmlFor="category" className="col-sm-2 col-form-label">
                                        دسته بندی
                                    </label>
                                    <div className="col-sm-10">
                                        <select
                                            name="category"
                                            onChange={handleChange}
                                            value={courseData.category}
                                            className="form-control"
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
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">
                                        عنوان
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            value={courseData.title}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            name="title"
                                        />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">
                                        توضیحات
                                    </label>
                                    <div className="col-sm-10">
                    <textarea
                        value={courseData.description}
                        onChange={handleChange}
                        className="form-control"
                        id="description"
                        name="description"
                        rows="4"
                    ></textarea>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="featured_image" className="col-sm-2 col-form-label">
                                        عکس دوره
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            onChange={handleFileChange}
                                            type="file"
                                            className="form-control"
                                            id="featured_image"
                                            name="featured_image"
                                        />
                                        {renderImagePreview()}
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="technologies" className="col-sm-2 col-form-label">
                                        تکنولوژی‌ها
                                    </label>
                                    <div className="col-sm-10">
                    <textarea
                        value={courseData.technologies}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Python, Java, C, Javascript"
                        id="technologies"
                        name="technologies"
                        rows="4"
                    ></textarea>
                                    </div>
                                </div>

                                <hr/>
                                <button type="submit" className="btn btn-primary">
                                    اعمال تغییرات
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherEditCourses;
