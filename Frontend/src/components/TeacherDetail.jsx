import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function TeacherDetail() {
  const { teacher_id } = useParams();

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
        // Fetch teacher details and teacher courses in parallel
        const [teacherRes, coursesRes] = await Promise.all([
          axios.get(`${baseUrl}/teacher/${teacher_id}`, { headers }),
          axios.get(`${baseUrl}/teacher-courses/${teacher_id}`, { headers }),
        ]);

        const teacher = teacherRes.data || {};
        setTeacherData(teacher);

        // If backend provides skill_list use it, otherwise derive from "skills"
        const providedSkillList = Array.isArray(teacher.skill_list)
          ? teacher.skill_list
          : [];

        const derivedSkillList =
          providedSkillList.length > 0
            ? providedSkillList
            : (teacher.skills || "")
                .replace(/،/g, ",")          // Persian comma → normal comma
                .split(/[,\s]+/)             // split by comma or whitespace
                .map(s => s.trim())
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
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src="/vite.svg" className="card-img-top" alt={teacherData.full_name || "Teacher"} />
        </div>
        <div className="col-8">
          <h3>{teacherData.full_name}</h3>
          <p>{teacherData.bio}</p>

          <p className="fw-bold">
            <b>
              مهارت ها :
              {skillListData.map((skill, index) => (
                <Link
                  key={index}
                  to={`/teacher-skill-courses/${skill.trim()}/${teacher_id}`}
                  className="badge rounded-pill text-dark bg-warning ms-2"
                >
                  {skill.trim()}
                </Link>
              ))}
            </b>
          </p>

          <p className="fw-bold">
            <b>
              جدید ترین دوره :{" "}
              {courseData.length > 0 ? (
                <Link to={`/detail/${courseData[0].id}`}>{courseData[0].title}</Link>
              ) : (
                "هنوز دوره‌ای وجود ندارد"
              )}
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
            <div className="list-group-item text-muted">
              هیچ دوره‌ای موجود نیست
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherDetail;
