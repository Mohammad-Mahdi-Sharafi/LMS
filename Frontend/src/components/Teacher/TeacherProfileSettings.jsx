import {Link} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar.jsx";

function TeacherProfileSettings() {
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <aside className="col-md-3">
                        <TeacherSidebar/>
                    </aside>
                    <section className="col-md-9">
                        <div className="card">
                            <h5 className="card-header">تنظیمات</h5>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3 row">
                                        <label
                                            htmlFor="exampleInputEmail1"
                                            className="col-sm-2 col-form-label"
                                        >
                                            نام و نام خانوادگی
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <label
                                            htmlFor="exampleInputEmail1"
                                            className="col-sm-2 col-form-label"
                                        >
                                            ایمیل
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label
                                            htmlFor="exampleInputEmail1"
                                            className="col-sm-2 col-form-label"
                                        >
                                            عکس پروفایل
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <label
                                            htmlFor="exampleInputPassword1"
                                            className="col-sm-2 col-form-label"
                                        >
                                            رمز عبور
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label
                                            htmlFor="exampleInputEmail1"
                                            className="col-sm-2 col-form-label"
                                        >
                                            علاقه مندی ها
                                        </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                            />
                                        </div>
                                    </div>
                                    <hr/>
                                    <button type="submit" className="btn btn-primary">
                                        اعمال تغییرات
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default TeacherProfileSettings;
