import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const sideUrl = "http://127.0.0.1:8000";
const baseUrl = "http://127.0.0.1:8000/api";

function CourseDetail() {
    const {course_id} = useParams();
    const [chapterData, setChapterData] = useState([]);
    const [courseData, setCourseData] = useState({});
    const [teacherData, setTeacherData] = useState({});
    const [relatedCourseData, setRelatedCourseData] = useState([]);
    const [techlistData, setTechlistData] = useState([]);

    useEffect(() => {
        document.title = "Course Detail";
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
                setTechlistData(response.data.tech_list || []);
            })
            .catch((error) => {
                console.error("Error fetching course detail:", error);
            });
    }, [course_id]);

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-4">
                    <img
                        src={courseData.featured_image}
                        style={{width: "100%", height: "200px"}}
                        className="card-img-top"
                        alt={courseData.title || "Course image"}
                    />
                </div>
                <div className="col-8">
                    <h3>{courseData.title}</h3>
                    <p>{courseData.description}</p>
                    <p className="fw-bold">
                        <strong>
                            مدرس دوره :{" "}
                            {teacherData.id && (
                                <Link to={`/teacher-detail/${teacherData.id}`}>
                                    {teacherData.full_name}
                                </Link>
                            )}
                        </strong>
                    </p>

                    <p className="fw-bold">
                        تکنولوژی های دوره:&nbsp;
                        {techlistData.map((tech, index) => (
                            <Link
                                key={index}
                                to={`/category/${tech.trim()}`}
                                className="badge bg-warning ms-1"
                            >
                                {tech}
                            </Link>
                        ))}
                    </p>
                    <p className="fw-bold">
                        <b>مدت زمان: 6 ساعت و 40 دقیقه</b>
                    </p>
                    <p className="fw-bold">
                        <b>تعداد دانشجویان : 456 دانشجو</b>
                    </p>
                    <p className="fw-bold">
                        <b>امتیاز دوره : 4.5</b>
                    </p>
                </div>
            </div>

            {/* Course Chapters */}
            <div className="card mt-4">
                <h5 className="card-header">فصل های دوره</h5>
                <ul className="list-group list-group-flush">
                    {chapterData.map((chapter, index) => {
                        const modalId = `videoModal-${index}`;
                        return (
                            <li key={chapter.id || index} className="list-group-item">
                                {chapter.title} | {chapter.description}
                                <span className="float-start">
                  <span className="ms-2">1 ساعت 30 دقیقه</span>
                  <button
                      className="btn btn-sm btn-dark float-start"
                      data-bs-toggle="modal"
                      data-bs-target={`#${modalId}`}
                  >
                    <i className="bi-play"></i>
                  </button>
                </span>

                                {/* Video Modal */}
                                <div
                                    className="modal fade"
                                    id={modalId}
                                    tabIndex="-1"
                                    aria-labelledby={`${modalId}-label`}
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog modal-xl">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id={`${modalId}-label`}>
                                                    {chapter.title}
                                                </h1>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
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
            </div>

            {/* Related Courses */}
            <h3 className="pb-1 mb-4 mt-4">دوره های مرتبط</h3>
            <div className="row mb-4">
                {relatedCourseData.map((relatedCourse, index) =>
                    <div className="col-md-3" key={index}>
                        <div className="card">
                            <Link target="_blank" to={`/detail/${relatedCourse.id}`}>
                                <img
                                    src={relatedCourse.featured_image?.startsWith("http")
                                        ? relatedCourse.featured_image
                                        : `${sideUrl}${relatedCourse.featured_image}`}
                                    className="card-img-top"
                                    alt={relatedCourse.title}
                                />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/detail/${relatedCourse.id}`}>{relatedCourse.title}</Link>
                                </h5>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default CourseDetail;

