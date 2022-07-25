import Cookies from "js-cookie"
import { MouseEvent, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import jwt_decode from 'jwt-decode'
import { MyToken, loggedInUser } from "../helper/validation"

export default () => {

    const history = useHistory()
    const [checkLoggedInUser] = useState(Cookies.get("user_id") ? jwt_decode<MyToken>(Cookies.get("user_id")!) : "no User")
    const loggedIn = loggedInUser()
    const logout = function (e: MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        Cookies.remove("user_id");
        history.push('/')
    }
    useEffect(() => {
        checkLoggedInUser == "no User" &&
            history.push('/')
        console.log(loggedIn)
        loggedIn.active === false && 
        history.push('/activate')
        
    })
    return (
        <div>
            <h1></h1>
            <button onClick={() => logout}>logout</button>
        </div>

    )
}

