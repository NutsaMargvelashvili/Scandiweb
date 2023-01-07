import "./index.scss";
import React from "react";
import {Link} from "react-router-dom";
import Arrow from "../../assets/svg/ArrowDown.svg"
import Cart from "../../assets/svg/CartEmpty.svg"
import Logo from "../../assets/svg/Logo.svg"
import {getCategories, getCurrencies} from "../../GQL";
import {State} from "../../state";
import {connect} from "react-redux";
import {addCartProduct} from "../../state/action-creators";


interface IHeader {
  selectedCategory: any;
  callback: any;
  currencyCallback: any;
  selectedCurrency: any;
  cartProducts: any;
  addCartProduct: any;

  // setCartDrawerOpen: any;
  // cartDrawerOpen: any;
}

class AppHeader extends React.Component <IHeader, { selectedSize: string, selectedColor: string, categories: any, currencyDrawer: boolean, cartDrawer: boolean, currencies: any, cartProductsCounts: number}> {
  constructor(props: any) {
    super(props);

    // Initializing the state
    this.state = {selectedSize: "S", selectedColor: "#D3D2D5", categories: [], currencyDrawer: false, cartDrawer: false, currencies: [], cartProductsCounts: 0};
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
      // return Promise.reject("oh, no!");
    })
      .catch((e) => {
        console.error(e); // "oh, no!"
      })
  }

  componentDidUpdate(prevProps: any, prevState: { categories: number; }) {
    if(this.props.cartProducts !== prevProps.cartProducts){
      this.countCartProducts()
    }
  }
  countCartProducts(){
    let counts: any = [];
    this.props.cartProducts.forEach((product:any)=>{
      if(!counts.includes(product)){
        counts.push(product)
      }
    })
    // console.log(counts.length, "count")
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
  handleCurrency(product: any){
    let curr;
    if(product.prices){
      curr = product.prices.find((price:any)=> {return price.currency.label === this.props.selectedCurrency?.label});
    }
    return   (<p className={"price"}>{curr && (curr.currency.symbol + curr.amount)}</p>)
  }

  getProductSizes(product: any){
    let sizes;
    if(product.attributes){
      sizes = product.attributes.find((attributeName:any)=> {return attributeName.name === "Size"});
    }
    return sizes?.items ?  <><p className={"caption"}>{sizes?.name}:</p>
      <div className="size-wrapper">
        {sizes?.items?.map((size: any, index: any)=> {return <div key={index + size.id} onClick={() => {this.setState({selectedSize: size.value})}} className={`size ${this.state.selectedSize === size.value ? "active" : ""}`}>{size.value}</div>})}
      </div></> : ""
  }
  getProductColors(product: any){
    let colors;

    if(product.attributes){
      colors = product.attributes.find((attributeName:any)=> {return attributeName.name === "Color"});
    }
    return colors?.items ?  <><p className={"caption"}>{colors?.name}:</p>
      <div className="color-wrapper">
        {colors?.items?.map((color: any, index: any)=> {return    <div key={index + color.id} onClick={() => {this.setState({selectedColor: color.value})}} className={`border ${this.state.selectedColor === color.value ? "active" : ""}`}><div style={{background: color.value}} className={"color"} ></div></div>})}
      </div>
    </> : ""
  }
  render() {
    let categories = this.getCategoriesHtml()
    let currencies = this.getCurrenciesHtml()
    // console.log(this.props.cartProducts, "amounttt")
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
            <div className="cart-product-amount">{this.props.cartProducts.length}</div>
            {this.state.cartDrawer && (<div className="cart-drawer">
              <div className={"bag-items-amount"}>
                <span>My Bag, </span>
                <span>3 items</span>
              </div>
              {this.props.cartProducts ? this.props.cartProducts.map((cartProduct: any, index: any)=>
                <div key={index+cartProduct[0].id} className={"cart-product-wrapper"}>
                  <div className="cart-product-info">
                    <p className={"brand"}>{cartProduct[0].brand}</p>
                    <p className={"name"}>{cartProduct[0].name}</p>
                    {this.handleCurrency(cartProduct[0])}
                    {this.getProductSizes(cartProduct[0])}
                    {this.getProductColors(cartProduct[0])}
                  </div>
                  <div className={"cart-product-actions"}>
                    <button>-</button>
                    <span>{cartProduct.length}</span>
                    <button onClick={() => {this.props.addCartProduct(cartProduct[0])}}>+</button>
                  </div>
                  <img src={cartProduct[0].gallery[0]} alt={cartProduct[0].id} />
                </div>) : "" }
              <div className="cart-products-total-price">
                <span className={"total-price-caption"}>Total</span>
                <span className={"total-price"}>$1000</span>
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
    cartProducts: state.cart.cartProducts
  }
}
const mapDispatchToProps = (dispatch:any) => {
  return {
    addCartProduct: (product: {}) => {
      dispatch(addCartProduct(product))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
