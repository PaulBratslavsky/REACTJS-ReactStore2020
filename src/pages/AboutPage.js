/**************************************************
    ABOUT PAGE IMPORTS
**************************************************/
import React from 'react';
import aboutBcg from '../images/aboutBcg.jpeg'
import Info from '../components/pageComponents/AboutComponents/Info';
import Hero from '../components/globalComponents/Hero';

/**************************************************
    ABOUT COMPONENT
**************************************************/
export default function AboutPage() {
    return (
        <React.Fragment>
            <Hero image={aboutBcg} />
            <Info />
        </React.Fragment>
    )
}
