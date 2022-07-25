import Cookies from "js-cookie"
import React, { useState } from "react"
import { MyToken , loggedInUser} from "../helper/validation"
import jwt_decode from 'jwt-decode'


export default () => {
    const checkLoggedInUser = useState(
        Cookies.get("user_id") ? jwt_decode<MyToken>(Cookies.get("user_id")!) : "no user"
        )
    const loggedIn = loggedInUser()

    return(
        <div>
            <h1>{loggedIn.active.toString().toUpperCase()}</h1>
        </div>
    )
}