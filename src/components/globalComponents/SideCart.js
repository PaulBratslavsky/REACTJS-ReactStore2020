/**************************************************
    SIDECART IMPORTS 
**************************************************/
import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../context';
import CartItem from './CartItem';
import { showMoney } from '../../HelperFunctions/showMoney';
/**************************************************
    SIDECART COMPONENT
**************************************************/
export default function SideCart() {

    const {handleCartClose, cartOpen, cartItems, cartTotal} = React.useContext(ProductContext);

    const showCartItems = (cartItems) => ( 
        <ul>
            { cartItems.map( cartItem =>  <CartItem key={cartItem.id} cartItem={cartItem}/> ) }
        </ul> 
    );
    /**********************************************
        RETURN
    **********************************************/
    return (
        <SidecartWrapper cartOpen={cartOpen} onClick={handleCartClose}>
            { showCartItems(cartItems) }
            <h4 className="text-capitalize text-main text-right">Cart Total: {showMoney.format(cartTotal)}</h4>
            <div className="text-center my-5">
                <Link to="/cart" className="main-link">Cart Page</Link>
            </div>
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
    overflow: scroll;
    padding: 1rem;

    ul {
        list-style: none;
        padding: 0;
    
        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .item-count {
        margin: 0;
    }

    .item-info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h6 {
            margin: 0 0 0 1rem;
        }
    }

    

    @media (min-width: 576px) {
        width: 20rem;
        border-left: 4px solid var(--primaryColor);
        text-align: left;

    }
    

`;
