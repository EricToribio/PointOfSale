import Cookies from "js-cookie"
import router from "next/router"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"

export default () => {
    const history = useHistory()
useEffect(() =>{
    Cookies.remove("user_id")
    router.push('/login')
})
return(
    <div>
        
    </div>
)
    
}