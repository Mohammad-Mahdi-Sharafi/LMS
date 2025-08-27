import { Link } from "react-router-dom";

function TeacherSidebar() {
  return (
    <>
      <div className="card">
        <h5 className="card-header">
                      <Link
            className="list-group-item list-group-item-action"
            to="/teacher-dashboard"
          >
            داشبورد
          </Link>
        </h5>
        <div className="list-group">
          <Link
            className="list-group-item list-group-item-action"
            to="/teacher-my-courses"
          >
            دوره های من
          </Link>
          <Link
            className="list-group-item list-group-item-action"
            to="/teacher-add-courses"
          >
            اضافه کردن دوره
          </Link>
          <Link
            className="list-group-item list-group-item-action"
            to="/teacher-my-courses"
          >
            دانشجویان من
          </Link>
          <Link
            className="list-group-item list-group-item-action"
            to="/teacher-profile-settings"
          >
            تنظیمات
          </Link>
          <Link
            className="list-group-item list-group-item-action"
            to="/teacher-change-password"
          >
            تغییر رمز عبور
          </Link>
          <Link className="list-group-item list-group-item-action" to="/teacher-login">
            خروج
          </Link>
        </div>
      </div>
    </>
  );
}

export default TeacherSidebar;
