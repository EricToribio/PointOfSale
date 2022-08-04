import jwt_decode from 'jwt-decode';
import Cookies from "js-cookie";
export interface Shop {
    shopName : string
    active : boolean,
    addresses_id: number
}

export interface MyToken {
    user_id: number
    firstName: string
    lastName: string
    email: string
    active_employee: boolean
    owner: boolean
    shop: Shop 
    exp: number
  }
  export const loggedInUser = function () : MyToken {
    let user : MyToken 
    
    if(checkLoggedInUser()) {
        user =  jwt_decode<MyToken>(Cookies.get("user_id")!) 
        return user
    }
    user = {
        user_id:0,
        firstName : '',
        lastName: '',
        email : '',
        active_employee: false, 
        owner: false,
        shop:{
            shopName : '',
            active: false,
            addresses_id: 0
        },
        exp: 0
    }
    return user
  }

  export const checkLoggedInUser = function () : boolean {
    const isLoggedIn = Cookies.get("user_id") ?
    true : false
    return isLoggedIn
  }


