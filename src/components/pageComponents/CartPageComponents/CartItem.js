/**************************************************
    CART ITEM IMPORTS
**************************************************/
import React from 'react';
import { FaTrash, FaChevronCircleUp, FaChevronCircleDown } from 'react-icons/fa';
import { showMoney } from '../../../HelperFunctions/showMoney';

/**************************************************
    CART ITEM COMPONENT
**************************************************/
export default function CartItem({ item, incrementCartItem, decrementCartItem, removeCartItem }) {

    const { id, title, price, count, total, image } = item;
    /**********************************************
        CART ITEM RETURN JSX
    **********************************************/
    return (
        <div className="row mt-5 mt-lg-0 text-capitalize text-center align-items-center">
            <div className="col-10 mx-auto col-lg-2 pb-2">
                <img src={`../${image}`} width="60px" height="60px" className="img-fluid" alt={title}/>
            </div>

            <div className="col-10 mx-auto col-lg-2 pb-2">
                <span className="d-lg-none text-muted">product: </span>
                {title}
            </div>

            <div className="col-10 mx-auto col-lg-2 pb-2">
                <span className="d-lg-none text-muted">price: </span>
                {showMoney.format(price)}
            </div>

            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div className="d-flex align-items-center">
                        <FaChevronCircleDown onClick={() => decrementCartItem(id)} className="text-primary cart-icon" />
                        <span className="m-1">{count}</span>
                        <FaChevronCircleUp onClick={() => incrementCartItem(id)}className="text-primary cart-icon" />
                    </div>
                </div>
            </div>

            <div className="col-10 mx-auto col-lg-2 pb-2">
                <FaTrash onClick={() => removeCartItem(id)} className="text-danger cart-icon" />
            </div>

            <div className="col-10 mx-auto col-lg-2 pb-2">
                <strong className="d-lg-none text-muted">item total: </strong>
                {showMoney.format(total)}
            </div>

        </div>
    )
}
