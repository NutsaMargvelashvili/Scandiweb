import React from 'react';
import './App.scss';
import AppHeader from "./components/Header";
import Category from "./modules/Category";
import {Routes, Route} from 'react-router-dom';
import Product from "./modules/Product";
import Cart from "./modules/Cart";

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <AppHeader/>
        <Routes  location={window.location}>
          <Route path="/cart" element={<Cart/>}/>
          <Route path='/:all/:productId'  element={<Product/>}/>
          <Route path="/:category" element={<Category />}/>
          <Route path="/" element={<Category />}/>
        </Routes>
      </div>
    );
  }
}

export default App;

