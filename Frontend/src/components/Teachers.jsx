import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function PopularTeachers() {
    const [teachers, setTeachers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        document.title = "Teachers";
        fetchTeachers(currentPage);
    }, [currentPage]);

    const fetchTeachers = async (page) => {
        try {
            const response = await axios.get(`${baseUrl}/teacher`, {
                headers: {
                    Authorization: "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf",
                },
            });

            // If your backend returns Django REST Framework pagination:
            // { count, next, previous, results: [...] }
            setTeachers(response.data.results || response.data);
            if (response.data.count) {
                setTotalPages(Math.ceil(response.data.count / 10)); // 10 = page_size in backend
            }
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mt-3">
            <h3 className="pb-1 mb-4 mt-5">مدرسان</h3>
            <div className="row mb-4">
                {teachers.length > 0 ? (
                    teachers.map((teacher) => (
                        <div className="col-md-3 mb-4" key={teacher.id}>
                            <div className="card h-100 shadow-sm border-0 rounded-3">
                                <Link to={`/teacher-detail/${teacher.id}`}>
                                    <img
                                        src={teacher.profile_image || "/vite.svg"}
                                        className="card-img-top rounded-top-3"
                                        style={{ height: "200px", objectFit: "cover" }}
                                        alt={teacher.full_name || "Teacher"}
                                    />
                                </Link>
                                <div className="card-body text-center">
                                    <h5 className="card-title">
                                        <Link
                                            to={`/teacher-detail/${teacher.id}`}
                                            className="text-decoration-none text-dark"
                                        >
                                            {teacher.full_name}
                                        </Link>
                                    </h5>
                                    {teacher.qualification && (
                                        <p className="text-muted small mb-0">
                                            {teacher.qualification}
                                        </p>
                                    )}
                                </div>
                                <div className="card-footer text-center">
                                    <span className="text-warning">
                                        ⭐ {teacher.rating || "4.5"} / 5
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted text-center">هیچ مدرس فعالی یافت نشد.</p>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li
                            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                قبلی
                            </button>
                        </li>

                        {[...Array(totalPages)].map((_, index) => {
                            const page = index + 1;
                            return (
                                <li
                                    key={page}
                                    className={`page-item ${page === currentPage ? "active" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                </li>
                            );
                        })}

                        <li
                            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                بعدی
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}

export default PopularTeachers;
