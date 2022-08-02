
import { useEffect, useState } from "react"
import { loggedInUser, checkLoggedInUser} from "../helper/validation"
import Activation from "../components/activation/Activation"
import { useHistory } from "react-router-dom"
import ActivateNav from "../components/navBars/ActivateNav"
import ContactAdmin from "../components/activation/ContactAdmin"

export default () => {
    const [user, setUser] = useState(loggedInUser())
    const history = useHistory()
    useEffect(() =>{
        !checkLoggedInUser() && 
        history.push('/')
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