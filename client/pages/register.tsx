

import LandingNav from "../components/navBars/landingNav"
import Register from "../components/logAndReg/register"
import useCheckLoggedIn from "../hooks/useCheckLoggedIn"

export default function register(){
    useCheckLoggedIn('register')
    return(
        
        <div className="">
        <LandingNav page="register"/>
    <div className=" p-5">
    <h1 className="text-center">Sign up</h1>
</div>
<Register/>
</div>
    )
}