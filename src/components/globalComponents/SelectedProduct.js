/**************************************************
    SINGLE PRODUCT PAGE IMPORTS
**************************************************/
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function SelectedProduct({singleProduct,addToCart, history}) {

    React.useEffect( () => {
        
        if ( localStorage.getItem('singleProduct') === null ) {
            history.push('/products')
        }
    });

    const { company, description, id, price, title, image } = singleProduct;

    const showMoney = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto col-sm-8 col-md-6 my-3">
                        <img src={`../${image}`} alt={title} className="img-fluid"/>
                    </div>
                    <div className="col-10 mx-auto col-sm-8 col-md-6 my-3">
                        <h5 className="text-title mb-4">model: {title}</h5>
                        <h5 className="text-capitalize text-muted mb-4">company: {company}</h5>
                        <h5 className="text-main text-capitalize mb-4">price: {showMoney.format(price)}</h5>
                        <p className="text-capitalize text-title mb-3">info</p>
                        <p>{description}</p>
                        <button type="button" onClick={() => addToCart(id) } className="main-link" style={{margin: '0.75rem'}}>Add to Cart</button>
                        <Link to="/products" className="main-link" style={{margin: '0.75rem'}} >Back To Products</Link>     
                    </div>
                </div>
            </div>
        </section>
    )
}

export default withRouter(SelectedProduct);