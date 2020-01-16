/**************************************************
    PRODUCT IMPORTS
**************************************************/
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSearch, FaCartPlus } from 'react-icons/fa';
import { ProductContext} from '../../context';

/**************************************************
    PRODUCT COMPONENT
**************************************************/
export default function Product({product}) {

    const {addToCart, setSingleProduct } = React.useContext(ProductContext);

    const showMoney = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    return (
        <ProductWrapper className="col-10 mx-auto col-sm-8 col-md-6 col-lg-4 my-3">
            <div className="card">
                <div className="img-container">
                    <img src={product.image} className="card-img-top p-5" style={{height: '320px'}} alt={product.title}/>
                    <div className="product-icon">
                        <Link to={`/products/${product.id}`} onClick={ () => setSingleProduct(product.id) } >
                            <FaSearch className="icon" />
                        </Link> 
                        <FaCartPlus className="icon" onClick={ () => { addToCart(product.id) }} />     
                    </div>
                </div>
                <div className="card-body d-flex justify-content-between">
                    <p className="mb-0">{product.title}</p>
                    <p className="mb-0 text-main">{showMoney.format(product.price)}</p>
                </div>
            </div>
        </ProductWrapper>
    )
}

/**************************************************
    PRODUCT JS STYLES
**************************************************/

const ProductWrapper = styled.div`
    .card {
        box-shadow: 7px 7px 10px -4px rgba(0,0,0,0.71);
        transition: var(--mainTransition);
        height: 100%;
    }

    .card:hover {
        box-shadow: 10px 10px 10px -8px rgba(0,0,0,0.71);
        cursor: pointer;
    } 
    
    .card-img-top {
        transition: var(--mainTransition);
    }

    .card:hover .card-img-top {
        transform: scale(1.15);
        opacity: 0.2;
    }

    .img-container {
        position: relative;
    }

    .product-icon {
        opacity: 0;
        position: absolute;
        
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%,-50%);

        transition: var(--mainTransition);

        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .icon {
        background: var(--mainBlack);
        color: white;
        padding: 0.5rem;
        font-size: 3rem;
        border-radius: 5px;
        transition: var(--mainTransition);
    }

    .icon:hover {
        color: var(--mainWhite);
        background: var(--primaryColor);
    }

    .card:hover .product-icon {
        opacity: 1;
    }

    .card-body {
        font-weight: bold;
        letter-spacing: 1.5px;
        text-transform: uppercase;
    }
`;