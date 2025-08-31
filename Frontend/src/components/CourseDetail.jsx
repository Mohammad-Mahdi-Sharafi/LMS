import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const sideUrl = "http://127.0.0.1:8000";
const baseUrl = "http://127.0.0.1:8000/api";

function CourseDetail() {
    const {course_id} = useParams();
    const [chapterData, setChapterData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [relatedCourseData, setRelatedCourseData] = useState([])
    const [techlistData, setTechlistData] = useState([])

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
                setTeacherData(response.data.teacher);
                setChapterData(response.data.course_chapters);
                setRelatedCourseData(JSON.parse(response.data.related_videos));
                setTechlistData(response.data.tech_list)
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, [course_id]);

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-4">
                    <img
                        src={courseData.featured_image}
                        style={{
                            width: "100%",
                            height: "200px",
                            // objectFit: "cover",
                        }}
                        className="card-img-top"
                        alt="..."
                    />
                </div>
                <div className="col-8">
                    <h3>{courseData.title}</h3>
                    <p>{courseData.description}</p>
                    <p className="fw-bold">
                        <strong>
                            مدرس دوره :
                            <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link>
                        </strong>
                    </p>
                    <p className="fw-bold"> تکنولوژی های دوره: &nbsp;
                        {techlistData.map((tech, index) => (
                            <Link key={index} to={`/category/${tech.trim()}`} className="badge bg-warning ms-1">
                                {tech}
                            </Link>
                        ))}
                    </p>
                    <p className="fw-bold">
                        <b>
                            مدت زمان <Link to="#">6 ساعت و 40 دقییقه</Link>
                        </b>
                    </p>
                    <p className="fw-bold">
                        <b>تعداد دانشجویان : 456 دانشجو</b>
                    </p>
                    <p className="fw-bold">
                        <b>امتیاز دوره : 4.5</b>
                    </p>
                </div>
            </div>

            {/* course videos */}
            <div className="card mt-4">
                <h5 className="card-header">فصل های دوره</h5>
                <ul className="list-group list-group-flush">
                    {chapterData.map((chapter, index) =>
                        <li className="list-group-item">
                            {chapter.title} | {chapter.description}
                            <span className="float-start">
                                  <span className="ms-2">1 ساعت 30 دقیقه</span>
                                      <button
                                          className="btn btn-sm btn-dark float-start"
                                          data-bs-toggle="modal"
                                          data-bs-target="#videoModal"
                                      >
                                        <i className="bi-play"></i>
                                      </button>
                                </span>
                            {/* video modal start */}
                            <div
                                className="modal fade"
                                id="videoModal"
                                tabIndex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-xl">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                                مقدمه
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
                                                    src={chapter.video.url}
                                                    title={chapter.title}
                                                    allowfullscreen
                                                ></iframe>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button type="button" className="btn btn-primary">
                                                Save changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* video modal end */}
                        </li>
                    )}
                </ul>
            </div>

            <h3 className="pb-1 mb-4 mt-4">دوره های مرتبط</h3>

            {/* related courses */}

            <div className="row mb-4">
                {relatedCourseData.map((relatedCourse, index) =>
                    <div className="col-md-3">
                        <div className="card">
                            <Link target="_blank" to={`/detail/${relatedCourse.pk}`} >

                                <img src={`${sideUrl}/media/${relatedCourse.fields.featured_image}`} className="card-img-top" alt="..."/>
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/detail/${relatedCourse.pk}`}>{relatedCourse.fields.title}</Link>
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
