import {Link} from "react-router-dom";
import {useEffect} from "react";

function TeacherDetail() {
    useEffect(() => {
        document.title = "Teacher Detail"
    })
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src="/vite.svg" className="card-img-top" alt="..." />
        </div>
        <div className="col-8">
          <h3>مدرس دوره</h3>
          <p>
            با استفاده از ترکیبی از کلاس‌های grid و utility، می‌توان کارت‌ها را
            به صورت افقی و واکنش‌گرا برای موبایل ساخت. در مثال زیر، ما حاشیه‌های
            grid را با .g-0 حذف می‌کنیم و از کلاس‌های .col-md-* برای افقی کردن
            کارت در نقطه شکست md استفاده می‌کنیم. بسته به محتوای کارت شما، ممکن
            است تنظیمات بیشتری لازم باشد.
          </p>
          <p className="fw-bold">
            <b>
               مهارت ها : <Link to="/category/php">PHP</Link>, <Link to="/category/python">Python</Link>
            </b>
          </p>
          <p className="fw-bold">
            <b>
              جدید ترین دوره :  <Link to="#">Javascript</Link>
            </b>
          </p>
          <p className="fw-bold">
            <b>امتیاز دوره : 4.5</b>
          </p>
        </div>
      </div>

      {/* course list */}
      <div className="card mt-4">
        <h5 className="card-header">لیست دوره ها</h5>
          <div className="list-group list-group-flush">
              <Link to="/detail/1" className="list-group-item list-group-item-action">Python Course</Link>
              <Link to="/detail/1" className="list-group-item list-group-item-action">Linux Course</Link>
              <Link to="/detail/1" className="list-group-item list-group-item-action">AI Course</Link>
              <Link to="/detail/1" className="list-group-item list-group-item-action">AI Course</Link>

          </div>
      </div>
    </div>
  )
}

export default TeacherDetail