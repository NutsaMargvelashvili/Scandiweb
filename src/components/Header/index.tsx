import "./index.scss";
import React from "react";
import {Link} from "react-router-dom";
import Arrow from "../../assets/svg/ArrowDown.svg"
import Cart from "../../assets/svg/CartEmpty.svg"
import Logo from "../../assets/svg/Logo.svg"
import {getCategories, getCurrencies} from "../../GQL";
import {State} from "../../state";
import {connect} from "react-redux";
import {addCartProduct, removeCartProduct, selectCategory, selectCurrency} from "../../state/action-creators";
import CartProducts from "../CartProducts";


interface IHeader {
  cartProducts: any;
  price: any;
  count: any;
  currency: any;
  category: any;
  addCartProduct: any;
  removeCartProduct: any;
  selectCurrency: any;
  selectCategory: any;
}

class AppHeader extends React.Component <IHeader, { selectedSize: string, selectedColor: string, categories: any, currencyDrawer: boolean, cartDrawer: boolean, currencies: any, cartProductsCounts: number, productsCount: number}> {
  constructor(props: any) {
    super(props);

    // Initializing the state
    this.state = {selectedSize: "S", selectedColor: "#D3D2D5", categories: [], currencyDrawer: false, cartDrawer: false, currencies: [], cartProductsCounts: 0, productsCount: 0};
  }

  handleCategory(category: any){
    this.props.selectCategory(category)
  }

  handleCurrency(currency: any){
    this.props.selectCurrency({symbol: currency.symbol, label: currency.label})
  }

  componentDidMount() {
    this.getCategories()
    this.getCurrencies()
    this.handleCategory(window.location.pathname.split('/')[1])
    if (this.props.cartProducts){
      this.countCartProducts()
    }
  }

  getCategories(){
    getCategories().then((value) => {
      this.setState({categories: value});
      // return Promise.reject("oh, no!");
    })
      .catch((e) => {
        console.error(e); // "oh, no!"
      })
  }
  getCurrencies(){
    getCurrencies().then((value) => {
      this.setState({currencies: value});
      // return Promise.reject("oh, no!");
    })
      .catch((e) => {
        console.error(e); // "oh, no!"
      })
  }

  componentDidUpdate(prevProps: any, prevState: { currencies: any }) {
    if(this.props.cartProducts !== prevProps.cartProducts){
      this.countCartProducts()
    }
    if(this.state.currencies !== prevState.currencies){
      this.handleCurrency({symbol: this.state.currencies[0].symbol, label: this.state.currencies[0].label})
    }
  }
  countCartProducts(){
    let count = 0;
    this.props.cartProducts && Object.values(this.props.cartProducts).forEach((cartProduct: any)=> count = count + cartProduct.count)
    this.setState({productsCount: count})
  }
  getCategoriesHtml() {
    console.log(this.state.currencies, "currenciesss")
    return this.state.categories && this.state.categories[0] ? (this.state.categories.map((category: any, index: any) => (
      <li  key={index + category.name}  className={`Nav__item ${this.props.category === category.name ? "active" : ""}`}>
        <Link onClick={() => {this.handleCategory(category.name)}} className="Nav__link" to={category.name}>{category.name}</Link>
      </li>
    ))) : ""
  }

  getCurrenciesHtml(){
    return this.state.currencies ? this.state.currencies.map((currency: any, index: any)=>
        <li key={index + currency.label} onClick={() => {this.handleCurrency(currency)}}
            className={`list-item ${this.props.currency.label === currency.label ? "active" : ""}`}>{`${currency.symbol} ${currency.label}`}</li>) : ""
  }

  render() {
    let categories = this.getCategoriesHtml()
    let currencies = this.getCurrenciesHtml()
    return (
      <>
      <div className="app-header">
        <nav className="Nav">
          <ul className="Nav__item-wrapper">
            {categories}
          </ul>
        </nav>
        <div className="logo-wrapper">
          <Link onClick={()=>{this.handleCategory(this.state.categories[0]?.name)}} to={`/${this.state.categories[0]?.name}`} className="brand">
            <img src={Logo} alt={"logo"} className="logo"/>
          </Link>
        </div>
        <div className="actions">
          <div className="currency-convertor"
               onClick={() => this.setState({currencyDrawer: !this.state.currencyDrawer, cartDrawer: false})}>
            <span className={"currency"}>{this.props.currency?.symbol}</span>
            <img className={"arrow-icon"} alt={"arrow"} src={Arrow}/>
            {this.state.currencyDrawer && (<div className="currency-drawer">
              <ul className="currency-list-items">
                {currencies}
              </ul>
            </div>)}
          </div>
          <div className="cart" onClick={() => this.setState({cartDrawer: !this.state.cartDrawer, currencyDrawer: false})}>
            <img className={"cart-icon"} alt={"cart"} src={Cart}/>
            <div className="cart-product-amount">{this.state.productsCount}</div>
            {this.state.cartDrawer && (<div className="cart-drawer">
              <div className={"bag-items-amount"}>
                <span>My Bag, </span>
                <span>{this.state.productsCount} {this.state.productsCount > 1 ? "items" : "item"}</span>
              </div>
              <CartProducts big={false} />
              <div className="cart-products-total-price">
                <span className={"total-price-caption"}>Total</span>
                <span className={"total-price"}>{this.props.price.symbol} {this.props.price.amount}</span>
              </div>
              <div className="cart-btns">
                <button className={"view-cart-btn"}><Link className="cart-link" to={"/cart"}>View bag</Link></button>
                <button className={"check-out-btn"}><Link className="cart-link" to={"/cart"}>Check out</Link></button>
              </div>
            </div>)
            }
          </div>
        </div>
      </div>
    {this.state.cartDrawer && <div className="shade"></div>}
    </>
    );
  }
};

const mapStateToProps = (state: State) => {
  return{
    cartProducts: state.cart.cartProducts,
    price: state.cart.price,
    count: state.cart.count,
    currency: state.products.currency,
    category: state.products.category
  }
}
const mapDispatchToProps = (dispatch:any) => {
  return {
    addCartProduct: (product: {}) => {
      dispatch(addCartProduct(product))
    },
    removeCartProduct: (product: {}) => {
      dispatch(removeCartProduct(product))
    },
    selectCurrency: (currency: {}) => {
      dispatch(selectCurrency(currency))
    },
    selectCategory: (category: {}) => {
      dispatch(selectCategory(category))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
