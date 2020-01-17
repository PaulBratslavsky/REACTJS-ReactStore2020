import React from 'react';
import { ProductContext } from '../../../context';
import { showMoney } from '../../../HelperFunctions/showMoney';

export default function CartTotals() {

    const { clearCart, cartSubTotal, cartTax, cartTotal } = React.useContext(ProductContext);

    return (
        <div className="container">
            <div className="row">
                <div className="col text-title text-center my-4">
                    <div className="text-right">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3> Subtotal</h3><h3 className="text-primary">{showMoney.format(cartSubTotal)}</h3>
                        </div>
                        <div style={{borderBottom: ' 3px grey solid', marginBottom: '1rem'}} className="d-flex justify-content-between align-items-center">
                            <h3> Tax</h3><h3 className="text-primary">{showMoney.format(cartTax)}</h3>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3> Total</h3><h3 className="text-primary">{showMoney.format(cartTotal)}</h3>
                        </div>
                    </div>
                    <button className="btn btn-outline-danger text-capitalize mb-4" onClick={clearCart}>Clear Cart</button>

                </div>
            </div>
        </div>
    )
}
