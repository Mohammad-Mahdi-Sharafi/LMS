import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherDetail() {
    const {teacher_id} = useParams();

    const [teacherData, setTeacherData] = useState({});
    const [courseData, setCourseData] = useState([]);
    const [skillListData, setSkillListData] = useState([]);

    useEffect(() => {
        document.title = "Teacher Detail";

        const headers = {
            Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
        };

        async function load() {
            try {
                const [teacherRes, coursesRes] = await Promise.all([
                    axios.get(`${baseUrl}/teacher/${teacher_id}`, {headers}),
                    axios.get(`${baseUrl}/teacher-courses/${teacher_id}`, {headers}),
                ]);

                const teacher = teacherRes.data || {};
                setTeacherData(teacher);

                const providedSkillList = Array.isArray(teacher.skill_list)
                    ? teacher.skill_list
                    : [];

                const derivedSkillList =
                    providedSkillList.length > 0
                        ? providedSkillList
                        : (teacher.skills || "")
                            .replace(/،/g, ",")
                            .split(/[,\s]+/)
                            .map((s) => s.trim())
                            .filter(Boolean);

                setSkillListData(derivedSkillList);

                setCourseData(Array.isArray(coursesRes.data) ? coursesRes.data : []);
            } catch (err) {
                console.error("Error fetching teacher detail or courses:", err);
            }
        }

        load();
    }, [teacher_id]);

    return (
        <div className="container mt-5">
            <div className="row g-4 align-items-center">
                {/* Teacher Image */}
                <div className="col-md-4 text-center">
                    <img
                        src={teacherData.profile_image || "/vite.svg"}
                        alt={teacherData.full_name || "Teacher"}
                        className="img-fluid rounded shadow-sm"
                        style={{maxHeight: "300px", objectFit: "cover"}}
                    />
                </div>

                {/* Teacher Info */}
                <div className="col-md-8">
                    <h2 className="fw-bold mb-3">{teacherData.full_name}</h2>
                    <p className="text-muted">{teacherData.bio || "بدون توضیحات"}</p>

                    {/* Skills */}
                    <div className="mb-3">
                        <h6 className="fw-bold mb-2">مهارت‌ها:</h6>
                        {skillListData.length > 0 ? (
                            skillListData.map((skill, index) => (
                                <Link
                                    key={index}
                                    to={`/teacher-skill-courses/${skill.trim()}/${teacher_id}`}
                                    className="badge bg-warning text-dark rounded-pill me-2 mb-2"
                                >
                                    {skill.trim()}
                                </Link>
                            ))
                        ) : (
                            <span className="text-muted">مهارتی ثبت نشده</span>
                        )}
                    </div>

                    {/* Latest Course */}
                    <div className="mb-3">
                        <h6 className="fw-bold d-inline">جدیدترین دوره: </h6>
                        {courseData.length > 0 ? (
                            <Link
                                to={`/detail/${courseData[0].id}`}
                                className="text-decoration-none text-primary fw-semibold"
                            >
                                {courseData[0].title}
                            </Link>
                        ) : (
                            <span className="text-muted">هیچ دوره‌ای وجود ندارد</span>
                        )}
                    </div>

                    {/* Rating */}
                    <div>
                        <h6 className="fw-bold">امتیاز مدرس: ⭐ 4.5</h6>
                    </div>
                </div>
            </div>

            {/* Course List */}
            <div className="card mt-5 shadow-sm border-0">
                <h5 className="card-header bg-dark text-light">لیست دوره‌ها</h5>
                <div className="list-group list-group-flush">
                    {courseData.length > 0 ? (
                        courseData.map((course) => (
                            <Link
                                key={course.id}
                                to={`/detail/${course.id}`}
                                className="list-group-item list-group-item-action"
                            >
                                {course.title}
                            </Link>
                        ))
                    ) : (
                        <div className="list-group-item text-muted">هیچ دوره‌ای موجود نیست</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TeacherDetail;

