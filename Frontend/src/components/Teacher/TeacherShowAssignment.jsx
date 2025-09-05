import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar.jsx";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherShowAssignment() {
    const {student_id, teacher_id} = useParams();
    const [assignmentData, setAssignmentData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Teacher Show Assignments";

        axios
            .get(`${baseUrl}/student-assignment/${teacher_id}/${student_id}`, {
                headers: {
                    Authorization:
                        "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => {
                setAssignmentData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching assignments:", error);
                setLoading(false);
            });
    }, [student_id, teacher_id]);

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <aside className="col-md-3 col-lg-2 mb-4">
                    <TeacherSidebar/>
                </aside>

                {/* Main Section */}
                <section className="col-md-9 col-lg-10">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div
                            className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">📑 تمام تمرین‌ها</h5>
                            <span className="badge bg-info px-3 py-2 rounded-pill">
                {assignmentData.length} تمرین
              </span>
                        </div>

                        <div className="card-body p-0">
                            {loading ? (
                                <div className="text-center text-muted py-5">در حال بارگذاری...</div>
                            ) : assignmentData.length === 0 ? (
                                <div className="text-center text-muted py-5">
                                    <h5>هیچ تمرینی برای این دانشجو ثبت نشده است.</h5>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light">
                                        <tr>
                                            <th>📌 عنوان تمرین</th>
                                            <th>📝 توضیحات</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {assignmentData.map((assignment, index) => (
                                            <tr key={index}>
                                                <td className="fw-semibold">{assignment.title}</td>
                                                <td>{assignment.detail}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherShowAssignment;
