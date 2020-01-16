/**************************************************
    FEATURED IMPORTS
**************************************************/
import React from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../../context';

/**************************************************
    GLOBAL COMPONENTS IMPORTS
**************************************************/

import Product from '../../globalComponents/Product';
import Title from '../../globalComponents/Title';
import Loading from '../../globalComponents/Loading';
import { items } from '../../../context/productData';


/**************************************************
    FEATURED COMPONENT
**************************************************/
export default function Featured() {

    const { dataIsLoading, featuredProducts } = React.useContext(ProductContext);

    const showFeaturedProducts = (products) => ( 
            <div className="row">
                { products.map( product =>  <Product key={product.id} product={product}/> ) }
            </div>
    );

    return (
        <section className="py-5">
            <div className="container">
                <Title title="featured products" center="true"/>
                <div className="my-4">
                    {  dataIsLoading  ? <Loading /> : showFeaturedProducts(featuredProducts)}
                    
                    { !dataIsLoading &&
                        <div className="row d-flex justify-content-center mt-4">
                            <Link className="main-link" to="/products">Sea All Products</Link>
                        </div>
                    } 
                </div>
            </div>
        </section>
    )
}
