/**************************************************
    FOOTER IMPORTS
**************************************************/
import React from 'react';
import styled from 'styled-components';
import { ProductContext } from '../../context'

/**************************************************
    FOOTER COMPONENT
**************************************************/
export default function Footer() {

    const context = React.useContext(ProductContext);

    /**********************************************
        FUNCTIONS
    **********************************************/
    const renderSocialLinks = (links ) => links.map( link => (
        <li key={link.id} >
            <a href={link.url}> 
            {link.icon}
            </a>
        </li>
    ));

    return (
        <FooterWrapper>
            <div className="container py-3">
                <div className="row">
                    <div className="col-md-6">
                        <p className="text-capitalize">
                            copyright &copy; 
                            { new Date().getFullYear() }
                            <span className="text-devider">|</span> 
                            Paul Bratslavsky
                        </p>   
                    </div>
                    <div className="col-md-6">
                        <ul>
                            {renderSocialLinks(context.socialLinks)}
                        </ul>        
                    </div>
                </div>
            </div>
        </FooterWrapper>
    )
}

/**************************************************
    FOOTER JS STYLES
**************************************************/

const FooterWrapper = styled.footer`
    background: var(--darkGrey);
    color: var(--mainWhite);

    p {
        font-size: 1.2rem;

        .text-devider {
            color: var(--primaryColor);
            font-weight: bold;
        }
    }

    
    text-align: center;

    ul {
        display: flex;
        justify-content: center;
        align-items: center;

        li {
            margin: 0 0.5rem;
            list-style: none;
            cursor: pointer;

            .social-icon {
                font-size: 1.6rem;
                color: var(--mainWhite);
                transition: var(--mainTransition);
            }

            .social-icon:hover {
                font-size: 2rem;
                color: var(--primaryColor);
            }
        }
    }

`;