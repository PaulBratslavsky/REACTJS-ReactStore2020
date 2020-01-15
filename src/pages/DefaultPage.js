/**************************************************
    DEFAULT PAGE IMPORTS
**************************************************/
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/globalComponents/Hero';
import defaultBcg from '../images/defaultBcg.jpeg';


/**************************************************
    DEFAULT PAGE COMPONENT
**************************************************/
export default function DefaultPage() {
    return (
        <React.Fragment>
            <Hero title="404" image={defaultBcg} max="true">
                <h2 className="text-uppercase">PAGE NOT FOUND</h2>
                <Link style={{margin: '1rem'}} className="main-link" to="/">Back Home</Link>
            </Hero>
        </React.Fragment>
    )
}
