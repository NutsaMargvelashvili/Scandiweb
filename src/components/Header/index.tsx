import "./index.scss";
import React from "react";
import {Link} from "react-router-dom";
import Arrow from "../../assets/svg/ArrowDown.svg"
import Cart from "../../assets/svg/CartEmpty.svg"
import Logo from "../../assets/svg/Logo.svg"
import {getCategories, getCurrencies} from "../../GQL";


interface IHeader {
  selectedCategory: any;
  callback: any;
  currencyCallback: any;
  selectedCurrency: any;
  setCartDrawerOpen: any;
  cartDrawerOpen: any;
}

class AppHeader extends React.Component <IHeader, { categories: any, currencyDrawer: boolean, currencies: any }> {
  constructor(props: any) {
    super(props);

    // Initializing the state
    this.state = {categories: [], currencyDrawer: false, currencies: []};
  }

  handleCallback(selectedCategor: any) {
    this.props.callback(selectedCategor)
  }

  handleCurrencyCallback(selectedCurrency: any) {
    this.props.currencyCallback(selectedCurrency)
  }

  componentDidMount() {
    this.getCategories()
    this.getCurrencies()
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
      console.log(value,"currencies")
      // return Promise.reject("oh, no!");
    })
      .catch((e) => {
        console.error(e); // "oh, no!"
      })
  }

  componentDidUpdate(prevProps: any, prevState: { categories: number; }) {
    if (this.state.categories > prevState.categories) {
      console.log("wohooo", this.state.categories)
    }
  }

  getCategoriesHtml() {
    return this.state.categories && this.state.categories[0] ? (this.state.categories.map((category: any, index: any) => (
      <li onClick={() => this.handleCallback(category.name)}
          className={`Nav__item ${this.props.selectedCategory === category.name ? "active" : ""}`}
          key={category.name + index}>
        <Link className="Nav__link" to={category.name}>{category.name}</Link>
      </li>
    ))) : ""
  }

  getCurrenciesHtml(){
    return this.state.currencies ? this.state.currencies.map((currency: any, index: any)=>
        <li key={index + currency.label} onClick={() => this.handleCurrencyCallback(currency)}
            className={`list-item ${this.props.selectedCurrency === currency.label ? "active" : ""}`}>{`${currency.symbol} ${currency.label}`}</li>) : ""
  }

  render() {
    let categories = this.getCategoriesHtml()
    let currencies = this.getCurrenciesHtml()
    return (
      <div className="app-header">
        <nav className="Nav">
          <ul className="Nav__item-wrapper">
            {categories}
          </ul>
        </nav>
        <div className="logo-wrapper">
          <Link to="/" className="brand">
            <img src={Logo} className="logo"/>
          </Link>
        </div>
        <div className="actions">
          <div  style={{zIndex: "4"}} className="currency-convertor"
               onClick={() => this.setState({currencyDrawer: !this.state.currencyDrawer})}>
            <span className={"currency"}>{this.props.selectedCurrency?.symbol}</span>
            <img className={"arrow-icon"} alt={"arrow"} src={Arrow}/>
            {this.state.currencyDrawer && (<div className="currency-drawer">
              <ul className="currency-list-items">
                {currencies}
              </ul>
            </div>)}
          </div>
          <div className="cart" onClick={this.props.setCartDrawerOpen}>
            <img className={"cart-icon"} alt={"cart"} src={Cart}/>
            <div className="cart-product-amount">3</div>
            {this.props.cartDrawerOpen && (
              <>
              <div  style={{background: "#234362",position : "fixed",top: "70px", left:"0",minWidth: "100vw", minHeight: "100vh", zIndex: "2"}}/>
              <div className="cart-drawer" style={{zIndex: "4"}}>
                cart drawer
                <button className={"view-cart-btn"}><Link className="cart-link" to={"/cart"}>View bag</Link></button>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default AppHeader;
