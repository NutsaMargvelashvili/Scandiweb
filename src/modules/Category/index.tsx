import "./index.scss";
import React from "react";
import {getCategories} from "../../GQL";

import {Link} from "react-router-dom";

// import { match } from 'react-router-dom';
// interface DetailsProps {
//   required: string;
//   match?: match<DetailParams>;
// }

interface ICategory {
  selectedCategory: string;
  selectedCurrency: string;
  selectedProduct: [];
  productCallback: any;
}
class Category extends React.Component<ICategory, {categoryName: string, products: any, amount: number}> {
  constructor(props: any) {
    super(props);

    // Initializing the state
    this.state = { categoryName: "Category Name", products: [], amount: 0  };
    this.handleCurrency= this.handleCurrency.bind(this);
  }

  handleCurrency(product: any){
    console.log("entered")
    let curr;
    if(product.prices){
      curr = product.prices.find((price:any)=> {return price.currency.label === this.props.selectedCurrency});
    }

    return   (<p className={"product-price"}>{curr && (curr.currency.symbol + curr.amount)}</p>)
  }
  componentDidMount() {

    // console.log('Props:', this.props.match)
    // const { match } = this.props;
    // console.log(match.params.id)
    // console.log(this.props.products, "prooood")
    let selectedCategoryProducts;
    getCategories().then((value) => {
      selectedCategoryProducts = value.find((category:any)=> {return category.name === this.props.selectedCategory});
      this.setState({products: selectedCategoryProducts})
    })
      .catch((e) => {
        console.error(e); // "oh, no!"
      })
  }

  componentDidUpdate(prevProps: any, prevState:any) {
    // Typical usage (don't forget to compare props):
    if (this.props.selectedCategory !== prevProps.selectedCategory) {
      // console.log(this.props.products, "prooood")
      let selectedCategoryProducts;
      getCategories().then((value) => {
        selectedCategoryProducts = value.find((category:any)=> {return category.name === this.props.selectedCategory});
        this.setState({products: selectedCategoryProducts})
      })
        .catch((e) => {
          console.error(e); // "oh, no!"
        })
    }
  }
  handleProductCallback(selectedProduct: any) {
    this.props.productCallback(selectedProduct)
  }
  handleProduct (product: any) {
    // const { history } = this.props;
    let currentLocation = window.location.pathname.split('/')[1];
    window.history.pushState(null, "", `/${currentLocation}/${product.id}`)
    // this.props.history.push(`/${currentLocation}/${product.id}`, {productId: product.id})
    this.handleProductCallback(product)

  }
  render() {
    return (
      <div className="category-wrapper">
        <div className="category-name">{this.props.selectedCategory}</div>
        <div className="products-wrapper">
          {(this.state.products.products && this.state.products.products.length)  ? (this.state.products.products.map((product: any, index: any) => (
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
          ))) : ""}
        </div>
      </div>
    );
  }
};
export default Category;
