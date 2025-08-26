import Header from "./Header";
import Home from './Home'
import Footer from "./Footer"
import About from "./About";
import CourseDetail from "./CourseDetail";
import Register from "./User/Register";
import Login from "./User/Login"
import Dashboard from "./User/Dashboard";
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
            </Switch>
            <Footer />
        </>
    );
}

export default Main
