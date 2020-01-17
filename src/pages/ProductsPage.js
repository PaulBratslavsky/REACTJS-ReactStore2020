import React from 'react';
import Hero from '../components/globalComponents/Hero';
import Products from '../components/pageComponents/ProductsComponent/Products'
import productsBcg from '../images/productsBcg.jpeg';
export default function ProductsPage() {
    return (
        <React.Fragment>
            <Hero image={productsBcg} />
            <Products />
        </React.Fragment>
    )
}
