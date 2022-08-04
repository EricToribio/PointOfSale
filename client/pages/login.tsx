import router from "next/router";
import { useEffect } from "react";
import Login from "../components/logAndReg/login";
import LandingNav from "../components/navBars/landingNav";
import { checkLoggedInUser } from "../utils/userUtil";

export default function login(){
    useEffect(() =>{
        checkLoggedInUser() && 
        router.push('/main')
    })
    return(
        <div className="">
            <LandingNav page="login"/>
        <div className=" p-5">
        <h1 className="text-center">Sign in</h1>
    </div>
    <Login/>
</div>
    )
}