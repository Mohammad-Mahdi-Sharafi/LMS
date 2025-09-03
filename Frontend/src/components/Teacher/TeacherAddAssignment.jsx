import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar.jsx";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherAddAssignment() {
  const navigate = useNavigate();
  const { course_id, student_id } = useParams();
  const teacherId = localStorage.getItem("teacherId");

  const [assignmentData, setAssignmentData] = useState({
    title: "",
    detail: "",
  });

  useEffect(() => {
    document.title = "Teacher Add Assignment";
  }, []);

  const handleChange = (event) => {
    setAssignmentData({
      ...assignmentData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = (event) => {
    event.preventDefault();

    const _formData = new FormData();
    _formData.append("course", course_id);
    _formData.append("student", student_id);
    _formData.append("teacher", teacherId);
    _formData.append("title", assignmentData.title);
    _formData.append("detail", assignmentData.detail);

    axios
      .post(`${baseUrl}/student-assignment/${teacherId}/${student_id}`, _formData, {
        headers: {
          Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        Swal.fire({
          title: "موفقیت!",
          text: "تمرین با موفقیت اضافه شد.",
          icon: "success",
          confirmButtonText: "باشه",
        }).then(() => {
          navigate(`/teacher-student-list`);
        });
      })
      .catch((error) => {
        console.error("Error adding assignment:", error);
        Swal.fire("خطا", "مشکلی در افزودن تمرین رخ داد.", "error");
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sidebar */}
        <aside className="col-md-3 mb-4">
          <TeacherSidebar />
        </aside>

        {/* Form Section */}
        <section className="col-md-9">
          <div className="card shadow-sm rounded-3 border-0">
            <h5 className="card-header bg-dark text-white py-3">
              ➕ افزودن تمرین جدید
            </h5>
            <div className="card-body p-4">
              <form onSubmit={formSubmit}>
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-semibold">
                    عنوان تمرین
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={assignmentData.title}
                    placeholder="مثال: پروژه HTML"
                    required
                  />
                </div>

                {/* Detail */}
                <div className="mb-3">
                  <label htmlFor="detail" className="form-label fw-semibold">
                    توضیحات تمرین
                  </label>
                  <textarea
                    onChange={handleChange}
                    className="form-control"
                    id="detail"
                    name="detail"
                    rows="4"
                    value={assignmentData.detail}
                    placeholder="توضیحات تمرین را وارد کنید..."
                    required
                  ></textarea>
                </div>

                {/* Submit */}
                <div className="d-flex justify-content-end pt-3">
                  <button
                    type="submit"
                    className="btn btn-success px-4 fw-semibold"
                  >
                    ذخیره تمرین
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherAddAssignment;
