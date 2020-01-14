/**************************************************
    SIDECART IMPORTS 
**************************************************/
import React from 'react'
import styled from 'styled-components';
import { ProductContext } from '../../context';

/**************************************************
    SIDECART COMPONENT
**************************************************/
export default function SideCart() {

    const context = React.useContext(ProductContext);

    /**********************************************
        RETURN
    **********************************************/
    return (
        <SidecartWrapper cartOpen={context.cartOpen} onClick={context.handleCartClose}>
            <h2>SideCart</h2>
            <p>Card Items</p>
        </SidecartWrapper>
    )
}

/**************************************************
    SIDEBAR JS STYLES
**************************************************/

const SidecartWrapper = styled.nav`
    
    position: fixed;
    text-align: center;
    top: 64px;
    right: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: var(--mainGrey);
    border-left: none;
    transition: var(--mainTransition);
    transform: ${ ({cartOpen}) => cartOpen ? 'translateX(0)' : 'translateX(+100%)'};


    @media (min-width: 576px) {
        width: 20rem;
        border-left: 4px solid var(--primaryColor);
        text-align: left;

    }
    

`;
