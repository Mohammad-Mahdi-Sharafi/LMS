import Header from "./Header";
import Home from './Home'
import Footer from "./Footer"
import About from "./About";
import CourseDetail from "./CourseDetail";
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
import {Routes as Switch, Route} from "react-router-dom"



function Main() {
    return (
        <>
            <Header />
            <Switch>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/detail/:course_id" element={<CourseDetail />} />
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
            </Switch>
            <Footer />
        </>
    );
}

export default Main
