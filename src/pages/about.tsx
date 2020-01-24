import React from 'react'
import { config, useSpring } from 'react-spring'
import Layout from '../components/layout'
import { AnimatedBox } from '../elements'
import SEO from '../components/SEO'

const About = () => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout>
      <SEO title="About | Silsila" desc="I’m a self-taught UI/UX, graphic designer ✏️ based in London" />
      <AnimatedBox style={pageAnimation} py={[6, 6, 6, 8]} px={[6, 6, 8, 6, 8, 13]}>
        <h1>Hi. I'm Silsila!</h1>
        <p>
        I’m a self-taught UI/UX, graphic designer ✏️ based in London
        </p>
        <p>
        I am a freelance designer with knowledge in UI/UX , branding and graphic designing. I have been professionally working as a designer for almost a year with either startups or personal acquaintances.
        </p>
        <p>
        My initial drive and background was based around Software Development as I’ve studied Computer Science for a year at City University of London. Taking the problem solving experience from the university modules and incorporing my creative side has guided me into pursuing a career in design.
        </p>
      </AnimatedBox>
    </Layout>
  )
}

export default About
