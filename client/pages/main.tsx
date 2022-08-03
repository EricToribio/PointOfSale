import Cookies from "js-cookie"
import router from "next/router"
import { useEffect } from "react"

import { checkLoggedInUser, loggedInUser } from "../utils/validation"


export default () => {

   
    
    const logout = function () {
        Cookies.remove("user_id");
        return router.push('/')

    }
    useEffect(() => {
        !checkLoggedInUser()  &&
            router.push('/')
        
        loggedInUser().shop.active === false && 
        router.push('/activate')
        
    })
    return (
        <div>
            <h1></h1>
            <button onClick={ logout}>logout</button>
        </div>

    )
}
