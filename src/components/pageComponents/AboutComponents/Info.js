/**************************************************
    INFO IMPORTS
**************************************************/
import React from 'react';
import Title from '../../globalComponents/Title';
import aboutBcg from '../../../images/aboutBcg.jpeg';

/**************************************************
    INFO COMPONENT
**************************************************/
export default function Info() {
    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto col-md-6 my-3">
                        <img className="img-fluid img-thumbnail" src={aboutBcg} alt="info about us"/>
                    </div>
                    <div className="col-10 mx-auto col-md-6 my-3">
                        <Title title="About Us" />
                        <p className="text-lead text-muted my-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, libero repudiandae necessitatibus veritatis iure impedit mollitia illum dolorem nobis ullam.</p>
                        <p className="text-lead text-muted my-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, libero repudiandae necessitatibus veritatis iure impedit mollitia illum dolorem nobis ullam.</p>
                        <button style={{marginTop: '0.5rem'}} className="main-link">Hear our story</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
