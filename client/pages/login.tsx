import Login from "../components/logAndReg/login";
import LandingNav from "../components/navBars/landingNav";

export default function login(){
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