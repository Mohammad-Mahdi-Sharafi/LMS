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

    const [chapterData, setChapterData] = useState([]);
    const [courseData, setCourseData] = useState({});
    const [enrollStatus, setEnrollStatus] = useState("");
    const [teacherData, setTeacherData] = useState({});
    const [relatedCourseData, setRelatedCourseData] = useState([]);
    const [techListData, setTechListData] = useState([]);
    const [studentLoginStatus, setStudentLoginStatus] = useState("");
    const [ratingStatus, setRatingStatus] = useState("");
    const [rating, setRating] = useState(0);
    const [ratingData, setRatingData] = useState({
        rating: "",
        review: "",
    });

    useEffect(() => {
        document.title = "Course Detail";

        // Fetch course detail
        axios
            .get(`${baseUrl}/teacher-course-detail/${course_id}`, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => {
                setCourseData(response.data);
                setTeacherData(response.data.teacher || {});
                setChapterData(response.data.course_chapters || []);
                setRelatedCourseData(response.data.related_courses || []);
                setTechListData(response.data.tech_list || []);
                if (response.data.course_rating !== "" && response.data.course_rating != null) {
                    setRating(response.data.course_rating)
                }
            });

        // Check login
        const loginStatus = localStorage.getItem("studentLoginStatus");
        if (loginStatus === "true") setStudentLoginStatus("success");

        // Check enrollment
        if (studentId) {
            axios
                .get(`${baseUrl}/fetch-enroll-status/${studentId}/${course_id}`, {
                    headers: {
                        Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    },
                })
                .then((response) => {
                    if (response.data.bool) setEnrollStatus("success");
                });
        }

        // Fetch rating status
        try{
            axios.get(`${baseUrl}/fetch-rating-status/${studentId}/${course_id}`, {
                    headers: {
                        Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                    },}).then((response) => {
                        setRatingStatus("success");
            })
        }catch(error){
            console.log(error);
        }

    }, [course_id, studentId]);

    // Enroll in course
    const enrollCourse = (event) => {
        event.preventDefault();
        const _formData = new FormData();
        _formData.append("course", course_id);
        _formData.append("student", studentId);

        axios
            .post(`${baseUrl}/student-enroll-course`, _formData, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then(() => {
                Swal.fire({
                    title: "ثبت نام با موفقیت انجام شد",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: "top-right",
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                setEnrollStatus("success");
            });
    };

    const goToPage = () => navigate("/student-login");

    // Rating form
    const handleChange = (event) => {
        setRatingData({
            ...ratingData,
            [event.target.name]: event.target.value,
        });
    };

    const formSubmit = (event) => {
        event.preventDefault();

        const _formData = new FormData();
        _formData.append("course", course_id);
        _formData.append("student", studentId);
        _formData.append("rating", ratingData.rating);
        _formData.append("review", ratingData.review);

        axios
            .post(`${baseUrl}/course-rating/${course_id}`, _formData, {
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
                    timer: 5000,
                    position: "top-right",
                    showConfirmButton: false,
                });
                setRatingData({rating: "", review: ""});
                window.location.reload();
            })
            .catch((error) => console.error("Error submitting rating:", error));
    };

    return (
        <div className="container-fluid p-0">
            {/* Hero Section */}
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
                        {techListData.map((tech, i) => (
                            <Link
                                key={i}
                                to={`/category/${tech.trim()}`}
                                className="badge bg-warning text-dark me-2"
                            >
                                {tech}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-3">
                        {studentLoginStatus === "success" && enrollStatus !== "success" && (
                            <button
                                onClick={enrollCourse}
                                className="btn btn-lg btn-success shadow"
                            >
                                ثبت نام در دوره
                            </button>
                        )}
                        {enrollStatus === "success" && (
                            <span className="fw-bold">شما در این دوره ثبت‌نام کرده‌اید</span>
                        )}
                        {studentLoginStatus !== "success" && (
                            <button
                                onClick={goToPage}
                                className="btn btn-lg btn-primary shadow"
                            >
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
                            <Link
                                to={`/teacher-detail/${teacherData.id}`}
                                className="text-decoration-none"
                            >
                                <h5>{teacherData.full_name}</h5>
                            </Link>
                        )}
                        <div className="d-flex flex-wrap gap-4 mt-3 align-items-center">
                            <span className="fw-bold">⏱ مدت زمان: 6 ساعت و 40 دقیقه</span>
                            <span className="fw-bold">
                👥 تعداد دانشجویان:{" "}
                                <span dir="ltr">{courseData.total_enrolled_students}</span>
              </span>
                            <div className="fw-bold d-flex align-items-center">
                                 ⭐ امتیاز دوره: {`${rating}/5`}
                                {studentLoginStatus === "success" &&
                                    enrollStatus === "success" &&
                                    ratingStatus !== "success" &&
                                    (
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
                <div
                    className="modal fade"
                    id="courseRatingModal"
                    tabIndex="-1"
                    aria-labelledby="courseRatingModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="courseRatingModalLabel">
                                    ثبت امتیاز
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={formSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="rating" className="form-label">
                                            امتیاز
                                        </label>
                                        <select
                                            id="rating"
                                            name="rating"
                                            className="form-control"
                                            value={ratingData.rating}
                                            onChange={handleChange}
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
                                        <label htmlFor="review" className="form-label">
                                            نظرات
                                        </label>
                                        <textarea
                                            id="review"
                                            name="review"
                                            className="form-control"
                                            rows="3"
                                            value={ratingData.review}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        ثبت
                                    </button>
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
                            {chapterData.map((chapter, idx) => {
                                const modalId = `videoModal-${idx}`;
                                return (
                                    <li
                                        key={chapter.id || idx}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <div>
                                            <h6 className="mb-1">{chapter.title}</h6>
                                            <small className="text-muted">{chapter.description}</small>
                                        </div>
                                        <button
                                            className="btn btn-outline-dark btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#${modalId}`}
                                        >
                                            مشاهده ویدیو
                                        </button>

                                        {/* Video Modal */}
                                        <div
                                            className="modal fade"
                                            id={modalId}
                                            tabIndex="-1"
                                            aria-hidden="true"
                                        >
                                            <div className="modal-dialog modal-xl">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title">{chapter.title}</h5>
                                                        <button
                                                            type="button"
                                                            className="btn-close"
                                                            data-bs-dismiss="modal"
                                                        ></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="ratio ratio-16x9">
                                                            <iframe
                                                                src={chapter.video?.url}
                                                                title={chapter.title}
                                                                allowFullScreen
                                                            ></iframe>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="card-body text-center text-muted">
                            برای مشاهده فصل‌های دوره ابتدا باید در این دوره ثبت‌نام کنید.
                        </div>
                    )}
                </div>

                {/* Related Courses */}
                <h3 className="mb-4">دوره‌های مرتبط</h3>
                <div className="row">
                    {relatedCourseData.map((course, idx) => (
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
                                        <Link
                                            to={`/detail/${course.id}`}
                                            className="text-decoration-none"
                                        >
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

