import Cookies from "js-cookie"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"


export default()=> {
    const history = useHistory()

    useEffect(() =>{
        !Cookies.get("user_id") && 
        history.push('/')
    })
    return(
        <div>

        </div>
    )
}