import Cookies from "js-cookie"
import router from "next/router"
import { useEffect } from "react"


export default () => {
useEffect(() =>{
    Cookies.remove("user_id")
    router.push('/login')
})
return(
    <div>
        
    </div>
)
    
}