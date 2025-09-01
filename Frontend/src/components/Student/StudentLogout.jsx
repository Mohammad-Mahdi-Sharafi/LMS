import { useEffect } from "react";

function StudentLogout() {
    useEffect(() => {
        localStorage.setItem("studentLoginStatus", "false");
        localStorage.removeItem("studentId");
        window.location.href = "/student-login";
    }, []);
}

export default StudentLogout;

