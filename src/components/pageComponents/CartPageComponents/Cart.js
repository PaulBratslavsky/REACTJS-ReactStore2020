import React from 'react';
import Title from '../../globalComponents/Title';
import CartColumns from './CartColumns';
import CartList from './CartList';
import CartTotals from './CartTotals';


export default function Cart() {
    return (
        <section className="my-5">
            <div className="container">
                <Title title="Your Cart Items" center="true" />
                <CartColumns />
                <CartList />
                <CartTotals />
            </div>
            
        </section>
    )
}
