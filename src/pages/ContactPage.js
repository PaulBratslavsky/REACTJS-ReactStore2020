/**************************************************
    CONTACT PAGE
**************************************************/
import React from 'react';
import Hero from '../components/globalComponents/Hero';
import contactImg from '../images/contactBcg.jpeg';
import Contact from '../components/pageComponents/ContactComponents/Contact';

/**************************************************
    CONTACT PAGE COMPONENT
**************************************************/
export default function ContactPage() {
    return (
        <React.Fragment>
            <Hero image={contactImg} />
            <Contact />
        </React.Fragment>
    )
}
