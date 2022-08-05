import type { NextPage } from 'next'
import router from 'next/router'
import { useEffect } from 'react'

import LandingNav from '../components/navBars/landingNav'
import { checkLoggedInUser } from '../utils/userUtil'


const Home: NextPage = () => {
  useEffect(() =>{
    checkLoggedInUser() && 
    router.push('/pos/main')
})
  return (
    <div>
    <LandingNav page="landing"/>
</div>
  )
}

export default Home
