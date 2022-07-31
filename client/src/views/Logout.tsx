import Cookies from "js-cookie"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"

export default () => {
    const history = useHistory()
useEffect(() =>{
    Cookies.remove("user_id")
    history.push('/login')
})
return(
    <div>
        
    </div>
)
    
}