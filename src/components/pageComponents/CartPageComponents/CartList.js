/**************************************************
    CART LIST IMPORTS
**************************************************/
import React from 'react';
import CartItem from './CartItem';
import { ProductContext } from '../../../context';

/**************************************************
    CART LIST COMPONENT
**************************************************/
export default function CartList() {

    const { 
        cartItems, 
        incrementCartItem, 
        decrementCartItem, 
        removeCartItem 
    } = React.useContext(ProductContext);

    /**********************************************
        FUNCTIONS
    **********************************************/
    const showCartItems = (items) => ( items.map( item => 
        <CartItem 
            key={item.id}
            item={item} 
            incrementCartItem={incrementCartItem}
            decrementCartItem={decrementCartItem}
            removeCartItem={removeCartItem}
        /> 
    ));

    /**********************************************
        RETURN JSX
    **********************************************/
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">

                    { 
                        cartItems.length === 0 
                            ?   <h1 className="text-title text-center my-4">
                                    Your Cart Is Currently Empty
                                </h1> 
                            :   showCartItems(cartItems)
                    }

                </div>
            </div>
        </div>
    )
}
