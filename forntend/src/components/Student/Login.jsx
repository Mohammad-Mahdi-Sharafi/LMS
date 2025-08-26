function Login() {
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-6 offset-3">
                        <div className="card">
                            <h3 className="card-header">ورود کاربر</h3>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">نام کاربری</label>
                                        <input type="text" className="form-control" id="username"
                                               aria-describedby="usernameHelp"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">رمز عبور</label>
                                        <input type="password" className="form-control" id="password"/>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input float-end" id="rememberMe"/>
                                        <label className="form-check-label me-4" htmlFor="rememberMe">
                                            مرا به خاطر داشته باش
                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">ورود</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;

