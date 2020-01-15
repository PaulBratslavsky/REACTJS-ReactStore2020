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

    console.log(featuredProducts, "From Featured");

    const showFeaturedProducts = (products) => ( 
            <div className="row">
                { products.map( product =>  <Product key={product.id} product={product}/> ) }
            </div>
    );

    return (
        <section className="py-5">
            <div className="container">
                <Title title="featured products" center="true"/>
                {  dataIsLoading ? <Loading /> : showFeaturedProducts(featuredProducts)}
            </div>
        </section>
    )
}

/**************************************************
    FEATURED JS STYLES
**************************************************/
