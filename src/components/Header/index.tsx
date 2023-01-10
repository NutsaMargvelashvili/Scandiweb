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
import {withRouter} from "../../withRouter";


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

class AppHeader extends React.Component <IHeader, { selectedSize: string, selectedColor: string, categories: any, currencyDrawer: boolean, cartDrawer: boolean, currencies: any, cartProductsCounts: number, productsCount: number }> {
  constructor(props: any) {
    super(props);

    // Initializing the state
    this.state = {
      selectedSize: "S",
      selectedColor: "#D3D2D5",
      categories: [],
      currencyDrawer: false,
      cartDrawer: false,
      currencies: [],
      cartProductsCounts: 0,
      productsCount: 0
    };
  }

  public navigation = (route: any) => {
    // @ts-ignore
    this.props.navigate(route)
  }

  handleCategory(category: any) {
    this.props.selectCategory(category)
  }

  handleCurrency(currency: any) {
    this.props.selectCurrency({symbol: currency.symbol, label: currency.label})
  }

  componentDidMount() {
    this.getCategories()
    this.getCurrencies()
    if (this.props.cartProducts) {
      this.setCartPorducts()
    }
  }

  getCategories() {
    getCategories().then((value) => {
      this.setState({categories: value});
    })
      .catch((e) => {
        console.error(e);
      })
  }

  getCurrencies() {
    getCurrencies().then((value) => {
      this.setState({currencies: value});
    })
      .catch((e) => {
        console.error(e);
      })
  }

  componentDidUpdate(prevProps: any, prevState: { currencies: any, categories: any }) {
    const currentLocation = this.getCurrentLocation()

    this.countCartProducts(this.props.cartProducts, prevProps.cartProducts);

    if (this.state.currencies !== prevState.currencies) {
      this.handleCurrency({symbol: this.state.currencies[0].symbol, label: this.state.currencies[0].label})
    }

    if (this.state.categories !== prevState.categories) {
      let urlMatch = false;
      if (currentLocation !== "") {
        this.state.categories.forEach((category: any) => {
          if (category.name === currentLocation) {
            this.handleCategory(currentLocation)
            urlMatch = true;
            return;
          }
        })
      }

      if (currentLocation === "" || !urlMatch) {
        this.navigation(this.state.categories[0].name)
        // window.history.pushState(null, "", this.state.categories[0].name)
        this.handleCategory(this.state.categories[0].name)
      }

    }
  }

  countCartProducts(currentCart: any, prevCart: any) {
    if (currentCart !== prevCart) {
      this.setCartPorducts()
    }
  }

  setCartPorducts() {
    let count = 0;
    this.props.cartProducts && Object.values(this.props.cartProducts).forEach((cartProduct: any) => count = count + cartProduct.count)
    this.setState({productsCount: count})
  }

  getCategoriesHtml() {
    return this.state.categories && this.state.categories[0] ? (this.state.categories.map((category: any, index: any) => (
      <li key={index + category.name} className={`Nav__item ${this.props.category === category.name ? "active" : ""}`}>
        <Link onClick={() => {
          this.handleCategory(category.name)
        }} className="Nav__link" to={category.name}>{category.name}</Link>
      </li>
    ))) : ""
  }

  getCurrenciesHtml() {
    return this.state.currencies ? this.state.currencies.map((currency: any, index: any) =>
      <li key={index + currency.label} onClick={() => {
        this.handleCurrency(currency)
        this.setState({currencyDrawer:false})
      }}
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
            <Link onClick={() => {
              this.handleCategory(this.state.categories[0]?.name)
            }} to={`/${this.state.categories[0]?.name}`} className="brand">
              <img src={Logo} alt={"logo"} className="logo"/>
            </Link>
          </div>
          <div className="actions">
            <div className="currency-convertor-wrapper">
              <div className="currency-convertor"
                   onClick={() => this.setState({currencyDrawer: !this.state.currencyDrawer, cartDrawer: false})}>
                <span className={"currency"}>{this.props.currency?.symbol}</span>
                <img className={"arrow-icon"} alt={"arrow"} src={Arrow}/>
              </div>
              {this.state.currencyDrawer && (<div className="currency-drawer">
                <ul className="currency-list-items">
                  {currencies}
                </ul>
              </div>)}
            </div>
            <div className="header-cart-wrapper">
              <div className="cart" onClick={() => {
                this.setState({cartDrawer: !this.state.cartDrawer, currencyDrawer: false});
              }}>
                <img className={"cart-icon"} alt={"cart"} src={Cart}/>
                <div className="cart-product-amount">{this.state.productsCount}</div>
              </div>
              {this.state.cartDrawer && (<div className="cart-drawer">
                <div className={"bag-items-amount"}>
                  <span>My Bag, </span>
                  <span>{this.state.productsCount} {this.state.productsCount > 1 ? "items" : "item"}</span>
                </div>
                <CartProducts big={false}/>
                <div className="cart-products-total-price">
                  <span className={"total-price-caption"}>Total</span>
                  <span className={"total-price"}>{this.props.price.symbol} {this.props.price.amount}</span>
                </div>
                <div className="cart-btns">
                  <button className={"view-cart-btn"}><Link onClick={() => this.setState({cartDrawer: false})}
                                                            className="cart-link" to={"/cart"}>View bag</Link></button>
                  <button className={"check-out-btn"}><Link className="cart-link" to={"/cart"}>Check out</Link></button>
                </div>
              </div>)
              }
            </div>
          </div>
        </div>
        {this.state.currencyDrawer &&
            <div onClick={() => this.setState({currencyDrawer: false})} className="shade-transparent"></div>}
        {this.state.cartDrawer && <div onClick={() => this.setState({cartDrawer: false})} className="shade"></div>}
      </>
    );
  }

  public getCurrentLocation() {
    return window.location.pathname.split('/')[1]
  }
};

const mapStateToProps = (state: State) => {
  return {
    cartProducts: state.cart.cartProducts,
    price: state.cart.price,
    count: state.cart.count,
    currency: state.products.currency,
    category: state.products.category
  }
}
const mapDispatchToProps = (dispatch: any) => {
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppHeader));
