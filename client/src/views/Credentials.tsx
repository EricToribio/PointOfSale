import React ,{useState} from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

export default ({page}:any)=>{
    
   

    return (
        <div className="container ">
            {page === "Register" &&
                <div>
                    <div className=" p-5">
                        <h1 className="text-center">Sign up</h1>
                    </div>
                    <Register/>
                </div>
            }
            {
                page === "Login" &&
                <div>
                    <div className=" p-5">
                        <h1 className="text-center">Sign in</h1>
                    </div>
                    <Login/>
                </div>
            }
        </div>
    )
}