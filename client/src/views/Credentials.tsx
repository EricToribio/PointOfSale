
import {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Login from '../components/logAndReg/Login';
import Register from '../components/logAndReg/Register';
import LandingNav from '../components/navBars/LandingNav';
import { checkLoggedInUser } from '../helper/validation';
export default (props :{page: string,})=>{
    const history = useHistory()
    useEffect(() =>{
        checkLoggedInUser() && 
        history.push('/main')
    })

    return (
        <div >
            {props.page === "Register" &&
                <div>
                    <LandingNav page="register"/>
                    <div className=" p-5">
                        <h1 className="text-center">Sign up</h1>
                    </div>
                    <Register />
                </div>
            }
            {
                props.page === "Login" &&
                <div>
                    <LandingNav page="login"/>
                    <div className=" p-5">
                       
                            <h1 className="text-center">Sign in</h1>
                        
                        <Login />
                    </div>
                </div>
            }
        </div>
    )
}