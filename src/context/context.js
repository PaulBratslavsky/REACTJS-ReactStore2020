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
        cartTax: 0,
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
        },() => {
            this.addTotals();
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

        // Get current cart items from state
        let tempCart = [ ...this.state.cartItems ];

        // Get list of products
        let tempProducts = [...this.state.storeProducts];

        // Check if item we are adding already exists in cart
        let tempItem = tempCart.find( item => item.id === itemId );

        // Check if found item is undefined if so add the current Item
        if (!tempItem) {

            // Find seleceted item in product list
            tempItem = tempProducts.find( item => item.id === itemId );

            // Set total price 
            let total = tempItem.price;

            // Create new Item object to add to cart
            let cartItem = { ...tempItem, count: 1, total }
            
            // Add previous items and new item to cart
            tempCart = [ ...tempCart, cartItem ]
            console.log(cartItem, "Item added to cart");
        } else {
            // new item allready in cart so inclrease count by 1
            tempItem.count++;

            // Increase total based on quantety
            tempItem.total = tempItem.count * tempItem.price;
            // Parce to float 
            tempItem.total = parseFloat(tempItem.total.toFixed(2));
        }

        // Set Items to state and fire additional methods
        this.setState(() => ({ cartItems: tempCart }), () => {
            // Call methods after state change
            this.addTotals();
            this.syncStorage();
            this.handleCartOpen();
        });

        console.log(tempCart, "Current Items in cart");
        console.log('add to cart', itemId);
    }

    // Set Single Product
    setSingleProduct = (itemId) => {

        // Get selected product listing
        let singleProduct = this.state.storeProducts.find( item => item.id === itemId );
        
        // Set single listing to local state
        localStorage.setItem('singleProduct', JSON.stringify(singleProduct));

        this.setState({ singleProduct: { ...singleProduct }, dataIsLoading: false });
    }
    /**********************************************
        PRIVATE METHODS
    **********************************************/
    
    // Get Cart From Local Storage
    getStorageCart = () => {
        let cart;

        // check if items exist
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            return cart;
        } else {
            return [];
        }
        
    }

    // Get Products From Local Storage
    getStorageProduct = () => localStorage.getItem('singleProduct') 
        ? JSON.parse(localStorage.getItem('singleProduct')) : {} ;

    // Get Total From Local Storage
    getTotals = () => {

        let subTotal = 0;
        let cartItemsCount = 0;

        // Add Total and Cart Items
        this.state.cartItems.forEach( item => {
            subTotal += item.total;
            cartItemsCount += item.count;
        });

        subTotal = parseFloat(subTotal.toFixed(2));

        // Calculate tax
        let tax = subTotal * 0.05;
        tax = parseFloat(tax.toFixed(2));

        // Calculate price with tax
        let total = subTotal + tax;
        total = parseFloat(total.toFixed(2));

        return {
            cartItemsCount,
            subTotal,
            tax,
            total
        }
    }

    // Add Totals
    addTotals = () => {

        const totals = this.getTotals();

        this.setState({
            cartItemsCount: totals.cartItemsCount,
            cartSubTotal: totals.subTotal,
            cartTax: totals.tax,
            cartTotal: totals.total
        });
    }

    // Sync Storage
    syncStorage = () => {
        localStorage.setItem('cart', JSON.stringify(this.state.cartItems));
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