import {useEffect} from "react";

function Contact() {
    useEffect(() => {
        document.title = "Contact Us";
    })
    return (
        <div className="container mt-5 mb-5">
            {/* Page Title */}
            <div className="text-center mb-5">
                <h1 className="fw-bold text-dark">تماس با من</h1>
                <p className="text-muted fs-5">
                    خوشحال می‌شم اگر نظری، پیشنهادی یا ایده‌ای داری با من در ارتباط باشی ✨
                </p>
            </div>

            <div className="row">
                {/* Contact Info */}
                <div className="col-md-5 mb-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
                        <h4 className="fw-bold text-primary mb-3">راه‌های ارتباطی</h4>
                        <p className="mb-2">
                            <i className="bi bi-envelope-fill text-danger me-2"></i>
                            <a
                                href="mailto:mohammad.mahdi.sharafi@Znu.ac.ir"
                                className="text-decoration-none text-dark"
                            >
                                mohammad.mahdi.sharafi@Znu.ac.ir
                            </a>
                        </p>
                        <p className="mb-2">
                            <i className="bi bi-github text-dark me-2"></i>
                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-decoration-none text-dark"
                            >
                                GitHub
                            </a>
                        </p>
                        <p className="mb-2">
                            <i className="bi bi-linkedin text-primary me-2"></i>
                            <a
                                href="https://linkedin.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-decoration-none text-dark"
                            >
                                LinkedIn
                            </a>
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="col-md-7 mb-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body p-4">
                            <h4 className="fw-bold text-success mb-3">ارسال پیام</h4>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    alert("پیامت ارسال شد (فعلاً فقط نمایشی) ✅");
                                }}
                            >
                                <div className="mb-3">
                                    <label className="form-label">نام</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        placeholder="نام خود را وارد کنید"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">ایمیل</label>
                                    <input
                                        type="email"
                                        className="form-control rounded-3"
                                        placeholder="ایمیل شما"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">پیام</label>
                                    <textarea
                                        className="form-control rounded-3"
                                        rows="5"
                                        placeholder="متن پیام..."
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg w-100 rounded-pill"
                                >
                                    ارسال پیام
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
