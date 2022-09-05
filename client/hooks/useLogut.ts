
import Cookies from "js-cookie"
import router from "next/router"
import { useEffect } from "react"
import axios from "../axios/axios"


function useLogout() {
    useEffect(() => {

        const logout = async () => {
            try {
                const res = await axios.get('logout',{
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    withCredentials: true
                  })
                  console.log(res.data)
                  if (res.status === 200) {
                    var Cookie_expiry = new Date();
Cookie_expiry.setDate(Cookie_expiry.getDate()+10e5);  
                    Cookies.set('logout','true',{ path: '/',expires : Cookie_expiry})
                    router.push('/login')
                  }
            } catch (err : Error) {
                console.log(err.response)
            }
        }
        logout()
    })
}
export default useLogout