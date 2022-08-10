
import router from "next/router"
import { useEffect, useState } from "react"
import Activation from "../../components/activation/activation"
import ContactAdmin from "../../components/activation/contactAdmin"
import dynamic from "next/dynamic"
import { checkLoggedInUser, loggedInUser } from "../../utils/userUtil"
import NonSSRWrapper from "../../utils/no-ssr-wrapper"


export default () => {
    
   
    const ActiveNav = dynamic(()=> import('../../components/navBars/activateNav'),{ssr:false})
    useEffect(() =>{
        !checkLoggedInUser() && 
        router.push('/login')

        
    })

    return(
        <NonSSRWrapper>

        <div>
            <div>
           <ActiveNav/>

            </div>
           {!loggedInUser().shop.active && loggedInUser().owner ?
            <Activation/>
            :
            <ContactAdmin/>
        }
            
        </div>
        </NonSSRWrapper>
    )
}