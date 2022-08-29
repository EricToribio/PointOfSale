import Cookies from "js-cookie"
import router from "next/router"
import { useEffect } from "react"
import useCheckLoggedIn from "../../hooks/useCheckLoggedIn"
import { checkLoggedInUser, loggedInUser } from "../../utils/userUtil"
import { active } from "../../utils/validationUtil"




export default () => {
    useCheckLoggedIn('main')
    useEffect(()=>{
        !active() && router.push('/pos/activate')
    })
    return (
        <div>
            <h1></h1>
            <button onClick={() => router.push('/logout')}>logout</button>
        </div>

    )
}
