import Cookies from 'js-cookie';
import React ,{useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Login from '../components/logAndReg/Login';
import Register from '../components/logAndReg/Register';
import LandingNav from '../components/navBars/LandingNav';
import Landing from './Landing';
export default (props :{page: any,})=>{
    const history = useHistory()
    useEffect(() =>{
        Cookies.get("user_id") && 
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