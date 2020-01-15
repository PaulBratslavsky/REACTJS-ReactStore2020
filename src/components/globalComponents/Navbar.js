/**************************************************
    NAVIGATION IMPORTS
**************************************************/
import React from 'react';
import { ProductContext } from '../../context/context';

/**************************************************
    IMPORTS STYLES
**************************************************/
import { FaBars, FaCartPlus } from 'react-icons/fa';
import styled from 'styled-components';
import logo from '../../images/logo.svg'

/**************************************************
    REACT COMPONENT
**************************************************/
export default function Navbar() {

    const context = React.useContext(ProductContext);

    /**********************************************
        REACT RETURN
    **********************************************/
    return (
        <React.Fragment>
        
            <NavWrapper>
                <div className="nav-center">
                    <FaBars className="nav-icon" onClick={context.handleSidebar} /> 
                    <img src={logo} alt="React Store Logo" />
                    <div className="nav-cart">
                        <FaCartPlus className="nav-icon" onClick={context.handleCart} />
                        <div className="cart-items">{context.cartItemsCount}</div>
                    </div>
                </div>                
            </NavWrapper>
        
        </React.Fragment>
    )
}

/**************************************************
    NAV JS STYLES
**************************************************/
const NavWrapper = styled.nav`
    z-index: 5;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    width: 100%;
    padding: 1rem 1.5rem;
    background: var(--mainGrey);
    border-bottom: 3px solid var(--primaryColor);

    .nav-center {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1170px;
        margin: 0 auto;
    }

    .nav-icon {
        font-size: 1.8rem;
        cursor: pointer;
    }

    .nav-cart {
        position: relative;

        .cart-items {
            background: var(--primaryColor);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 25px;
            width: 25px;
            color: var(--mainWhite);
            font-size: 0.85rem;
            position: absolute;
            top: -10px;
            right: -14px;
            padding: 0 5px;
            border-radius: 50%;
        }
    }

`;
