import { useState } from "react"
import { loggedInUser, MyToken } from "../../utils/userUtil"



export default (props:{user:MyToken}) => {
    
    return (
        <nav className=" d-flex justify-content-between navbar navbar-expand-lg navbar-light bg-light rounded px-4">
            <h2 className="navbar-brand font-weight-bolder">
                <span className="">{props.user.shop.shopName}</span>
            </h2>
            <a className="nav-link text-info" href="/logout">Log out</a>
        </nav>
    )
}