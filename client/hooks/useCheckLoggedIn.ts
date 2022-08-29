
import Cookies from "js-cookie";
import router from "next/router";
import { useEffect } from "react";

import axios from "../axios/axios"




function useCheckLoggedIn(page: string) {
  useEffect(() => {

    console.log(page)


    const check = async () => {
      if (Cookies.get('logout') != "true"){

      
      try {
        const res = await axios.get('acc/auth',{
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        console.log("access",res.data)
          Cookies.set("firstName", res.data.firstName, { path: '/' })
          Cookies.set("lastName", res.data.lastName, { path: '/' })
          Cookies.set("id", res.data.id, { path: '/' })
          Cookies.set("shopName",res.data.shopName, { path: '/' }) 
          Cookies.set('act',res.data.act, { path: '/' })
          Cookies.set("logout", "false", { path: '/' })
          Cookies.set("admin", res.data.admin, { path: '/' })
          Cookies.set("owner", res.data.owner, { path: '/' })
          if (res?.status === 200) {
            if (page === 'login' || page === 'register' || page === '') {
              router.push('/pos/main')
            }
          }
      }
      catch (err) {
        if (err.response?.status === 401) {
        try {
          const res = await axios.get('ref/auth', {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          })
          console.log("refresh",res.data)
          Cookies.set("firstName", res.data.firstName, { path: '/' })
          Cookies.set("lastName", res.data.lastName, { path: '/' })
          Cookies.set("shopName",res.data.shopName, { path: '/' }) 
          Cookies.set("logout", "false", { path: '/' })
          Cookies.set('act',res.data.act, { path: '/' })
          Cookies.set("id", res.data.id, { path: '/' })
          Cookies.set("admin", res.data.admin, { path: '/' })
          Cookies.set("owner", res.data.owner, { path: '/' })

            ;
          if (res?.status === 200) {
            if (page === 'login' || page === 'register' || page === '') {
              router.push('/main')
            }
          }
        } catch (err) {
          if (!err.response) {
            return 'No Server Response'
          } else if (err.response?.status === 401) {
            if (page !== 'login' && page !== 'register' && page !== '') {
              router.push('/login')
            }
          }
        }
      }
    }
  }else{
    if (page !== 'login' && page !== 'register' && page !== '') {
      router.push('/login')
    }
  
  }

  }
    check()
  }, [])
}

export default useCheckLoggedIn