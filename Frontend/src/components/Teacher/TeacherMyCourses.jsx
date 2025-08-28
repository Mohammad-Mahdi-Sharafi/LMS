import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherMyCourses() {
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState([]);
        const teacherId = localStorage.getItem("teacherId");

    useEffect(() => {
        document.title = "Teacher My Courses";
        axios
            .get(baseUrl + "/teacher-courses/" + teacherId, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => {
                setCourseData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <aside className="col-md-3">
                        <TeacherSidebar/>
                    </aside>
                    <section className="col-md-9">
                        <div className="card">
                            <h5 className="card-header">دوره های من</h5>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>نام</th>
                                            <th>سازنده</th>
                                            <th>عکس دوره</th>
                                            <th>مدیریت دوره</th>
                                            <th>وضعیت انتشار</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courseData.map((course, index) =>
                                            <tr>
                                                <td>{course.title}</td>
                                                <td>
                                                    <Link to="/">{course.teacher}</Link>
                                                </td>
                                                <td><img src={course.featured_image} width="88" className="rounded" alt={course.title} /></td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-dark active"
                                                        onClick={() => navigate("/teacher-add-chapters/" + course.id)}
                                                    >
                                                        تغییر
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger btn-sm active">
                                                        حذف
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default TeacherMyCourses;
