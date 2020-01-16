/**************************************************
    HOME PAGE IMPORTS
**************************************************/
import React from 'react';
import Hero from '../components/globalComponents/Hero';
import { Link } from 'react-router-dom';
import Featured from '../components/pageComponents/HomeComponent/Featured';
import Services from '../components/pageComponents/HomeComponent/Services';

/**************************************************
    HOME PAGE COMPONENT
**************************************************/
export default function HomePage() {

    /**********************************************
        RETURN
    **********************************************/
    return (
        <React.Fragment>
            <Hero title="Awesome Gadgets" max="true">
                <Link style={{margin: '1rem'}} className="main-link" to="/products">Check Out The Store</Link>
            </Hero>
            <Services />
            <Featured />
        </React.Fragment>
    )
}
