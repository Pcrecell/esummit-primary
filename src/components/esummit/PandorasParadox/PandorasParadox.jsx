import React from 'react'
import HeroSection from './hero/HeroSection'
import AboutPage from './about/AboutPage'
import Timeline from './timeline/Timeline'
import WhyUsScreen from './whyregister/WhyUs'
import Guidelines from './guidelines/Guidelines'
import ContactUs from './contactus/ContactUs'

const PandorasParadox = () => {
  return (
    <div>
      <HeroSection />
      <AboutPage />
      <Timeline />
      <WhyUsScreen />
      <Guidelines />
      <ContactUs />
    </div>
  )
}

export default PandorasParadox
