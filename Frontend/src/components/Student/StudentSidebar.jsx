import { Link, useLocation } from "react-router-dom";

function StudentSidebar() {
    const location = useLocation();

    // highlight active menu
    const isActive = (path) => (location.pathname === path ? "active" : "");

    return (
        <div className="card shadow-sm border-0 rounded-3">
            <div className="card-header bg-success text-white text-center fw-bold">
                منوی دانشجو
            </div>
            <div className="list-group list-group-flush">
                <Link
                    className={`list-group-item list-group-item-action ${isActive("/student-dashboard")}`}
                    to="/student-dashboard"
                >
                    📊 داشبورد
                </Link>
                <Link
                    className={`list-group-item list-group-item-action ${isActive("/student-my-courses")}`}
                    to="/student-my-courses"
                >
                    📚 دوره‌های من
                </Link>
                <Link
                    className={`list-group-item list-group-item-action ${isActive("/student-favorite-courses")}`}
                    to="/student-favorite-courses"
                >
                    ❤️ دوره‌های محبوب
                </Link>
                <Link
                    className={`list-group-item list-group-item-action ${isActive("/student-recommended-courses")}`}
                    to="/student-recommended-courses"
                >
                    🌟 دوره‌های پیشنهادی
                </Link>
                <Link
                    className={`list-group-item list-group-item-action ${isActive("/student-show-assignment")}`}
                    to="/student-show-assignment"
                >
                    📄  تمارین من <span className="float-start badge bg-warning">123</span>
                </Link>
                <Link
                    className={`list-group-item list-group-item-action ${isActive("/student-profile-settings")}`}
                    to="/student-profile-settings"
                >
                    ⚙️ تنظیمات
                </Link>
                <Link
                    className={`list-group-item list-group-item-action ${isActive("/student-change-password")}`}
                    to="/student-change-password"
                >
                    🔑 تغییر رمز عبور
                </Link>
                <Link
                    className={`list-group-item list-group-item-action text-danger fw-bold ${isActive("/student-logout")}`}
                    to="/student-logout"
                >
                    🚪 خروج
                </Link>
            </div>
        </div>
    );
}

export default StudentSidebar;
