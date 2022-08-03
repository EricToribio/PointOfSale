import axios from "axios"
import { useEffect } from "react"
import LandingNav from "../components/navBars/landingNav"
import Register from "../components/logAndReg/register"

export default function register(){
    useEffect(()=>{
        axios.get('http://localhost:8080/api/test')
        .then(res => {
            console.log(res.data)
        })
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