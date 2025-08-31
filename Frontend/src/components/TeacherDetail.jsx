import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherDetail() {
    const [courseData, setCourseData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const {teacher_id} = useParams()

    useEffect(() => {
        document.title = "Teacher Detail"
        axios
            .get(`${baseUrl}/teacher/${teacher_id}`, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => {
                setTeacherData(response.data);
                setCourseData(response.data.teacher_courses);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, [])
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-4">
                    <img src="/vite.svg" className="card-img-top" alt="..."/>
                </div>
                <div className="col-8">
                    <h3>{teacherData.full_name}</h3>
                    <p>{teacherData.bio}</p>
                    <p className="fw-bold">
                        <b>
                            مهارت ها : <Link to="/category/php">PHP</Link>, <Link to="/category/python">Python</Link>
                        </b>
                    </p>
                    <p className="fw-bold">
                        <b>
                            جدید ترین دوره : <Link to="#">Javascript</Link>
                        </b>
                    </p>
                    <p className="fw-bold">
                        <b>امتیاز دوره : 4.5</b>
                    </p>
                </div>
            </div>

            {/* course list */}
            <div className="card mt-4">
                <h5 className="card-header">لیست دوره ها</h5>
                <div className="list-group list-group-flush">
                    {courseData.map((course, index) =>
                        <Link to={`/detail/${course.id}`}
                              className="list-group-item list-group-item-action">{course.title}</Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TeacherDetail