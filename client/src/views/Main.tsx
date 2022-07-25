import Cookies from "js-cookie"
import { MouseEvent, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import jwt_decode, {JwtPayload} from 'jwt-decode'

export default()=> {
    interface MyToken {
        user_id: string
        firstName: string
        lastName: string
        email: string
        exp: number
    }
    const history = useHistory()
    const [loggedInUser, setLoggedInUser] = useState(Cookies.get("user_id") ? jwt_decode<MyToken>(Cookies.get("user_id")!) : "no User" )
    const logout = function (e: MouseEvent<HTMLButtonElement, MouseEvent>)  {
        e.preventDefault();
        Cookies.remove("user_id"); 
        history.push('/')
    }
    useEffect(() =>{
        loggedInUser == "no User" && 
        history.push('/')
        console.log(loggedInUser)
    })
    return(
           
        <div>
            <h1></h1>
            <button onClick={()=> logout}>logout</button>
            </div>
        
    )
}

