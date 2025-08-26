import {Link} from "react-router-dom"


function Dashboard () {
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <aside className="col-md-3">
                        <div className="card">
                            <h5 className="card-header">داشبورد</h5>
                            <div className="list-group">
                                <Link className="list-group-item list-group-item-action" to="#">لیست ۱</Link>
                                <Link className="list-group-item list-group-item-action" to="#">لیست ۱</Link>
                                <Link className="list-group-item list-group-item-action" to="#">لیست ۱</Link>
                                <Link className="list-group-item list-group-item-action" to="#">لیست ۱</Link>
                                <Link className="list-group-item list-group-item-action" to="#">لیست ۱</Link>
                                <Link className="list-group-item list-group-item-action" to="#">لیست ۱</Link>
                            </div>
                        </div>
                    </aside>
                    <section className="col-md-9"></section>
                </div>
            </div>
        </>
    )
}

export default Dashboard