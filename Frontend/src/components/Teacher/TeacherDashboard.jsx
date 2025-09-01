import TeacherSidebar from "./TeacherSidebar.jsx";
import {useEffect} from "react";

function TeacherDashboard() {
    useEffect(() => {
        document.title = "Teacher Dashboard";
    }, []);

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <aside className="col-md-3 col-lg-2 mb-4">
                    <TeacherSidebar/>
                </aside>

                {/* Main Dashboard Section */}
                <section className="col-md-9 col-lg-10">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-body p-4 text-center">
                            <h3 className="fw-bold mb-3">🎓 داشبورد مدرس</h3>
                            <p className="text-muted">
                                به پنل خود خوش آمدید! از منوی سمت راست می‌توانید دوره‌ها، دانشجویان، و تنظیمات را مدیریت
                                کنید.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherDashboard;

