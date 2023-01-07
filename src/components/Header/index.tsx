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
  // setCartDrawerOpen: any;
  // cartDrawerOpen: any;
}

class AppHeader extends React.Component <IHeader, { categories: any, currencyDrawer: boolean, cartDrawer: boolean, currencies: any }> {
  constructor(props: any) {
    super(props);

    // Initializing the state
    this.state = {categories: [], currencyDrawer: false, cartDrawer: false, currencies: []};
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
      <li  key={index + category.name}  className={`Nav__item ${this.props.selectedCategory === category.name ? "active" : ""}`}>
        <Link onClick={() => this.handleCallback(category.name)} className="Nav__link" to={category.name}>{category.name}</Link>
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
      <>
      <div className="app-header">
        <nav className="Nav">
          <ul className="Nav__item-wrapper">
            {categories}
          </ul>
        </nav>
        <div className="logo-wrapper">
          <Link onClick={()=>{this.handleCallback(this.state.categories[0]?.name)}} to={`/${this.state.categories[0]?.name}`} className="brand">
            <img src={Logo} alt={"logo"} className="logo"/>
          </Link>
        </div>
        <div className="actions">
          <div className="currency-convertor"
               onClick={() => this.setState({currencyDrawer: !this.state.currencyDrawer, cartDrawer: false})}>
            <span className={"currency"}>{this.props.selectedCurrency?.symbol}</span>
            <img className={"arrow-icon"} alt={"arrow"} src={Arrow}/>
            {this.state.currencyDrawer && (<div className="currency-drawer">
              <ul className="currency-list-items">
                {currencies}
              </ul>
            </div>)}
          </div>
          <div className="cart" onClick={() => this.setState({cartDrawer: !this.state.cartDrawer, currencyDrawer: false})}>
            <img className={"cart-icon"} alt={"cart"} src={Cart}/>
            <div className="cart-product-amount">3</div>
            {this.state.cartDrawer && (<div className="cart-drawer">
              cart drawer
              <button className={"view-cart-btn"}><Link className="cart-link" to={"/cart"}>View bag</Link></button>
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

export default AppHeader;
