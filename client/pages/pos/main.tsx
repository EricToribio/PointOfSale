import Cookies from "js-cookie"
import router from "next/router"
import { useEffect, useState } from "react"
import useCheckLoggedIn from "../../hooks/useCheckLoggedIn"
import {  active, GetUser, MyUser } from "../../utils/userUtil"





export default () => {
    useCheckLoggedIn('main')
    const [loaded, setLoaded] = useState<boolean>(false)
    const [user,setUser] = useState<MyUser>()
    useEffect(() => {
        active() ?(
        setUser(GetUser()),
        setLoaded(true))
        :
        router.push("/pos/activate")
        
    },[])
    return (
        <div>
            <h1></h1>
            <button onClick={() => router.push('/logout')}>logout</button>
        </div>

    )
}
