import { Link } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

function RecommendedCourses() {
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <aside className="col-md-3">
            <Sidebar />
          </aside>
          <section className="col-md-9">
            <div className="card">
              <h5 className="card-header">دوره های پیشنهادی من</h5>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>نام</th>
                      <th>سازنده</th>
                      <th>عمل</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>php دولوپمنت</td>
                      <td>
                        <Link to="/">ممد</Link>
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm active">
                          حذف
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default RecommendedCourses;