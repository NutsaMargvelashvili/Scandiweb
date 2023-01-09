import React from 'react';
import './App.scss';
import AppHeader from "./components/Header";
import Category from "./modules/Category";
import { Routes, Route, useParams } from 'react-router-dom';
import {getCategories} from "./GQL";
import Product from "./modules/Product";
import Cart from "./modules/Cart";
import {connect} from "react-redux"

interface IApp {
  // onAddCartProduct: any
}
class App extends React.Component<IApp, {selectedCategory: string, selectedProduct: []}> {
  public categories = {}

  constructor(props: any) {
    super(props);
    // Initializing the state
    this.state = { selectedCategory: "", selectedProduct: []};
    this.productCallback = this.productCallback.bind(this);
    // this.setCartDrawerOpen = this.setCartDrawerOpen.bind(this);
  }

  // setSelectedCategory(category: string) {
  //   this.setState({selectedCategory: category})
  // }

 // setCartDrawerOpen(payload: any){
 //    this.setState({cartDrawerOpen: payload})
 //  }
  productCallback(payload: any){
    this.setState({selectedProduct: payload})

  }
  async componentDidMount() {
    this.categories = await getCategories();
  }

  render() {
    // const { history } = this.props;
    return (
      <div className="App">
        <AppHeader/>
        <Routes location={window.location} >
          <Route path="/cart" element={<Cart />}/>
          <Route path="/" element={<Category productCallback={this.productCallback} selectedProduct={this.state.selectedProduct} />}/>
          <Route path="/:category" element={<Category productCallback={this.productCallback} selectedProduct={this.state.selectedProduct} />}/>
          <Route path='/:all/:productId' element={<Product/>}/>
        </Routes>
      </div>
    );
  }
}
export default App;

