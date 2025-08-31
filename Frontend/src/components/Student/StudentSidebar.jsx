import {Link} from "react-router-dom";

function StudentSidebar() {
    return (
        <>
            <div className="card">
                <h5 className="card-header">
                    <Link
                        className="list-group-item list-group-item-action"
                        to="/student-dashboard"
                    >
                        داشبورد
                    </Link>
                </h5>
                <div className="list-group">
                    <Link
                        className="list-group-item list-group-item-action"
                        to="/my-courses"
                    >
                        دوره های من
                    </Link>
                    <Link
                        className="list-group-item list-group-item-action"
                        to="/favorite-courses"
                    >
                        دوره های محبوب
                    </Link>
                    <Link
                        className="list-group-item list-group-item-action"
                        to="/recommended-courses"
                    >
                        دوره های پیشنهادی
                    </Link>
                    <Link
                        className="list-group-item list-group-item-action"
                        to="/profile-settings"
                    >
                        تنظیمات
                    </Link>
                    <Link
                        className="list-group-item list-group-item-action"
                        to="/change-password"
                    >
                        تغییر رمز عبور
                    </Link>
                    <Link
                        className="list-group-item list-group-item-action"
                        to="/user-login"
                    >
                        خروج
                    </Link>
                </div>
            </div>
        </>
    );
}

export default StudentSidebar;
