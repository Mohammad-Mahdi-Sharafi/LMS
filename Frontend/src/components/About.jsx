import { useEffect } from "react";

function About() {
    useEffect(() => {
        document.title = "About Page";
    }, []);

    return (
        <div className="container mt-5">
            {/* Hero Section */}
            <div className="text-center mb-5">
                <h1 className="fw-bold text-dark">درباره من</h1>
                <p className="text-muted mt-3 fs-5">
                    من محمد مهدی شرفی هستم ⚡ یک توسعه‌دهنده پرانرژی که عاشق کدنویسی، یادگیری
                    و ساخت پروژه‌های خفن برای دنیای آموزش آنلاینم 🚀
                </p>
            </div>

            {/* Mission & Vision */}
            <div className="row mb-5">
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm border-0 h-100 rounded-4">
                        <div className="card-body text-center p-4">
                            <h4 className="fw-bold text-primary mb-3">ماموریت من</h4>
                            <p className="text-muted">
                                یادگیری رو برای همه آسون و جذاب کنم و ابزارهایی بسازم که باعث رشد
                                آدم‌ها بشه.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm border-0 h-100 rounded-4">
                        <div className="card-body text-center p-4">
                            <h4 className="fw-bold text-success mb-3">چشم انداز من</h4>
                            <p className="text-muted">
                                ساخت یک پلتفرم آموزشی خفن که هر کسی توش بتونه یاد بگیره و مهارت‌هاش
                                رو ارتقا بده.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="text-center mb-4">
                <h3 className="fw-bold mb-3">تیم (یعنی من 😅)</h3>
                <p className="text-muted">یه نفر اما پر انرژی، از طراحی تا توسعه و حتی پشتیبانی!</p>
            </div>
            <div className="row justify-content-center mb-5">
                <div className="col-md-4 col-sm-6 mb-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <img
                            src="https://i.pinimg.com/736x/1f/5d/ec/1f5dec2772605ebdb412fff7827fb764.jpg"
                            className="card-img-top rounded-top-4"
                            alt="محمد مهدی شرفی"
                            style={{ objectFit: "cover", height: "300px" }} // بزرگ‌تر شد
                        />
                        <div className="card-body text-center">
                            <h6 className="fw-bold">محمد مهدی شرفی</h6>
                            <p className="text-muted small mb-0">موسس، برنامه‌نویس، همه‌کاره</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-light rounded-4 shadow-sm text-center p-5">
                <h4 className="fw-bold mb-3">همکاری یا ایده‌ای داری؟</h4>
                <p className="text-muted mb-4">
                    خوشحال می‌شم باهات گپ بزنم و ایده‌های جدید رو به واقعیت تبدیل کنیم ✨
                </p>
                <a href="/contact" className="btn btn-primary btn-lg rounded-pill">
                    تماس با من
                </a>
            </div>
        </div>
    );
}

export default About;
