import Cookies from "js-cookie"
import { MouseEvent, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { loggedInUser, checkLoggedInUser } from "../helper/validation"

export default () => {

    const history = useHistory()
    
    const logout = function () {
        Cookies.remove("user_id");
        return history.push('/')

    }
    useEffect(() => {
        !checkLoggedInUser()  &&
            history.push('/')
        
        loggedInUser().shop.active === false && 
        history.push('/activate')
        
    })
    return (
        <div>
            <h1></h1>
            <button onClick={ logout}>logout</button>
        </div>

    )
}

