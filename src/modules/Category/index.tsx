import "./index.scss";
import React from "react";
import {getCategories, getProductsByCategory} from "../../GQL";

import {Link} from "react-router-dom";

// import { match } from 'react-router-dom';
// interface DetailsProps {
//   required: string;
//   match?: match<DetailParams>;
// }

interface ICategory {
  selectedCategory: string;
  selectedCurrency: any;
  selectedProduct: [];
  productCallback: any;
  cartDrawerOpen: boolean;
}
class Category extends React.Component<ICategory, {categoryName: string, products: any, amount: number, location: any, currentPath: any}> {
 // public products = [];
   constructor(props: any) {
    super(props)
  //  console.log(window.location.pathname.split('/')[1])
    // Initializing the state
    this.state = { categoryName: "Category Name", products: [], amount: 0, location: window.location.pathname.split('/')[1], currentPath: window.location.pathname.split('/')[1]  };
    this.handleCurrency= this.handleCurrency.bind(this);

     window.onbeforeunload = () => {
       this.setState({currentPath:window.location.pathname.split('/')[1]})
     };
  }

  handleCurrency(product: any){
    console.log("entered")
    let curr;
    if(product.prices){
      curr = product.prices.find((price:any)=> {return price.currency.label === this.props.selectedCurrency?.label});
    }

    return   (<p className={"product-price"}>{curr && (curr.currency.symbol + curr.amount)}</p>)
  }
  componentDidMount() {
    this.getProducts()
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.selectedCategory !== prevProps.selectedCategory) {
      this.getProducts()
    }
  }
  getProducts() {
  //  const {products} = await getProductsByCategory(window.location.pathname.split('/')[1])

    getProductsByCategory(window.location.pathname.split('/')[1]).then((value) => {
      console.log(value, "valuuuue")
       this.setState({products: value.products})
      })
        .catch((e) => {
          console.error(e); // "oh, no!"
        })
   // this.products = products
  }

  handleProductCallback(selectedProduct: any) {
    this.props.productCallback(selectedProduct)
  }
  handleProduct (product: any) {
    let currentLocation = window.location.pathname.split('/')[1];
    window.history.pushState(null, "", `/${currentLocation}/${product.id}`)
    this.handleProductCallback(product)
  }

  getProductsHtml() {
    return  (this.state.products && this.state.products.length)  ? (this.state.products.map((product: any, index: any) => (
  <div onClick={()=> { this.handleProduct(product) }} className={`product ${!product.inStock ? "out-of-stock" : ""}`} key={product.name + index}>
    <div className="product-image">
      {!product.inStock && <span>out of stock</span>}
      <img src={product.gallery[0]} alt={product.name }/>
    </div>
    <p className={"product-name"}>{product.name}</p>
    {this.handleCurrency(product)}
    {/*<p*/}
    {/*  // onClick={this.handleCurrency.bind(this, product)}*/}
    {/*  className={"product-price"}>{product.prices[0].currency.symbol + this.handleCurrency.bind(this,product)}</p>*/}
  </div>
))) : ""
  }
  render() {
     let products = this.getProductsHtml();
    return (
      <div className="category-wrapper">
        {this.props.cartDrawerOpen &&  <div className="shade"></div>}
        <div className="category-name">{this.props.selectedCategory}</div>
        <div className="products-wrapper">
          {products}
        </div>
      </div>
    );
  }
};
export default Category;
