
import router from "next/router"
import { useEffect, useState } from "react"
import Activation from "../../components/activation/activation"
import ContactAdmin from "../../components/activation/contactAdmin"
import dynamic from "next/dynamic"
import { checkLoggedInUser, loggedInUser } from "../../utils/userUtil"
import NonSSRWrapper from "../../utils/no-ssr-wrapper"
import ActivateNav from "../../components/navBars/activateNav"


export default () => {
    const [user] = useState(loggedInUser())
   
    useEffect(() =>{
        !checkLoggedInUser() && 
        router.push('/login')
    })

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