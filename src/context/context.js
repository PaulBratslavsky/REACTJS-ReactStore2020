/**************************************************
    GLOBAL CONTEXT PROVIDER
**************************************************/
import { linkData } from './linkData';
import React, { Component } from "react";

const ProductContext = React.createContext();

class ProductProvider extends Component {

    /**********************************************
        GLOBAL STATE
    **********************************************/

    state = {
        sidebarOpen: false,
        cartOpen: false,
        cartItems: ['1','2','4'],
        links: linkData,
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
            }} >
                {this.props.children}
            </ProductContext.Provider>
        );
        
    }
}

// Consumer
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer, ProductContext };