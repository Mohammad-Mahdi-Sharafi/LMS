import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import About from "./About";
import CourseDetail from "./CourseDetail";
import TeacherDetail from "./TeacherDetail";
import StudentRegister from "./Student/StudentRegister.jsx";
import StudentLogin from "./Student/StudentLogin.jsx";
import StudentLogout from "./Student/StudentLogout";
import StudentDashboard from "./Student/StudentDashboard.jsx";
import StudentMyCourses from "./Student/StudentMyCourses.jsx";
import FavoriteCourses from "./Student/FavoriteCourses";
import StudentRecommendedCourses from "./Student/StudentRecommendedCourses.jsx";
import ProfileSettings from "./Student/ProfileSettings";
import ChangePassword from "./Student/ChangePassword";
import TeacherLogin from "./Teacher/TeacherLogin";
import TeacherRegister from "./Teacher/TeacherRegister";
import TeacherDashboard from "./Teacher/TeacherDashboard";
import TeacherChangePassword from "./Teacher/TeacherChangePassword";
import TeacherAddCourses from "./Teacher/TeacherAddCourses";
import TeacherEditCourses from "./Teacher/TeacherEditCourse";
import TeacherMyCourses from "./Teacher/TeacherMyCourses";
import TeacherEnrolledStudents from "./Teacher/TeacherEnrolledStudents";
import TeacherSkillCourses from "./TeacherSkillCourses";
import TeacherAddChapters from "./Teacher/TeacherAddChapter";
import TeacherAllChapters from "./Teacher/TeacherAllChapters";
import TeacherEditChapter from "./Teacher/TeacherEditChapter";
import TeacherStudentList from "./Teacher/TeacherStudentList.jsx";
import TeacherProfileSettings from "./Teacher/TeacherProfileSettings";
import TeacherLogout from "./Teacher/TeacherLogout";
import AllCourses from "./AllCourses";
import PopularlCourses from "./PopularCourses";
import PopularlTeachers from "./PopularTeachers";
import CategoryCourses from "./CategoryCourses";
import {Routes as Switch, Route} from "react-router-dom";

function Main() {
    return (
        <>
            <Header/>
            <Switch>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/detail/:course_id" element={<CourseDetail/>}/>
                <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail/>}/>
                <Route path="/student-login" element={<StudentLogin/>}/>
                <Route path="/student-logout" element={<StudentLogout/>}/>
                <Route path="/student-register" element={<StudentRegister/>}/>
                <Route path="/student-dashboard" element={<StudentDashboard/>}/>
                <Route path="/student-my-courses" element={<StudentMyCourses/>}/>
                <Route path="/student-favorite-courses" element={<FavoriteCourses/>}/>
                <Route path="/student-recommended-courses" element={<StudentRecommendedCourses/>}/>
                <Route path="/student-profile-settings" element={<ProfileSettings/>}/>
                <Route path="/student-change-password" element={<ChangePassword/>}/>
                <Route path="/teacher-login" element={<TeacherLogin/>}/>
                <Route path="/teacher-register" element={<TeacherRegister/>}/>
                <Route path="/teacher-dashboard" element={<TeacherDashboard/>}/>
                <Route path="/teacher-change-password" element={<TeacherChangePassword/>}/>
                <Route path="/teacher-my-courses" element={<TeacherMyCourses/>}/>
                <Route path="/teacher-add-courses" element={<TeacherAddCourses/>}/>
                <Route path="/teacher-enrolled-students/:course_id" element={<TeacherEnrolledStudents/>}/>
                <Route path="/teacher-edit-course/:course_id" element={<TeacherEditCourses/>}/>
                <Route path="/teacher-add-chapters/:course_id" element={<TeacherAddChapters/>}/>
                <Route path="/teacher-all-chapters/:course_id" element={<TeacherAllChapters/>}/>
                <Route path="/teacher-edit-chapter/:chapter_id" element={<TeacherEditChapter/>}/>
                <Route path="/teacher-student-list" element={<TeacherStudentList/>}/>
                <Route path="/teacher-skill-courses/:skill_name/:teacher_id" element={<TeacherSkillCourses/>}/>
                <Route path="/teacher-profile-settings" element={<TeacherProfileSettings/>}/>
                <Route path="/teacher-logout" element={<TeacherLogout/>}/>
                <Route path="/all-courses" element={<AllCourses/>}/>
                <Route path="/popular-courses" element={<PopularlCourses/>}/>
                <Route path="/popular-teachers" element={<PopularlTeachers/>}/>
                <Route path="/category/:category_slug" element={<CategoryCourses/>}/>
            </Switch>
            <Footer/>
        </>
    );
}

export default Main;
