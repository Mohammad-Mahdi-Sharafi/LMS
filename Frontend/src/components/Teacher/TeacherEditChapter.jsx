import {useNavigate, useParams} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherEditChapter() {
    const navigate = useNavigate();
    const {chapter_id} = useParams();

    const [chapterData, setChapterData] = useState({
        course: "",
        title: "",
        description: "",
        video: "",
        remarks: "",
    });

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


    useEffect(() => {
        document.title = "Teacher Edit Chapter";
        axios
            .get(`${baseUrl}/chapter-detail/${chapter_id}`, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => {
                setChapterData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching chapter:", error);
            });
    }, [chapter_id]);

    const formSubmit = (event) => {
        event.preventDefault();

        const _formData = new FormData();
        _formData.append("course", chapterData.course);
        _formData.append("title", chapterData.title);
        _formData.append("description", chapterData.description);
        if (chapterData.video instanceof File) {
            _formData.append("video", chapterData.video, chapterData.video.name);
        }
        _formData.append("remarks", chapterData.remarks);

        axios
            .put(`${baseUrl}/chapter-detail/${chapter_id}`, _formData, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
                navigate(`/teacher-all-chapters/${chapterData.course}`);
            })
            .catch((error) => {
                console.error("Error updating chapter:", error);
            });
    };

    const renderFilePreview = () => {
        if (!chapterData.video || chapterData.video instanceof File) return null;

        const fileUrl = chapterData.video.url || chapterData.video;
        const ext = fileUrl.split('.').pop().toLowerCase();

        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
            return <img src={fileUrl} alt="chapter file" width="200" className="rounded mt-2"/>;
        } else if (['mp4', 'webm', 'ogg'].includes(ext)) {
            return (
                <video controls width="250" className="mt-2">
                    <source src={fileUrl} type={`video/${ext}`}/>
                    مرورگر شما از ویدئو پشتیبانی نمی‌کند.
                </video>
            );
        } else {
            return (
                <a href={fileUrl} target="_blank" rel="noopener noreferrer"
                   className="btn btn-sm btn-primary mt-2">
                    دانلود فایل موجود
                </a>
            );
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
                        <h5 className="card-header">ویرایش فصل</h5>
                        <div className="card-body">
                            <form onSubmit={formSubmit}>
                                <div className="mb-3 row">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">
                                        عنوان
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            value={chapterData.title || ""}
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
                                            value={chapterData.description || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                            id="description"
                                            name="description"
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
                                        {renderFilePreview()}
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label htmlFor="remarks" className="col-sm-2 col-form-label">
                                        یادداشت مدرس
                                    </label>
                                    <div className="col-sm-10">
                                        <textarea
                                            value={chapterData.remarks || ""}
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

export default TeacherEditChapter;
