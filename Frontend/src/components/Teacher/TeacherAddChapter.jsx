import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar.jsx";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherAddChapters() {
    const navigate = useNavigate();
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
        event.preventDefault(); // prevent page reload

        const _formData = new FormData();
        _formData.append("course", 3)
        _formData.append("title", chapterData.courseTitle);
        _formData.append("description", chapterData.courseDescription);
        _formData.append("video", chapterData.video, chapterData.video.name);
        _formData.append("remarks", chapterData.remarks);

        try {
            axios
                .post(baseUrl + "/chapter", _formData, {
                    headers: {
                        Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                        "content-type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    navigate("/teacher-add-courses"); // redirect after submit
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar/>
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">مدیریت دوره</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3 row">
                                    <label htmlFor="courseTitle" className="col-sm-2 col-form-label">
                                        عنوان
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            id="courseTitle"
                                            name="courseTitle"
                                        />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="courseDescription" className="col-sm-2 col-form-label">
                                        توضیحات
                                    </label>
                                    <div className="col-sm-10">
                                        <textarea
                                            onChange={handleChange}
                                            className="form-control"
                                            id="courseDescription"
                                            name="courseDescription"
                                            rows="4"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="video" className="col-sm-2 col-form-label">
                                        فایل دوره
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            onChange={handleFileChange}
                                            type="file"
                                            className="form-control"
                                            id="video"
                                            name="video"
                                        />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="remarks" className="col-sm-2 col-form-label">
                                        یاد داشت مدرس
                                    </label>
                                    <div className="col-sm-10">
                                        <textarea
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="این ویدیو روی مباحث پایه تمرکز دارد"
                                            id="remarks"
                                            name="remarks"
                                            rows="4"
                                        ></textarea>
                                    </div>
                                </div>

                                <hr/>
                                <button onClick={formSubmit} type="submit" className="btn btn-primary">
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

export default TeacherAddChapters;

