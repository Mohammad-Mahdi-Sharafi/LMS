import {useEffect} from "react";

function StudentLogout() {
    useEffect(() => {
        localStorage.removeItem("studentLoginStatus");
        localStorage.removeItem("studentId");
        window.location.href = "/student-login";
    }, []);

    return <></>;
}

export default StudentLogout;
