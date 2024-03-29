import type { NextPage } from 'next'
import router from 'next/router'
import { useEffect } from 'react'

import LandingNav from '../components/navBars/landingNav'
import useCheckLoggedIn from '../hooks/useCheckLoggedIn'
import { checkLoggedInUser } from '../utils/userUtil'


const Home: NextPage = () => {
  useCheckLoggedIn('')
  return (
    <div>
    <LandingNav page="landing"/>
</div>
  )
}

export default Home
