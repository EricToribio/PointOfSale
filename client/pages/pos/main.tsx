import Cookies from "js-cookie"
import router from "next/router"
import { useEffect, useState } from "react"
import MainNav from "../../components/navBars/mainNav"
import useCheckLoggedIn from "../../hooks/useCheckLoggedIn"
import {  active, GetUser, MyUser } from "../../utils/userUtil"





export default () => {
    useCheckLoggedIn('main')
    const [loaded, setLoaded] = useState<boolean>(false);
    const [user,setUser] = useState<MyUser>();
    const [page, setPage] = useState<String>("main");
    useEffect(() => {
        active() ?(
        setUser(GetUser()),
        setLoaded(true))
        :
        router.push("/pos/activate")
        
    },[])
    return (
        <div>
        {loaded &&
        <div>
                <MainNav user={user} page={page}/>
                
        </div>
                
            }
            </div>

    )
}
