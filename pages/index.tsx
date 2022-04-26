import type { NextPage } from 'next'
import { Fragment } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Banner from '../components/Home/Banner'
import Contact from '../components/Home/Contact'
import Service from '../components/Home/Service'

const Home: NextPage = () => {
  return (
    <Fragment>
      <Header />
      <Banner />
      <Service />
      <Contact />
      <Footer />
    </Fragment>
  )
}

export default Home
