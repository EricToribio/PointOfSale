import { useState } from "react"
import { loggedInUser } from "../../helper/validation"

export default () => {
    const [user, setUser] = useState(loggedInUser())
    return (
        <nav className=" d-flex justify-content-between navbar navbar-expand-lg navbar-light bg-light rounded px-4">
            <h2 className="navbar-brand font-weight-bolder">
                <span className="">{user.shopName}</span>
            </h2>
            <a className="nav-link text-info" href="/logout">Log out</a>
        </nav>

    )
}