import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useState } from "react";
export interface Shop {
    shopName : string
    active : boolean
    
}

export interface MyUser {
    id: number
    firstName: string
    lastName: string
    admin: boolean
    owner: boolean
    shop: Shop
    
  }

  export const GetUser =  () : MyUser=>{
    const userCookie : string = Cookies.get("userToken")
      const userToken : MyUser=  jwt_decode(userCookie)
    const user : MyUser = {
      id : userToken.id,
      firstName : userToken.firstName,
      lastName : userToken.lastName,
      admin: userToken.admin,
      owner : userToken.owner,
      shop : userToken.shop
    }
    console.log(user)
    return user
  }
  export const active = function () : boolean {
    const valid = GetUser()
    return valid.shop.active 
    
}
  

