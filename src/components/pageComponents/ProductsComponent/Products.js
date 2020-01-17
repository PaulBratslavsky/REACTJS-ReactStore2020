/**************************************************
    PRODUCTS PAGE HELPER IMPORTS 
**************************************************/
import React from 'react';
import { ProductContext } from '../../../context';
import Title from '../../globalComponents/Title';
import Product from '../../globalComponents/Product';
import Loading from '../../globalComponents/Loading';

/**************************************************
    PRODUCTS PAGE HELPER COMPONENT 
**************************************************/
export default function Products() {
    const { filteredProducts, dataIsLoading } = React.useContext(ProductContext);


    const showAllProducts = (products) => ( 
        <div className="row">
            { products.map( product =>  <Product key={product.id} product={product}/> ) }
        </div>
    );

    return (
        <section className="py-5">
            <div className="container">
                <Title title="Our Products" center="true"/>
                <div className="py-4">
                    { dataIsLoading ? <Loading /> : showAllProducts(filteredProducts) }
                </div>
            </div>
        </section>
    )
}
