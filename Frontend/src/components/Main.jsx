import Header from "./Header";
import Home from './Home'
import Footer from "./Footer"
import About from "./About";
import CourseDetail from "./CourseDetail";
import TeacherDetail from "./TeacherDetail";
import Register from "./Student/Register";
import Login from "./Student/Login"
import Dashboard from "./Student/Dashboard";
import MyCourses from "./Student/MyCourses";
import FavoriteCourses from "./Student/FavoriteCourses";
import RecommendedCourses from "./Student/RecommendedCourses";
import ProfileSettings from "./Student/ProfileSettings";
import ChangePassword from "./Student/ChangePassword";
import TeacherLogin from "./Teacher/TeacherLogin";
import TeacherRegister from "./Teacher/TeacherRegister";
import TeacherDashboard from "./Teacher/TeacherDashboard";
import TeacherChangePassword from "./Teacher/TeacherChangePassword";
import TeacherAddCourses from "./Teacher/TeacherAddCourses";
import TeacherMyCourses from "./Teacher/TeacherMyCourses";
import TeacherProfileSettings from "./Teacher/TeacherProfileSettings";
import AllCourses from "./AllCourses";
import PopularlCourses from "./PopularCourses";
import PopularlTeachers from "./PopularTeachers";
import CategoryCourses from "./CategoryCourses";
import {Routes as Switch, Route} from "react-router-dom"



function Main() {
    return (
        <>
            <Header />
            <Switch>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/detail/:course_id" element={<CourseDetail />} />
                <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />
                <Route path="/user-login" element={<Login />} />
                <Route path="/user-register" element={<Register />} />
                <Route path="/user-dashboard" element={<Dashboard />} />
                <Route path="/my-courses" element={<MyCourses />} />
                <Route path="/favorite-courses" element={<FavoriteCourses />} />
                <Route path="/recommended-courses" element={<RecommendedCourses />} />
                <Route path="/profile-settings" element={<ProfileSettings />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/teacher-login" element={<TeacherLogin />} />
                <Route path="/teacher-register" element={<TeacherRegister />} />
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                <Route path="/teacher-change-password" element={<TeacherChangePassword />} />
                <Route path="/teacher-my-courses" element={<TeacherMyCourses />} />
                <Route path="/teacher-add-courses" element={<TeacherAddCourses />} />
                <Route path="/teacher-profile-settings" element={<TeacherProfileSettings />} />
                <Route path="/all-courses" element={<AllCourses />} />
                <Route path="/popular-courses" element={<PopularlCourses />} />
                <Route path="/popular-teachers" element={<PopularlTeachers />} />
                <Route path="/category/:category_slug" element={<CategoryCourses />} />
            </Switch>
            <Footer />
        </>
    );
}

export default Main
