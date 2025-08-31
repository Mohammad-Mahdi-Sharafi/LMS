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
                console.error("Error fetching categories:", error);
            });
    }, [course_id]);
    const handleDeleteClick = (chapter_id) => {
        Swal.fire({
            title: "تایید",
            text: "آیا از حذف این بخش اطمینان دارید؟",
            icon: "info",
            confirmButtonText: "بلی",
            cancelButtonText: "خیر",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${baseUrl}/chapter-detail/${chapter_id}`, {
                        headers: {
                            Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf", // add if required
                        },
                    })
                    .then(() => {
                        Swal.fire("حذف شد", "بخش با موفقیت حذف شد", "success").then(() => {
                            window.location.reload();
                        });
                    })
                    .catch((error) => {
                        Swal.fire("خطا", "داده حذف نشد", "error");
                        console.error(error);
                    });
            } else {
                Swal.fire("لغو شد", "داده پاک نشد", "info");
            }
        });
    };


    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar/>
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">فصل های دوره</h5>
                        <div className="card-body table-responsive">
                            <table className="table table-bordered table-sm align-middle text-center">
                                <thead className="table-light">
                                <tr>
                                    <th style={{width: "20%"}}>عنوان</th>
                                    <th style={{width: "30%"}}>فایل دوره</th>
                                    <th style={{width: "30%"}}>یادداشت مدرس</th>
                                    <th style={{width: "20%"}}>وضعیت انتشار</th>
                                </tr>
                                </thead>
                                <tbody>
                                {chapterData.map((chapter, index) => (
                                    <tr key={index}>
                                        <td
                                            className="text-truncate"
                                            style={{maxWidth: "150px"}}
                                        >
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
                                                                className="img-fluid rounded mx-auto d-block"
                                                                style={{maxWidth: "120px"}}
                                                            />
                                                        );
                                                    } else if (
                                                        ["mp4", "webm", "ogg"].includes(ext)
                                                    ) {
                                                        return (
                                                            <video
                                                                controls
                                                                className="img-fluid d-block mx-auto"
                                                                style={{maxWidth: "180px"}}
                                                            >
                                                                <source
                                                                    src={fileUrl}
                                                                    type={`video/${ext}`}
                                                                />
                                                                مرورگر شما از ویدئو پشتیبانی نمی‌کند.
                                                            </video>
                                                        );
                                                    } else {
                                                        return (
                                                            <a
                                                                href={fileUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn btn-sm btn-primary"
                                                            >
                                                                دانلود فایل
                                                            </a>
                                                        );
                                                    }
                                                })()}
                                        </td>
                                        <td
                                            className="text-truncate"
                                            style={{maxWidth: "200px"}}
                                        >
                                            {chapter.remarks}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-dark btn-sm ms-2"
                                                onClick={() =>
                                                    navigate(`/teacher-edit-chapter/${chapter.id}`)
                                                }
                                            >
                                                ویرایش
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm ms-2"
                                                onClick={() => handleDeleteClick(chapter.id)}
                                            >
                                                حذف
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {totalResult === 0 && (
                                <div className="text-center text-muted py-3">
                                    هیچ فصلی برای این دوره وجود ندارد.
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

