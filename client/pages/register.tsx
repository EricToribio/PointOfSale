

import LandingNav from "../components/navBars/landingNav"
import Register from "../components/logAndReg/register"
import { useEffect } from "react"
import { checkLoggedInUser } from "../utils/userUtil"
import router from "next/router"

export default function register(){
    useEffect(() =>{
        checkLoggedInUser() && 
        router.push('/main')
    })
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