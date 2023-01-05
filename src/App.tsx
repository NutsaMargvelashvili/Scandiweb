import React from 'react';
import './App.scss';
import AppHeader from "./components/Header";
import Category from "./modules/Category";
import { Routes, Route, useParams } from 'react-router-dom';
import {getCategories} from "./GQL";
import Product from "./modules/Product";

class App extends React.Component<{}, {selectedCategory: string, selectedCurrency: string, selectedProduct: []}> {

  constructor(props: any) {
    super(props);

    // Initializing the state
    this.state = { selectedCategory: "", selectedCurrency: "USD", selectedProduct: []};
    this.callback = this.callback.bind(this);
    this.currencyCallback = this.currencyCallback.bind(this);
    this.productCallback = this.productCallback.bind(this);
  }

  // setSelectedCategory(category: string) {
  //   this.setState({selectedCategory: category})
  // }
  callback(payload: any){
    this.setState({selectedCategory: payload})

  }
  currencyCallback(payload: any){
    console.log(payload, "payload")
    this.setState({selectedCurrency: payload})

  }
  productCallback(payload: any){
    this.setState({selectedProduct: payload})

  }
  componentDidMount() {

  }

  render() {
    // const { history } = this.props;
    console.log(window.location, "window locationn")
    return (
      <div className="App">
        <AppHeader
          selectedCategory={this.state.selectedCategory}
          callback={this.callback}
          currencyCallback={this.currencyCallback}
          selectedCurrency={this.state.selectedCurrency}
        />
        <Routes location={window.location} >

          <Route path='/clothes/:productId' element={<Product selectedCurrency={this.state.selectedCurrency} selectedProduct={this.state.selectedProduct}/>}/>
          <Route path='/tech/:projectId' element={<Product selectedCurrency={this.state.selectedCurrency} selectedProduct={this.state.selectedProduct}/>}/>
          <Route path='/all/:projectId' element={<Product selectedCurrency={this.state.selectedCurrency} selectedProduct={this.state.selectedProduct}/>}/>

          <Route id={"all"} path="/all" element={<Category productCallback={this.productCallback} selectedProduct={this.state.selectedProduct} selectedCurrency={this.state.selectedCurrency} selectedCategory={this.state.selectedCategory}/>}/>
          <Route path="/clothes" element={<Category  productCallback={this.productCallback} selectedProduct={this.state.selectedProduct} selectedCurrency={this.state.selectedCurrency} selectedCategory={this.state.selectedCategory}/>}/>
          <Route path="/tech" element={<Category productCallback={this.productCallback} selectedProduct={this.state.selectedProduct} selectedCurrency={this.state.selectedCurrency} selectedCategory={this.state.selectedCategory}/>}/>



        </Routes>

  </div>
    );
  }
}

export default App;

