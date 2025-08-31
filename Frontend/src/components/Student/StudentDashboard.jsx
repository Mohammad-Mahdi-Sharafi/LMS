import {Link} from "react-router-dom"
import StudentSidebar from "./StudentSidebar.jsx";
import {useEffect} from "react";


function StudentDashboard() {

    useEffect(() => {
        document.title = "Student Dashboard";
    }, []);

    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <aside className="col-md-3">
                        <StudentSidebar/>
                    </aside>
                    <section className="col-md-9">
                    </section>
                </div>
            </div>
        </>
    )
}

export default StudentDashboard