/**************************************************
    GLOBAL CONTEXT PROVIDER
**************************************************/
import React, { Component } from "react";

import { linkData } from './linkData';
import { socialData } from './socialData';
import { items } from './productData';


const ProductContext = React.createContext();

class ProductProvider extends Component {

    /**********************************************
        GLOBAL STATE
    **********************************************/

    state = {
        sidebarOpen: false,
        cartOpen: false,
        links: linkData,
        socialLinks: socialData,
        dataIsLoading: true,
        storeProducts: [],
        filteredProducts: [],
        featuredProducts: [],
        singleProduct: {},
        cartItems: [],
        cartItemsCount: 0,
        cartSubTotal: 0,
        cartTaxt: 0,
        cartTotal: 0,
    }

    /**********************************************
        ON MOUNT
    **********************************************/
    componentDidMount() {

        setTimeout( () => {
            this.someAsynFunction(items)
                .then( response => this.setProducts(response) )
                .catch( err => console.error(err) )
        }, 2000);
        
    }

    /**********************************************
        FETCH DATA
    **********************************************/
    someAsynFunction = (items) => new Promise((resolve, reject) => items ? resolve(items) : reject("ERROR") );

    setProducts = (products) => {
        
        let storeProducts = products.map( item => {
            const { id } = item.sys;
            const image  = item.fields.image.fields.file.url;
            const product = { id, ...item.fields, image }
            return product;
        })

        let featuredProducts = storeProducts.filter( item => item.featured === true );
        
        this.setState({ 
            storeProducts, 
            featuredProducts,
            filteredProducts: storeProducts,
            dataIsLoading: false,
            cartItems: this.getStorageCart(), 
            singleProduct: this.getStorageProduct(),
        });
    }

    /**********************************************
        GLOBAL METHODS
    **********************************************/

    // HANDLE SIDEBAR TOGGLE
    handleSidebar = () => {
        this.setState( prevState => ({ sidebarOpen: !prevState.sidebarOpen }) );
        if ( this.state.cartOpen ) {
            this.setState( () => ({ cartOpen: false }) );
        }
    }

    // HANDLE CART TOGGLE
    handleCart = () => {
        this.setState( prevState => ({ cartOpen: !prevState.cartOpen }) );
        if ( this.state.sidebarOpen ) {
            this.setState( () => ({ sidebarOpen: false }) );
        }
    }

    handleCartClose = () => {
        this.setState( () => ({ cartOpen: false }) );
    }

    handleCartOpen = () => {
        this.setState( () => ({ cartOpen: true }) );
    }

    // addToCart 
    addToCart = (itemId) => {
        console.log('add to cart', itemId);
    }

    // Set Single Product
    setSingleProduct = (itemId) => {
        console.log('set porduct', itemId);
    }
    /**********************************************
        PRIVATE METHODS
    **********************************************/
    
    // Get Cart From Local Storage
    getStorageCart = () => {
        return 5;
    }

    // Get Products From Local Storage
    getStorageProduct = () => {
        return 5;
    }

    // Get Total From Local Storage
    getTotals = () => {

    }

    // Add Totals
    addTotals = () => {

    }

    // Sync Storage
    syncStorage = () => {

    }

    /**********************************************
        RENDER METHODS
    **********************************************/

    render() {

        return(
            <ProductContext.Provider value={{ 
                ...this.state,
                handleSidebar: this.handleSidebar,
                handleCart: this.handleCart,
                handleCartClose: this.handleCartClose,
                handleCartOpen: this.handleCartOpen,
                addToCart: this.addToCart,
                setSingleProduct: this.setSingleProduct,
            }} >
                {this.props.children}
            </ProductContext.Provider>
        );
        
    }
}

// Consumer
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer, ProductContext };