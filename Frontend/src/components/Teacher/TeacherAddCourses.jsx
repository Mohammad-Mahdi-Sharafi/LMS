import TeacherSidebar from "./TeacherSidebar.jsx";

function TeacherAddCourses() {
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <aside className="col-md-3">
            <TeacherSidebar />
          </aside>
          <section className="col-md-9">
            <div className="card">
              <h5 className="card-header">اضافه کردن دوره</h5>
              <div className="card-body">
                <form>
                  <div className="mb-3 row">
                    <label htmlFor="courseTitle" className="col-sm-2 col-form-label">
                      عنوان
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="courseTitle"
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label htmlFor="courseDescription" className="col-sm-2 col-form-label">
                      توضیحات
                    </label>
                    <div className="col-sm-10">
                      <textarea
                        className="form-control"
                        id="courseDescription"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label htmlFor="courseVideo" className="col-sm-2 col-form-label">
                      ویدیو دوره
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="file"
                        className="form-control"
                        id="courseVideo"
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label htmlFor="courseTech" className="col-sm-2 col-form-label">
                      تکنولوژی‌ها
                    </label>
                    <div className="col-sm-10">
                      <textarea
                        className="form-control"
                        id="courseDescription"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>

                  <hr />
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

export default TeacherAddCourses;
