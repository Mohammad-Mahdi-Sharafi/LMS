import {useEffect} from "react";

function FAQ() {
    useEffect(() => {
        document.title = "FAQ"
    })
    return (
        <div className="container mt-5 mb-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold text-dark">سوالات متداول</h1>
                <p className="text-muted fs-5">
                    جواب سوال‌هایی که ممکنه برات پیش بیاد اینجاست 👇
                    (اگر جواب سوالت رو پیدا نکردی از بخش تماس با من بپرس 🌟)
                </p>
            </div>

            <div className="accordion" id="faqAccordion">
                {/* Question 1 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button
                            className="accordion-button fw-bold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            چطور می‌تونم ثبت‌نام کنم؟
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            برای ثبت‌نام فقط کافیه وارد بخش "ثبت‌نام" بشی و فرم رو پر کنی. به راحتی
                            می‌تونی یک حساب کاربری بسازی و از دوره‌ها استفاده کنی.
                        </div>
                    </div>
                </div>

                {/* Question 2 - UPDATED to "everything is free" */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button
                            className="accordion-button collapsed fw-bold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                        >
                            آیا دوره‌ها رایگان هستن؟
                        </button>
                    </h2>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            بله! تمامی دوره‌ها به‌صورت کاملاً رایگان در دسترس هستند — هدف اینه
                            که بچه‌ها کیف کنن، یاد بگیرن و از مسیر آموزش لذت ببرن 🎉
                        </div>
                    </div>
                </div>

                {/* Question 3 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button
                            className="accordion-button collapsed fw-bold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            چطور می‌تونم با مدرس ارتباط بگیرم؟
                        </button>
                    </h2>
                    <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            داخل صفحه هر دوره بخش "اطلاعات مدرس" وجود داره که راه‌های ارتباطی با
                            مدرس رو می‌تونی اونجا پیدا کنی.
                        </div>
                    </div>
                </div>

                {/* Question 4 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button
                            className="accordion-button collapsed fw-bold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFour"
                            aria-expanded="false"
                            aria-controls="collapseFour"
                        >
                            آیا بعد از خرید دوره به‌صورت دائمی دسترسی دارم؟
                        </button>
                    </h2>
                    <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFour"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            چون همه دوره‌ها رایگانه، دسترسی شما به دوره‌ها بدون هزینه خواهد بود و
                            می‌تونید هر وقت خواستید دوباره سر بزنید و از محتوا استفاده کنید.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQ;
