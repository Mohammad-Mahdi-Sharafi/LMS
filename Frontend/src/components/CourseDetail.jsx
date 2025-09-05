import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const sideUrl = "http://127.0.0.1:8000";
const baseUrl = "http://127.0.0.1:8000/api";

function CourseDetail() {
    const navigate = useNavigate();
    const {course_id} = useParams();
    const studentId = localStorage.getItem("studentId");

    // Data
    const [courseData, setCourseData] = useState({});
    const [teacherData, setTeacherData] = useState({});
    const [chapterData, setChapterData] = useState([]);
    const [relatedCourses, setRelatedCourses] = useState([]);
    const [techList, setTechList] = useState([]);
    const [rating, setRating] = useState(0);

    // Status
    const [studentLoginStatus, setStudentLoginStatus] = useState("");
    const [enrollStatus, setEnrollStatus] = useState("");
    const [ratingStatus, setRatingStatus] = useState("");
    const [favoriteStatus, setFavoriteStatus] = useState(false);

    // Forms
    const [ratingData, setRatingData] = useState({rating: "", review: ""});

    // Video modal state
    const [activeChapter, setActiveChapter] = useState(null); // {title, video?.url, ...}

    // ---------- Helpers ----------
    const fullUrl = (maybeRelative) => {
        if (!maybeRelative) return "";
        return maybeRelative.startsWith("http") ? maybeRelative : `${sideUrl}${maybeRelative}`;
    };

    const toYouTubeEmbed = (url) => {
        if (!url) return null;
        try {
            const u = new URL(url);
            // https://www.youtube.com/watch?v=ID or youtu.be/ID
            if (u.hostname.includes("youtube.com")) {
                const v = u.searchParams.get("v");
                return v ? `https://www.youtube.com/embed/${v}` : null;
            }
            if (u.hostname === "youtu.be") {
                const id = u.pathname.replace("/", "");
                return id ? `https://www.youtube.com/embed/${id}` : null;
            }
        } catch {
        }
        return null;
    };

    const toVimeoEmbed = (url) => {
        if (!url) return null;
        try {
            const u = new URL(url);
            if (u.hostname.includes("vimeo.com")) {
                const id = u.pathname.split("/").filter(Boolean).pop();
                return id ? `https://player.vimeo.com/video/${id}` : null;
            }
        } catch {
        }
        return null;
    };

    const isFileVideo = (url) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url || "");

    // ---------- Effects ----------
    useEffect(() => {
        document.title = "Course Detail";

        axios
            .get(`${baseUrl}/teacher-course-detail/${course_id}`, {
                headers: {Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf"},
            })
            .then((res) => {
                setCourseData(res.data);
                setTeacherData(res.data.teacher || {});
                setChapterData(res.data.course_chapters || []);
                setRelatedCourses(res.data.related_courses || []);
                setTechList(res.data.tech_list || []);
                if (res.data.course_rating) setRating(res.data.course_rating);
            });

        if (localStorage.getItem("studentLoginStatus") === "true") {
            setStudentLoginStatus("success");
        }

        if (studentId) {
            axios
                .get(`${baseUrl}/fetch-enroll-status/${studentId}/${course_id}`, {
                    headers: {Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf"},
                })
                .then((res) => res.data.bool && setEnrollStatus("success"));

            axios
                .get(`${baseUrl}/fetch-rating-status/${studentId}/${course_id}`, {
                    headers: {Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf"},
                })
                .then((res) => res.data.bool && setRatingStatus("success"));

            axios
                .get(`${baseUrl}/fetch-favorite-status/${studentId}/${course_id}`)
                .then((res) => setFavoriteStatus(!!res.data.bool));
        }
    }, [course_id, studentId]);

    // Close modal => stop playback by unmounting player
    useEffect(() => {
        const modalEl = document.getElementById("videoModal");
        if (!modalEl) return;
        const onHidden = () => setActiveChapter(null);
        modalEl.addEventListener("hidden.bs.modal", onHidden);
        return () => modalEl.removeEventListener("hidden.bs.modal", onHidden);
    }, []);

    // ---------- Handlers ----------
    const goToLogin = () => navigate("/student-login");

    const enrollCourse = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("course", course_id);
        formData.append("student", studentId);

        axios
            .post(`${baseUrl}/student-enroll-course`, formData, {
                headers: {Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf"},
            })
            .then(() => {
                Swal.fire({
                    title: "ثبت نام با موفقیت انجام شد",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: "top-right",
                    showConfirmButton: false,
                });
                setEnrollStatus("success");
            });
    };

    const handleRatingChange = (e) => {
        setRatingData({...ratingData, [e.target.name]: e.target.value});
    };

    const submitRating = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("course", course_id);
        formData.append("student", studentId);
        formData.append("rating", ratingData.rating);
        formData.append("review", ratingData.review);

        axios
            .post(`${baseUrl}/course-rating/${course_id}`, formData, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                Swal.fire({
                    title: "امتیاز شما ثبت شد",
                    icon: "success",
                    toast: true,
                    timer: 4000,
                    position: "top-right",
                    showConfirmButton: false,
                });
                setRatingData({rating: "", review: ""});
                setRatingStatus("success");
            });
    };

    const toggleFavorite = () => {
        if (!studentId) return goToLogin();
        if (favoriteStatus) {
            axios
                .delete(`${baseUrl}/remove-favorite-course/${studentId}/${course_id}`, {
                    headers: {Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf"},
                })
                .then(() => setFavoriteStatus(false));
        } else {
            const formData = new FormData();
            formData.append("course", course_id);
            formData.append("student", studentId);
            formData.append("status", "True");
            axios
                .post(`${baseUrl}/student-add-favorite-course`, formData, {
                    headers: {Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf"},
                })
                .then(() => setFavoriteStatus(true));
        }
    };

    // ---------- Renderers ----------
    const renderPlayer = () => {
        if (!activeChapter) return null;

        // Try to read common shapes: chapter.video?.url OR chapter.video_url OR chapter.video
        const raw = activeChapter?.video?.url || activeChapter?.video_url || activeChapter?.video || "";
        const url = fullUrl(raw);

        const yt = toYouTubeEmbed(url);
        const vimeo = toVimeoEmbed(url);
        const showIframe = yt || vimeo || (!isFileVideo(url) && url);
        const iframeSrc = yt || vimeo || url;

        return (
            <>
                {showIframe ? (
                    <div className="ratio ratio-16x9">
                        <iframe
                            src={iframeSrc}
                            title={activeChapter.title || "Course video"}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                ) : (
                    <video
                        className="w-100 rounded-2"
                        controls
                        controlsList="nodownload"
                        src={url}
                    />
                )}
            </>
        );
    };

    return (
        <div className="container-fluid p-0">
            {/* Hero */}
            <div
                className="position-relative text-white"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.9)), url(${courseData.featured_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "350px",
                }}
            >
                <div className="container h-100 d-flex flex-column justify-content-center">
                    <h1 className="fw-bold">{courseData.title}</h1>
                    <p className="lead">{courseData.description}</p>

                    <div>
                        {techList.map((tech, i) => (
                            <Link key={i} to={`/category/${tech.trim()}`} className="badge bg-warning text-dark me-2">
                                {tech}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-3">
                        {studentLoginStatus === "success" && enrollStatus !== "success" && (
                            <button onClick={enrollCourse} className="btn btn-lg btn-success shadow">
                                ثبت نام در دوره
                            </button>
                        )}

                        {enrollStatus === "success" && (
                            <>
                                <span className="fw-bold d-block mb-2">✅ شما در این دوره ثبت‌نام کرده‌اید</span>
                                <button onClick={toggleFavorite} className="btn btn-outline-danger shadow">
                                    {favoriteStatus ? "💔 حذف از علاقه‌مندی‌ها" : "❤️ افزودن به علاقه‌مندی‌ها"}
                                </button>
                            </>
                        )}

                        {studentLoginStatus !== "success" && (
                            <button onClick={goToLogin} className="btn btn-lg btn-primary shadow">
                                ورود برای ثبت نام
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                {/* Teacher Info */}
                <div className="card shadow-lg border-0 mb-4">
                    <div className="card-body">
                        <h4 className="fw-bold">مدرس دوره:</h4>
                        {teacherData.id && (
                            <Link to={`/teacher-detail/${teacherData.id}`} className="text-decoration-none">
                                <h5>{teacherData.full_name}</h5>
                            </Link>
                        )}
                        <div className="d-flex flex-wrap gap-4 mt-3 align-items-center">
                            <span className="fw-bold">⏱ مدت زمان: 6 ساعت و 40 دقیقه</span>
                            <span className="fw-bold">👥 تعداد دانشجویان: {courseData.total_enrolled_students}</span>
                            <div className="fw-bold d-flex align-items-center">
                                ⭐ امتیاز دوره: {`${rating}/5`}
                                {studentLoginStatus === "success" &&
                                    enrollStatus === "success" &&
                                    ratingStatus !== "success" && (
                                        <button
                                            className="btn btn-sm btn-success shadow ms-3"
                                            data-bs-toggle="modal"
                                            data-bs-target="#courseRatingModal"
                                        >
                                            امتیاز دهی
                                        </button>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rating Modal */}
                <div className="modal fade" id="courseRatingModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">ثبت امتیاز</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={submitRating}>
                                    <div className="mb-3">
                                        <label className="form-label">امتیاز</label>
                                        <select
                                            name="rating"
                                            className="form-control"
                                            value={ratingData.rating}
                                            onChange={handleRatingChange}
                                            required
                                        >
                                            <option value="">انتخاب کنید</option>
                                            <option value="1">1 - خیلی ضعیف</option>
                                            <option value="2">2</option>
                                            <option value="3">3 - متوسط</option>
                                            <option value="4">4</option>
                                            <option value="5">5 - عالی</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">نظرات</label>
                                        <textarea
                                            name="review"
                                            className="form-control"
                                            rows="3"
                                            value={ratingData.review}
                                            onChange={handleRatingChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">ثبت</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chapters */}
                <div className="card shadow border-0 mb-4">
                    <h5 className="card-header bg-dark text-white">فصل‌های دوره</h5>
                    {enrollStatus === "success" ? (
                        <ul className="list-group list-group-flush">
                            {chapterData.map((chapter, idx) => (
                                <li key={chapter.id || idx}
                                    className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="me-3">
                                        <h6 className="mb-1">{chapter.title}</h6>
                                        <small className="text-muted">{chapter.description}</small>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-outline-dark btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#videoModal"
                                        onClick={() => setActiveChapter(chapter)}
                                    >
                                        مشاهده ویدیو
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="card-body text-center text-muted">
                            برای مشاهده فصل‌های دوره ابتدا باید ثبت‌نام کنید.
                        </div>
                    )}
                </div>

                {/* Shared Video Modal */}
                <div className="modal fade" id="videoModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{activeChapter?.title || "ویدیو"}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {activeChapter ? (
                                    renderPlayer()
                                ) : (
                                    <div className="ratio ratio-16x9 bg-light rounded-2"/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Courses */}
                <h3 className="mb-4">دوره‌های مرتبط</h3>
                <div className="row">
                    {relatedCourses.map((course, idx) => (
                        <div className="col-md-3 mb-4" key={idx}>
                            <div className="card h-100 border-0 shadow-sm hover-shadow">
                                <Link to={`/detail/${course.id}`}>
                                    <img
                                        src={
                                            course.featured_image?.startsWith("http")
                                                ? course.featured_image
                                                : `${sideUrl}${course.featured_image}`
                                        }
                                        className="card-img-top"
                                        alt={course.title}
                                    />
                                </Link>
                                <div className="card-body">
                                    <h6 className="card-title">
                                        <Link to={`/detail/${course.id}`} className="text-decoration-none">
                                            {course.title}
                                        </Link>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CourseDetail;
