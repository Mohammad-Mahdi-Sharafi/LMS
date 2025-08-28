import {Link} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar.jsx";

function TeacherChangePassword() {
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <aside className="col-md-3">
                        <TeacherSidebar/>
                    </aside>
                    <section className="col-md-9">
                        <div className="card">
                            <h5 className="card-header">تغییر رمز عبور</h5>
                            <div className="card-body">
                                <form>
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

export default TeacherChangePassword;