import jwt_decode from 'jwt-decode';
import Cookies from "js-cookie";
export interface Shop {
    shopName : string
    active : boolean
    
}

export interface MyUser {
    user_id: number 
    firstName: string
    lastName: string
    admin: boolean
    owner: boolean
    shop: Shop
    
  }

  export const GetUser = ()=>{
  const id :string = Cookies.get('id') ? Cookies.get('id') : ""
  const firstName: string= Cookies.get('firstName') ? Cookies.get('firstName') : "";
  const lastName : string= Cookies.get('lastName') ? Cookies.get('lastName') : "";
  const shopName :string = Cookies.get('shopName') ? Cookies.get('shopName') : "";
  const admin : boolean = Cookies.get('admin') == 'true' ? true : false
  const active : boolean = Cookies.get('act') == 'true' ? true : false
const owner :boolean = Cookies.get('owner') == 'true' ? true : false
    const user : MyUser = {
      user_id : parseInt(id),
      firstName : firstName,
      lastName : lastName,
      admin: admin,
      owner : owner,
      shop : {
        shopName: shopName,
        active : active
      }
    }
    return user

  }
  

