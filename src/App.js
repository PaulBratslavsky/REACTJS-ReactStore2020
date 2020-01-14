/**************************************************
  APP JS IMPORTS 
**************************************************/
import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import { ProductContext } from './context';

/**************************************************
  IMPORT STYLES
**************************************************/
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/**************************************************
  IMPORT GLOBAL COMPONENTS
**************************************************/
import Navbar from './components/globalComponents/Navbar';
import Sidebar from './components/globalComponents/Sidebar';
import SideCart from './components/globalComponents/SideCart';
import Footer from './components/globalComponents/Footer'

/**************************************************
  IMPORT PAGES
**************************************************/
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import SingleProductPage from './pages/SingleProductPage';
import CartPage from './pages/CartPage';
import DefaultPage from './pages/DefaultPage';

/**************************************************
  MAIN COMPONENT
**************************************************/
function App() {

  // const context = React.useContext(ProductContext);

  return (
    <React.Fragment>
      <Navbar />
      <Sidebar /> 
      <SideCart />

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/products" exact component={ProductsPage} />
        <Route path="/products/:id" component={SingleProductPage} />
        <Route path="/cart" component={CartPage} />
        <Route component={DefaultPage} />
      </Switch>

      <Footer />
    
  </React.Fragment>
  );
}

export default App;
