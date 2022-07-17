import React ,{useState} from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

export default ()=>{
    
    const [register ,setRegister] : any[] = useState(false)

    return (
        <div className="container ">
            {register &&
                <div>
                    <div className=" p-5">
                        <h1 className="text-center">Sign up</h1>
                    </div>
                    <Register setRegister={setRegister}/>
                </div>
            }
            {
                !register &&
                <div>
                    <div className=" p-5">
                        <h1 className="text-center">Sign in</h1>
                    </div>
                    <Login setRegister={setRegister}/>
                </div>
            }
        </div>
    )
}