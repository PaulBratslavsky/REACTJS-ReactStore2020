/**************************************************
    GLOBAL CONTEXT PROVIDER
**************************************************/
import React, { Component } from "react";

import { linkData } from './linkData';
import { socialData } from './socialData';
import { items } from './productData';
// import { client } from './contentful';


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
        search: "",
        searchPrice: 0,
        minSearchPrice: 0,
        maxSearchPrice: 0,
        searchShipping: false,
        searchCompany: 'all',
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

        // client.getEntries({content_type: "theStore"})
        //     .then( response => this.setProducts(response.items) )
        //     .catch( err => console.error(err) )
        
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

        // Get max price
        let maxSearchPrice = Math.max(...storeProducts.map( item => item.price));
        
        this.setState({ 
            storeProducts, 
            featuredProducts,
            filteredProducts: storeProducts,
            dataIsLoading: false,
            cartItems: this.getStorageCart(), 
            singleProduct: this.getStorageProduct(),
            searchPrice: maxSearchPrice,
            maxSearchPrice: maxSearchPrice
        },() => {
            this.addTotals();
        });
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
        PUBLIC METHODS
    **********************************************/

    /**********************************************
        SIDE NAVIGATION TOGGLE METHOD PUBLIC
    **********************************************/
    handleSidebar = () => {
        this.setState( prevState => ({ sidebarOpen: !prevState.sidebarOpen }) );
        if ( this.state.cartOpen ) {
            this.setState( () => ({ cartOpen: false }) );
        }
    }

    /**********************************************
        SIDE CART NAVIGATION METHODS PUBLIC
    **********************************************/
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
        ADD TO CART METHOD PUBLIC
    **********************************************/

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
            let cartItem = { ...tempItem, count: 1, total };
            
            // Add previous items and new item to cart
            tempCart = [ ...tempCart, cartItem ];

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
    }

    /**********************************************
        SELECT SINGLE PRODUCT METHOD PUBLIC
    **********************************************/
    setSingleProduct = (itemId) => {

        // Get selected product listing
        let singleProduct = this.state.storeProducts.find( item => item.id === itemId );
        
        // Set single listing to local state
        localStorage.setItem('singleProduct', JSON.stringify(singleProduct));

        this.setState({ singleProduct: { ...singleProduct }, dataIsLoading: false });
    }

    /**********************************************
        CART PAGE  METHODS PUBLIC
    **********************************************/

    incrementCartItem = (itemId) => {

        // Set all cart items to temp
        let tempCart = [ ...this.state.cartItems ];

        // using temp cart works because when you opdate the 
        // object via a find you are actually updating the value
        // in temp cart since you are referencing the object
        
        // Find selected item
        const selectedItem = tempCart.find( item => item.id === itemId );
        
        // update count
        selectedItem.count = selectedItem.count + 1;

        // update total item X price
        selectedItem.total = selectedItem.count * selectedItem.price; 

        // Format to two decimals - to fixed returns string so we need to parse it
        selectedItem.total = parseFloat(selectedItem.total.toFixed(2));

        // Update new value in state
        this.setState(() => {
            return { cartItems: [ ...tempCart] }
        }, () => {
            this.addTotals();
            this.syncStorage();
        });
        
    }

    decrementCartItem = (itemId) => {

        // set temp cart
        let tempCart = [ ...this.state.cartItems ];

        // Find Item to update
        const selectedItem = tempCart.find( item => item.id === itemId );

        // Change count
        selectedItem.count = selectedItem.count - 1;


        // Check if item count is zero - if so delete 
        if  (selectedItem.count === 0) {
        
            this.removeCartItem(itemId);

        } else {

            // Change cost
            selectedItem.total = selectedItem.count * selectedItem.price;

            // Format to two decimals - to fixed returns string so we need to parse it
            selectedItem.total = parseFloat(selectedItem.total.toFixed(2));

            // Update State
            this.setState(() => {
                return {
                    cartItems: [ ...tempCart ]
                }
            }, () => {
                this.addTotals();
                this.syncStorage();
            });
        }
    }

    removeCartItem = (itemId) => {

        let tempCart = [ ...this.state.cartItems ];

        const updatedCart = tempCart.filter( item => item.id !== itemId );

        this.setState(() => {
            return {cartItems: [ ...updatedCart ] }
        }, () => {
            this.addTotals();
            this.syncStorage();
        });

        console.log(itemId, 'from remove cart item');
    }

    clearCart = () => {
        this.setState(() => {
            return { cartItems: [] }
        }, () => {
            this.addTotals();
            this.syncStorage();
        });
    }
    /**********************************************
        HANDLE FILTERING METHODS
    **********************************************/
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === "checkbox" 
            ? e.target.checked 
            : e.target.value;
 

        console.log(name, value, this.state.searchShipping);
        this.setState({[name]: value}, this.sortData)
    }

    sortData = () => {
        const { storeProducts, search, searchPrice, searchShipping, searchCompany } = this.state;

        let tempProducts = [...storeProducts];
        console.log(tempProducts);

        // Change string to int
        let tempPrice = parseInt(searchPrice);

        // Filtering based on price
        tempProducts = tempProducts.filter( item => item.price <= tempPrice );

        // Filtering based on company
        if (searchCompany !== "all") {
            tempProducts = tempProducts.filter( item => item.company === searchCompany );
        }
        
        // Filter by free shipping
        if ( searchShipping === true) {
            console.log(searchShipping, "SHIPPING TRUE", tempProducts);
            tempProducts = tempProducts.filter( item => item.freeShipping === true );
            console.log(searchShipping, "SHIPPING TRUE", tempProducts);

        }
        
        // Filter by search 
        if (search !== 0) {

            tempProducts = tempProducts.filter( item => {

                let tempSearch = search.toLowerCase();
                let tempTitle = item.title.toLowerCase();
                let tempDescription = item.description.toLowerCase();

                if ( tempTitle.includes(tempSearch) || tempDescription.includes(tempSearch)) {
                    return item;
                }

                return undefined;
    
            });

        }

        this.setState( () => ({ filteredProducts: [...tempProducts] }));
        //console.log('sorting data', search, searchPrice, searchShipping, searchCompany );


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
                incrementCartItem: this.incrementCartItem,
                decrementCartItem: this.decrementCartItem,
                removeCartItem: this.removeCartItem,
                clearCart: this.clearCart,
                handleChange: this.handleChange,
            }} >
                {this.props.children}
            </ProductContext.Provider>
        );
        
    }
}

// Consumer
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer, ProductContext };