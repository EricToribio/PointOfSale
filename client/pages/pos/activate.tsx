
import router from "next/router"
import { useEffect, useState } from "react"
import Activation from "../../components/activation/activation"
import ContactAdmin from "../../components/activation/contactAdmin"
import ActivateNav from "../../components/navBars/activateNav"
import { checkLoggedInUser, loggedInUser } from "../../utils/userUtil"



export default () => {
    const [user] = useState(loggedInUser())
    
    useEffect(() =>{
        !checkLoggedInUser() && 
        router.push('/login')
    })

    return(
        <div>
           <ActivateNav user={user}/>
           {!user.shop.active && user.owner ?
            <Activation/>
            :
            <ContactAdmin/>
           }
            
        </div>
    )
}