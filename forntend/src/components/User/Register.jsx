function Register(){
   return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-6 offset-3">
                        <div className="card">
                            <h3 className="card-header">ثبت نام کاربر</h3>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="fullname" className="form-label">نام و نام خانوادگی</label>
                                        <input type="text" className="form-control" id="fullname"
                                               aria-describedby="usernameHelp"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">ایمیل</label>
                                        <input type="email" className="form-control" id="email"
                                               aria-describedby="usernameHelp"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">نام کاربری</label>
                                        <input type="text" className="form-control" id="username"
                                               aria-describedby="usernameHelp"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">رمز عبور</label>
                                        <input type="password" className="form-control" id="password"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="intersts" className="form-label">علاقه مندی ها</label>
                                        <textarea className="form-control"></textarea>
                                        <div id="emailHelp" className="form-text">sth</div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">ثبت نام</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register
