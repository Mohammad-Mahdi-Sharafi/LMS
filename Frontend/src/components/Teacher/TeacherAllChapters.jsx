import {useNavigate, useParams} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherAllChapters() {
    const navigate = useNavigate();
    const {course_id} = useParams();
    const [chapterData, setChapterData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);

    useEffect(() => {
        document.title = "All Chapters";
        axios
            .get(`${baseUrl}/course-chapters/${course_id}`, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => {
                setTotalResult(response.data.length);
                setChapterData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching chapters:", error);
            });
    }, [course_id]);

    const handleDeleteClick = (chapter_id) => {
        Swal.fire({
            title: "تایید حذف",
            text: "آیا مطمئن هستید که می‌خواهید این فصل را حذف کنید؟",
            icon: "warning",
            confirmButtonText: "بلی",
            cancelButtonText: "خیر",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${baseUrl}/chapter-detail/${chapter_id}`, {
                        headers: {
                            Authorization:
                                "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                        },
                    })
                    .then(() => {
                        Swal.fire("حذف شد", "فصل با موفقیت حذف شد", "success").then(() =>
                            window.location.reload()
                        );
                    })
                    .catch((error) => {
                        Swal.fire("خطا", "فصل حذف نشد", "error");
                        console.error(error);
                    });
            }
        });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Sidebar */}
                <aside className="col-md-3 mb-4">
                    <TeacherSidebar/>
                </aside>

                {/* Chapters Table */}
                <section className="col-md-9">
                    <div className="card shadow-sm border-0 rounded-3">
                        <h5 className="card-header bg-dark text-white py-3">
                            فصل‌های دوره
                        </h5>
                        <div className="card-body p-4">
                            {totalResult > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle text-center">
                                        <thead className="table-light">
                                        <tr>
                                            <th style={{width: "20%"}}>عنوان</th>
                                            <th style={{width: "30%"}}>فایل</th>
                                            <th style={{width: "30%"}}>یادداشت مدرس</th>
                                            <th style={{width: "20%"}}>عملیات</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {chapterData.map((chapter, index) => (
                                            <tr key={index}>
                                                <td className="fw-semibold text-truncate">
                                                    {chapter.title}
                                                </td>
                                                <td>
                                                    {chapter.video &&
                                                        (() => {
                                                            const fileUrl =
                                                                chapter.video.url || chapter.video;
                                                            const ext = fileUrl
                                                                .split(".")
                                                                .pop()
                                                                .toLowerCase();

                                                            if (
                                                                ["jpg", "jpeg", "png", "gif", "webp"].includes(
                                                                    ext
                                                                )
                                                            ) {
                                                                return (
                                                                    <img
                                                                        src={fileUrl}
                                                                        alt={chapter.title}
                                                                        className="img-fluid rounded"
                                                                        style={{maxWidth: "120px"}}
                                                                    />
                                                                );
                                                            } else if (
                                                                ["mp4", "webm", "ogg"].includes(ext)
                                                            ) {
                                                                return (
                                                                    <video
                                                                        controls
                                                                        className="rounded"
                                                                        style={{maxWidth: "160px"}}
                                                                    >
                                                                        <source
                                                                            src={fileUrl}
                                                                            type={`video/${ext}`}
                                                                        />
                                                                    </video>
                                                                );
                                                            } else {
                                                                return (
                                                                    <a
                                                                        href={fileUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="btn btn-sm btn-outline-primary"
                                                                    >
                                                                        دانلود فایل
                                                                    </a>
                                                                );
                                                            }
                                                        })()}
                                                </td>
                                                <td className="text-muted text-truncate">
                                                    {chapter.remarks || "-"}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline-dark me-2"
                                                        onClick={() =>
                                                            navigate(`/teacher-edit-chapter/${chapter.id}`)
                                                        }
                                                    >
                                                        ویرایش
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDeleteClick(chapter.id)}
                                                    >
                                                        حذف
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="alert alert-secondary text-center py-4">
                                    هنوز فصلی برای این دوره ایجاد نشده است.
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherAllChapters;


