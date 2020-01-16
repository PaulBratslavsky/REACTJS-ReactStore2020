/**************************************************
    SINGLE PRODUCT PAGE IMPORTS
**************************************************/
import React from 'react';
import Hero from '../components/globalComponents/Hero';
import Loading from '../components/globalComponents/Loading';
import singleProductBcg from '../images/singleProductBcg.jpeg';
import { ProductContext } from '../context';
import SelectedProduct from '../components/globalComponents/SelectedProduct';

/**************************************************
    SINGLE PRODUCT PAGE COMPONENTS
**************************************************/
export default function SingleProductPage() {

    const { singleProduct, addToCart, dataIsLoading } = React.useContext(ProductContext);

    return (
        <React.Fragment>
            <Hero image={singleProductBcg} title="selected product"/>
            { dataIsLoading ? <Loading /> : <SelectedProduct singleProduct={singleProduct} addToCart={addToCart}/> }
        </React.Fragment>
    )
}
