import { useEffect } from "react";
import StudentSidebar from "./StudentSidebar.jsx";

function StudentDashboard() {
    useEffect(() => {
        document.title = "Student Dashboard";
    }, []);

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <aside className="col-md-3 col-lg-2 mb-4">
                    <StudentSidebar />
                </aside>

                {/* Main Dashboard Section */}
                <section className="col-md-9 col-lg-10">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-body p-4 text-center">
                            <h3 className="fw-bold mb-3">🎓 داشبورد دانشجو</h3>
                            <p className="text-muted">
                                به پنل دانشجویی خود خوش آمدید! از منوی سمت راست می‌توانید دوره‌های خود را مشاهده کرده،
                                دوره‌های محبوب و پیشنهادی را بررسی کنید و تنظیمات حساب خود را مدیریت کنید.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default StudentDashboard;
