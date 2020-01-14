/**************************************************
    HOME PAGE IMPORTS
**************************************************/
import React from 'react';
import Hero from '../components/globalComponents/Hero';
import { Link } from 'react-router-dom';

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
            <h1>Home Page</h1>
        </React.Fragment>
    )
}


/**************************************************
    HOME PAGE JS STYLES
**************************************************/