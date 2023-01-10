import React from 'react';
import './App.scss';
import AppHeader from "./components/Header";
import Category from "./modules/Category";
import {Routes, Route} from 'react-router-dom';
import {getCategories} from "./GQL";
import Product from "./modules/Product";
import Cart from "./modules/Cart";

class App extends React.Component<{}, { selectedProduct: [] }> {
  public categories = {}

  constructor(props: any) {
    super(props);
    this.state = {selectedProduct: []};
    this.productCallback = this.productCallback.bind(this);
  }

  productCallback(payload: any) {
    this.setState({selectedProduct: payload})

  }

  async componentDidMount() {
    this.categories = await getCategories();
  }

  render() {
    return (
      <div className="App">
        <AppHeader/>
        <Routes location={window.location}>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/" element={<Category productCallback={this.productCallback}
                                             selectedProduct={this.state.selectedProduct}/>}/>
          <Route path="/:category" element={<Category productCallback={this.productCallback}
                                                      selectedProduct={this.state.selectedProduct}/>}/>
          <Route path='/:all/:productId' element={<Product/>}/>
        </Routes>
      </div>
    );
  }
}

export default App;

