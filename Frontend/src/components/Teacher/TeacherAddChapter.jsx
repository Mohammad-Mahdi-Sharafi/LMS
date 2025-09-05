import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar.jsx";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherAddChapters() {
    const navigate = useNavigate();
    const {course_id} = useParams();

    const [chapterData, setChapterData] = useState({
        title: "",
        description: "",
        video: "",
        remarks: "",
    });

    useEffect(() => {
        document.title = "Teacher Add Chapters";
    }, []);

    const handleChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.files[0],
        });
    };

    const formSubmit = (event) => {
        event.preventDefault();

        const _formData = new FormData();
        _formData.append("course", course_id);
        _formData.append("title", chapterData.title);
        _formData.append("description", chapterData.description);
        _formData.append("video", chapterData.video);
        _formData.append("remarks", chapterData.remarks);

        try {
            axios
                .post(baseUrl + "/chapter", _formData, {
                    headers: {
                        Authorization:
                            "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                            "content-type": "multipart/form-data",
                    },
                })
                .then(() => {
                    navigate(`/teacher-all-chapters/${course_id}`);
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
                            افزودن فصل جدید
                        </h5>
                        <div className="card-body p-4">
                            <form onSubmit={formSubmit}>
                                {/* Title */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="title"
                                        className="form-label fw-semibold"
                                    >
                                        عنوان فصل
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        placeholder="مثال: مبانی مقدماتی پایتون"
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="description"
                                        className="form-label fw-semibold"
                                    >
                                        توضیحات
                                    </label>
                                    <textarea
                                        onChange={handleChange}
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="4"
                                        placeholder="توضیح مختصری در مورد فصل..."
                                    ></textarea>
                                </div>

                                {/* Video */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="video"
                                        className="form-label fw-semibold"
                                    >
                                        فایل ویدئو
                                    </label>
                                    <input
                                        onChange={handleFileChange}
                                        type="file"
                                        className="form-control"
                                        id="video"
                                        name="video"
                                    />
                                </div>

                                {/* Remarks */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="remarks"
                                        className="form-label fw-semibold"
                                    >
                                        یادداشت مدرس
                                    </label>
                                    <textarea
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="این ویدیو روی مباحث پایه تمرکز دارد"
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
                                        ذخیره فصل
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

export default TeacherAddChapters;


