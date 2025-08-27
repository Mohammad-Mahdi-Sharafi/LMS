import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios"

const baseUrl = "http://127.0.0.1:8000/api"

function PopularlTeachers() {
    const [teacher,setTeacher] = useState(null);
    useEffect(() => {
        document.title = "Popular Teachers"
        axios.get(baseUrl + '/teacher', {
            headers : {
                Authorization : "Token 03fb9ac36c3db0a9fb6b03dd9852440c18982ccf"
            }
        }).then((response) => {
            setTeacher(response.data)
        })
    }, [])
    console.log(teacher)
  return (
    <div className="container mt-3">
      <h3 className="pb-1 mb-4 mt-5">مدرسان برتر</h3>
      <div className="row mb-4">
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../../public/vite.svg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">نام مدرس</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span className="float-start">Rating : 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../../public/vite.svg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">نام مدرس</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span className="float-start">Rating : 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../../public/vite.svg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">نام مدرس</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span className="float-start">Rating : 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../../public/vite.svg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">نام مدرس</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span className="float-start">Rating : 4.5/5</span>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../../public/vite.svg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">نام مدرس</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span className="float-start">Rating : 4.5/5</span>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="col-md-3 mb-4">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../../public/vite.svg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">نام مدرس</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span className="float-start">Rating : 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*pagination start*/}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#">
              بعدی
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              قبلی
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PopularlTeachers;
