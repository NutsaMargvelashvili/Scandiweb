import "./index.scss";
import React from "react";
import {getProductsByCategory} from "../../GQL";

import {State} from "../../state";
import {connect} from "react-redux";

interface ICategory {
  selectedProduct: [];
  productCallback: any;
  currency: any;
  category: any;
  // cartDrawerOpen: boolean;
}

class Category extends React.Component<ICategory, { categoryName: string, products: any, amount: number, location: any, currentPath: any }> {
  constructor(props: any) {
    super(props)
    this.state = {
      categoryName: "Category Name",
      products: [],
      amount: 0,
      location: window.location.pathname.split('/')[1],
      currentPath: window.location.pathname.split('/')[1]
    };
    this.handleCurrency = this.handleCurrency.bind(this);

    window.onbeforeunload = () => {
      this.setState({currentPath: window.location.pathname.split('/')[1]})
    };
  }

  handleCurrency(product: any) {
    let curr;
    if (product.prices) {
      curr = product.prices.find((price: any) => {
        return price.currency.label === this.props.currency?.label
      });
    }

    return (<p className={"product-price"}>{curr && (curr.currency.symbol + curr.amount)}</p>)
  }

  componentDidMount() {
    if (this.props.category !== "") {
      this.getProducts()
    }
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.category !== prevProps.category) {
      this.getProducts()
    }
  }

  getProducts() {

    getProductsByCategory(this.props.category).then((value) => {
      this.setState({products: value.products})
    })
      .catch((e) => {
        console.error(e);
      })
  }

  handleProductCallback(selectedProduct: any) {
    this.props.productCallback(selectedProduct)
  }

  handleProduct(product: any) {
    let currentLocation = window.location.pathname.split('/')[1];
    window.history.pushState(null, "", `/${currentLocation}/${product.id}`)
    this.handleProductCallback(product)
  }

  getProductsHtml() {
    return (this.state.products && this.state.products.length) ? (this.state.products.map((product: any, index: any) => (
      <div onClick={() => {
        this.handleProduct(product)
      }} className={`product ${!product.inStock ? "out-of-stock" : ""}`} key={index + product.name}>
        <div className="product-image">
          {!product.inStock && <span>out of stock</span>}
          <img src={product.gallery[0]} alt={product.name}/>
        </div>
        <p className={"product-name"}>{product.name}</p>
        {this.handleCurrency(product)}
      </div>
    ))) : ""
  }

  render() {
    let products = this.getProductsHtml();
    return (
      <div className="category-wrapper">
        <div className="category-name">{this.props.category}</div>
        <div className="products-wrapper">
          {products}
        </div>
      </div>
    );
  }
};


const mapStateToProps = (state: State) => {
  return {
    currency: state.products.currency,
    category: state.products.category,
  }
}
export default connect(mapStateToProps)(Category);
