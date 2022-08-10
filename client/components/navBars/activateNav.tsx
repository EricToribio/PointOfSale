import { useState } from "react"
import { loggedInUser, MyToken } from "../../utils/userUtil"



export default () => {
    const [shopName] = useState(loggedInUser().shop.shopName)
    return (
        <nav className=" d-flex justify-content-between navbar navbar-expand-lg navbar-light bg-light rounded px-4">
            <h2 className="navbar-brand font-weight-bolder">
                <span className="">{shopName}</span>
            </h2>
            <a className="nav-link text-info" href="/logout">Log out</a>
        </nav>
    )
}