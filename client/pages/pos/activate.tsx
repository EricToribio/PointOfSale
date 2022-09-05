
import router from "next/router"
import { useEffect, useState } from "react"
import Activation from "../../components/activation/activation"
import ContactAdmin from "../../components/activation/contactAdmin"
import dynamic from "next/dynamic"
import {MyUser, GetUser, active } from "../../utils/userUtil"
import NonSSRWrapper from "../../utils/no-ssr-wrapper"
import ActivateNav from "../../components/navBars/activateNav"
import useCheckLoggedIn from "../../hooks/useCheckLoggedIn"


export default () => {
   
    const loggedIn = useCheckLoggedIn('activate')
    const [loaded, setLoaded] = useState<boolean>(false)
    const [user,setUser] = useState<MyUser>()
    useEffect(() => {
        active() ?
            router.push("/pos/main")
            :
            (setUser(GetUser()),
            setLoaded(true))
        
    },[])
    return(
        <NonSSRWrapper>
{loaded &&
        <div>
          <ActivateNav user={user}/>
           {!user.shop.active && user.owner ?
            <Activation/>
            :
            <ContactAdmin/>
        }
            
        </div>
}
        </NonSSRWrapper>
    )
}