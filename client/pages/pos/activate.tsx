
import router from "next/router"
import { useEffect, useState } from "react"
import Activation from "../../components/activation/activation"
import ContactAdmin from "../../components/activation/contactAdmin"
import dynamic from "next/dynamic"
import { checkLoggedInUser, GetUser, loggedInUser } from "../../utils/userUtil"
import NonSSRWrapper from "../../utils/no-ssr-wrapper"
import ActivateNav from "../../components/navBars/activateNav"
import useCheckLoggedIn from "../../hooks/useCheckLoggedIn"


export default () => {
   
    useCheckLoggedIn('activate')
    const [user,setUser] = useState(GetUser())
    useEffect(() => {
        const load = () => {
            const user =  GetUser()
            return user

        }
        setUser(load())
    },[])
    return(
        <NonSSRWrapper>

        <div>
          <ActivateNav user={user}/>
           {!user.shop.active && user.owner ?
            <Activation/>
            :
            <ContactAdmin/>
        }
            
        </div>
        </NonSSRWrapper>
    )
}