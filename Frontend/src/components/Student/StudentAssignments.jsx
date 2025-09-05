import { Link } from "react-router-dom";
import StudentSidebar from "./StudentSidebar.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function StudentAssignments() {
    const studentId = localStorage.getItem("studentId");
    const [assignmentData, setAssignmentData] = useState([]);
    const [assignmentStatus, setAssignmentStatus] = useState({});

    useEffect(() => {
        document.title = "Student Show Assignments";

        axios
            .get(`${baseUrl}/student-show-assignment/${studentId}`, {
                headers: {
                    Authorization:
                        "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            })
            .then((response) => {
                setAssignmentData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching assignments:", error);
            });
    }, [studentId]);

    const markAsDone = (assignment_id, title, detail, student, teacher) => {
        const _formData = new FormData();
        _formData.append("status", "true");
        _formData.append("title", title);
        _formData.append("detail", detail);
        _formData.append("student", student);
        _formData.append("teacher", teacher);

        try {
            axios
                .put(`${baseUrl}/update-assignment/${assignment_id}`, _formData, {
                    headers: {
                        Authorization:
                            "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        setAssignmentStatus("success");
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <aside className="col-md-3 col-lg-2 mb-4">
                    <StudentSidebar />
                </aside>

                {/* Main Section */}
                <section className="col-md-9 col-lg-10">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">📑 تمرین‌های من</h5>
                            <span className="badge bg-info px-3 py-2 rounded-pill">
                                {assignmentData.length} تمرین
                            </span>
                        </div>

                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>📌 عنوان تمرین</th>
                                            <th>جزیات</th>
                                            <th>📝 مدرس</th>
                                            <th>عمل</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assignmentData.map((assignment, index) => (
                                            <tr key={index}>
                                                <td className="fw-semibold">{assignment.title}</td>
                                                <td className="fw-semibold">{assignment.detail}</td>
                                                <td className="fw-semibold">{assignment.teacher.full_name}</td>
                                                <td className="fw-semibold">
                                                    {assignment.status !== "false" ? (
                                                        <button
                                                            onClick={() =>
                                                                markAsDone(
                                                                    assignment.id,
                                                                    assignment.title,
                                                                    assignment.detail,
                                                                    assignment.student.id,
                                                                    assignment.teacher.id
                                                                )
                                                            }
                                                            className="btn btn-sm btn-success"
                                                        >
                                                            علامت به عنوان انجام شده
                                                        </button>
                                                    ) : (
                                                        <span>انجام شده</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default StudentAssignments;
