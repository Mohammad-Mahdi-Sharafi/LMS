import {useEffect} from "react";

function TeacherLogout() {
    useEffect(() => {
        localStorage.removeItem("teacherLoginStatus");
        localStorage.removeItem("teacherId")
        window.location.href = "/teacher-login";
    }, []); // run only once on mount

    return <></>;
}

export default TeacherLogout;
