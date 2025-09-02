import {Link, useLocation} from "react-router-dom";

function TeacherSidebar() {
    const location = useLocation();

    // function to highlight active menu
    const isActive = (path) => (location.pathname === path ? "active" : "");

    return (
        <div className="card shadow-sm border-0 rounded-3">
            <div className="card-header bg-primary text-white text-center fw-bold">
                منوی مدرس
            </div>
            <div className="list-group list-group-flush">
                <Link
                    className={`list-group-item list-group-item-action ${isActive("/teacher-dashboard")}`}
                    to="/teacher-dashboard"
                >
                    📊 داشبورد
                </Link>
                <Link
                    className={`list-group-item list-group-item-action ${isActive("/teacher-my-courses")}`}
                    to="/teacher-my-courses"
                >
                    📚 دوره‌های من
                </Link>
                <Link
                    className={`list-group-item list-group-item-action ${isActive("/teacher-add-courses")}`}
                    to="/teacher-add-courses"
                >
                    ➕ اضافه کردن دوره
                </Link>
                <Link
                    className={`list-group-item list-group-item-action ${isActive("/teacher-student-list")}`}
                    to="/teacher-student-list"
                >
                    👥 دانشجویان من
                </Link>
                <Link
                    className={`list-group-item list-group-item-action ${isActive("/teacher-profile-settings")}`}
                    to="/teacher-profile-settings"
                >
                    ⚙️ تنظیمات
                </Link>
                <Link
                    className={`list-group-item list-group-item-action ${isActive("/teacher-change-password")}`}
                    to="/teacher-change-password"
                >
                    🔑 تغییر رمز عبور
                </Link>
                <Link
                    className={`list-group-item list-group-item-action text-danger fw-bold ${isActive("/teacher-logout")}`}
                    to="/teacher-logout"
                >
                    🚪 خروج
                </Link>
            </div>
        </div>
    );
}

export default TeacherSidebar;
