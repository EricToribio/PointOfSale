import Cookies from 'js-cookie';
import React ,{useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Login from '../components/logAndReg/Login';
import Register from '../components/logAndReg/Register';
export default (props :{page: any,})=>{
    const history = useHistory()
    useEffect(() =>{
        Cookies.get("user_id") && 
        history.push('/main')
    })

    return (
        <div className="container ">
            {props.page === "Register" &&
                <div>
                    <div className=" p-5">
                        <h1 className="text-center">Sign up</h1>
                    </div>
                    <Register />
                </div>
            }
            {
                props.page === "Login" &&
                <div>
                    <div className=" p-5">
                        <h1 className="text-center">Sign in</h1>
                    </div>
                    <Login />
                </div>
            }
        </div>
    )
}