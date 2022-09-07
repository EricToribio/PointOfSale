
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
          }  
        })
        console.log("access")
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
            }
          })
          console.log("refresh")
          if (res?.status === 200) {
            if (page === 'login' || page === 'register' || page === '') {
              router.push('/pos/main')
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