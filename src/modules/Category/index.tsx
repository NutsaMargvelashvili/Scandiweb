import "./index.scss";
import React from "react";
import {getProductsByCategory} from "../../GQL";
import { HistoryRouterProps } from "react-router-dom";
import {withRouter} from '../../withRouter';
import {State} from "../../state";
import {connect} from "react-redux";
import Cart from "../../assets/svg/CartEmptyWhite.svg";
import {addCartProduct} from "../../state/action-creators";

interface ICategory  extends HistoryRouterProps{
  currency: any;
  category: any;
  addCartProduct: any;
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
  }

  public navigation  = (route: any) =>
  {
    // @ts-ignore
    this.props.navigate(route)
  }

  public handleCurrency = (product: any) => {
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


  handleProduct(product: any) {
    let currentLocation = window.location.pathname.split('/')[1];
    this.navigation(`/${currentLocation}/${product.id}`)
    // this.props.history.push( `/${currentLocation}/${product.id}`)
  }

  getProductsHtml() {
    return (this.state.products && this.state.products.length) ? (this.state.products.map((product: any, index: any) => (
      <div className={`product ${!product.inStock ? "out-of-stock" : ""}`} key={index + product.name}>
        {product.inStock &&
            <button onClick={() => {
              const attributes = {};
              product.attributes.forEach((attribute: any) => {
                // @ts-ignore
                attributes[attribute.name] = attribute.items[0].value
              })
              this.props.addCartProduct({...product,selectedAttributes : attributes})
            }} className="product-add-to-cart-btn">
                <img className={"cart-icon"} alt={"cart"} src={Cart}/>
            </button>
        }
      <div onClick={() => {
        this.handleProduct(product)
      }}  >
        <div className="product-image">
          {!product.inStock && <span>out of stock</span>}
          <img src={product.gallery[0]} alt={product.name}/>

        </div>
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCartProduct: (product: {}) => {
      dispatch(addCartProduct(product))
    }
  }

};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));
