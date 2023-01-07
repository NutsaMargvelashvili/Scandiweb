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
class App extends React.Component<IApp, {selectedCategory: string, selectedCurrency: {}, selectedProduct: []}> {
  public categories = {}

  constructor(props: any) {
    super(props);
    // Initializing the state
    this.state = { selectedCategory: "", selectedCurrency: {label: "USD", symbol: "$"}, selectedProduct: []};
    this.callback = this.callback.bind(this);
    this.currencyCallback = this.currencyCallback.bind(this);
    this.productCallback = this.productCallback.bind(this);
    // this.setCartDrawerOpen = this.setCartDrawerOpen.bind(this);
  }

  // setSelectedCategory(category: string) {
  //   this.setState({selectedCategory: category})
  // }
  callback(payload: any){
    this.setState({selectedCategory: payload})
  }
  currencyCallback(payload: any){
    console.log(payload, "payload")
    this.setState({selectedCurrency: {label: payload.label, symbol: payload.symbol}})

  }

 // setCartDrawerOpen(payload: any){
 //    this.setState({cartDrawerOpen: payload})
 //  }
  productCallback(payload: any){
    this.setState({selectedProduct: payload})

  }
  async componentDidMount() {
    this.categories = await getCategories();
    console.log(this.categories)
  }

  render() {
    // const { history } = this.props;
    console.log(this.state.selectedCurrency, "selected currency")
    return (
      <div className="App">
        {/*<button onClick={this.props.onAddCartProduct}>smth</button>*/}
        <AppHeader
          selectedCategory={this.state.selectedCategory}
          callback={this.callback}
          currencyCallback={this.currencyCallback}
          selectedCurrency={this.state.selectedCurrency}
        />
        <Routes location={window.location} >
          <Route path="/:category" element={<Category productCallback={this.productCallback} selectedProduct={this.state.selectedProduct} selectedCurrency={this.state.selectedCurrency} selectedCategory={this.state.selectedCategory}/>}/>
          <Route path='/:all/:productId' element={<Product selectedCurrency={this.state.selectedCurrency} />}/>
        </Routes>
      </div>
    );
  }
}
export default App;

