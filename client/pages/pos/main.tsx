import Cookies from "js-cookie"
import router from "next/router"
import { useEffect } from "react"
import { checkLoggedInUser, loggedInUser } from "../../utils/userUtil"




export default () => {
  
    useEffect(() => {
        !checkLoggedInUser()  &&
            router.push('/login')
        
        loggedInUser().shop.active === false && 
        router.push('/pos/activate')
        
    })
    return (
        <div>
            <h1></h1>
            <button >logout</button>
        </div>

    )
}
