import { Link, useParams } from "react-router-dom";

function CourseDetail() {
  let { course_id } = useParams();

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src="/vite.svg" className="card-img-top" alt="..." />
        </div>
        <div className="col-8">
          <h3>عنوان دوره</h3>
          <p>
            با استفاده از ترکیبی از کلاس‌های grid و utility، می‌توان کارت‌ها را
            به صورت افقی و واکنش‌گرا برای موبایل ساخت. در مثال زیر، ما حاشیه‌های
            grid را با .g-0 حذف می‌کنیم و از کلاس‌های .col-md-* برای افقی کردن
            کارت در نقطه شکست md استفاده می‌کنیم. بسته به محتوای کارت شما، ممکن
            است تنظیمات بیشتری لازم باشد.
          </p>
          <p className="fw-bold">
            <b>
              مدرس دوره <Link to="#">مدرس 1</Link>
            </b>
          </p>
          <p className="fw-bold">
            <b>
              مدت زمان <Link to="#">6 ساعت و 40 دقییقه</Link>
            </b>
          </p>
          <p className="fw-bold">
            <b>تعداد دانشجویان : 456 دانشجو</b>
          </p>
          <p className="fw-bold">
            <b>امتیاز دوره : 4.5</b>
          </p>
        </div>
      </div>

      {/* course videos */}
      <div className="card mt-4">
        <h5 className="card-header">ویدیو های دوره</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            مقدمه
              <span className="float-start">
                  <span className="ms-2">1 ساعت 30 دقیقه</span>
                <button className="btn btn-sm btn-dark float-start">
                <i className="bi-play"></i>
                </button>
              </span>
          </li>
          <li className="list-group-item">
            مقدمه
              <span className="float-start">
                  <span className="ms-2">1 ساعت 30 دقیقه</span>
                <button className="btn btn-sm btn-dark float-start">
                <i className="bi-play"></i>
                </button>
              </span>
          </li>
          <li className="list-group-item">
            مقدمه
              <span className="float-start">
                  <span className="ms-2">1 ساعت 30 دقیقه</span>
                <button className="btn btn-sm btn-dark float-start">
                <i className="bi-play"></i>
                </button>
              </span>
          </li>
          <li className="list-group-item">
            مقدمه
              <span className="float-start">
                  <span className="ms-2">1 ساعت 30 دقیقه</span>
                <button className="btn btn-sm btn-dark float-start">
                <i className="bi-play"></i>
                </button>
              </span>
          </li>
          <li className="list-group-item">
            مقدمه
              <span className="float-start">
                  <span className="ms-2">1 ساعت 30 دقیقه</span>
                <button className="btn btn-sm btn-dark float-start">
                <i className="bi-play"></i>
                </button>
              </span>
          </li>
          <li className="list-group-item">
            مقدمه
              <span className="float-start">
                  <span className="ms-2">1 ساعت 30 دقیقه</span>
                <button className="btn btn-sm btn-dark float-start">
                <i className="bi-play"></i>
                </button>
              </span>
          </li>
        </ul>
      </div>

      <h3 className="pb-1 mb-4 mt-4">دوره های مرتبط</h3>

      {/* related courses */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <Link to="/detail/1">
              <img src="/vite.svg" className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">عنوان دوره</Link>
              </h5>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <Link to="#">
              <img src="/vite.svg" className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="#">عنوان دوره</Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
