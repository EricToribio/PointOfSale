
import Router from "next/router"
import { SetStateAction, useEffect, useState } from "react"

import { useHistory } from "react-router-dom"
import Activation from "../components/activation/activation"
import ContactAdmin from "../components/activation/contactAdmin"
import ActivateNav from "../components/navBars/activateNav"
import { checkLoggedInUser, loggedInUser } from "../utils/validation"


export default () => {
    const [user, setUser] = useState(loggedInUser())
    
    const history = useHistory()
    useEffect(() =>{
        !checkLoggedInUser() && 
        Router.push('/')
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