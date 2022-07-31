import Cookies from "js-cookie"
import React, { useEffect, useState } from "react"
import { MyToken , loggedInUser, checkLoggedInUser} from "../helper/validation"
import jwt_decode from 'jwt-decode'
import LandingNav from "../components/navBars/LandingNav"
import Activation from "../components/activation/Activation"
import { useHistory } from "react-router-dom"


export default () => {
    const history = useHistory()
    useEffect(() =>{
        !checkLoggedInUser() && 
        history.push('/')
    })

    return(
        <div>
            <LandingNav page="activate"/>
            <Activation/>
        </div>
    )
}