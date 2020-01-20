/**************************************************
    CART PAGE
**************************************************/
import React from 'react';
import Hero from '../components/globalComponents/Hero';
import Cart from '../components/pageComponents/CartPageComponents';
import storeBcg from '../images/storeBcg.jpeg';

/**************************************************
    CART PAGE COMPONENT
**************************************************/
export default function CartPage() {

    return (
        <React.Fragment>
            <Hero image={storeBcg}/>
            <Cart />
        </React.Fragment>
    )
}
