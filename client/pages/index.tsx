import type { NextPage } from 'next'

import LandingNav from '../components/navBars/landingNav'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
    <LandingNav page="landing"/>
</div>
  )
}

export default Home
