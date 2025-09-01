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
        document.title = "Teacher Edit Chapter"; // don’t change
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
            .then(() => {
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
            return (
                <img
                    src={fileUrl}
                    alt="فایل فصل"
                    className="img-fluid rounded mt-3 shadow-sm"
                    style={{maxWidth: "220px"}}
                />
            );
        } else if (['mp4', 'webm', 'ogg'].includes(ext)) {
            return (
                <video
                    controls
                    className="rounded mt-3 shadow-sm"
                    style={{maxWidth: "300px"}}
                >
                    <source src={fileUrl} type={`video/${ext}`}/>
                    مرورگر شما از ویدئو پشتیبانی نمی‌کند.
                </video>
            );
        } else {
            return (
                <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary mt-3"
                >
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
                    <div className="card shadow-sm">
                        <h5 className="card-header bg-primary text-white">ویرایش فصل</h5>
                        <div className="card-body">
                            <form onSubmit={formSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label fw-bold">عنوان فصل</label>
                                    <input
                                        value={chapterData.title || ""}
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        placeholder="مثلاً: مقدمه برنامه‌نویسی"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label fw-bold">توضیحات</label>
                                    <textarea
                                        value={chapterData.description || ""}
                                        onChange={handleChange}
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="4"
                                        placeholder="توضیح مختصر درباره محتوای این فصل"
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="video" className="form-label fw-bold">فایل آموزشی</label>
                                    <input
                                        onChange={handleFileChange}
                                        type="file"
                                        className="form-control"
                                        id="video"
                                        name="video"
                                    />
                                    {renderFilePreview()}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="remarks" className="form-label fw-bold">یادداشت مدرس</label>
                                    <textarea
                                        value={chapterData.remarks || ""}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="مثال: این ویدئو روی مباحث پایه تمرکز دارد"
                                        id="remarks"
                                        name="remarks"
                                        rows="3"
                                    ></textarea>
                                </div>

                                <hr/>
                                <button type="submit" className="btn btn-success">
                                    ذخیره تغییرات
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

