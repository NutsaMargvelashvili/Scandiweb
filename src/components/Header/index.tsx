import "./index.scss";
import React from "react";
import {Link} from "react-router-dom";
import Arrow from "../../assets/svg/ArrowDown.svg"
import Cart from "../../assets/svg/CartEmpty.svg"
import Logo from "../../assets/svg/Logo.svg"
import {getCategories} from "../../GQL";


interface IHeader {
  selectedCategory: any;
  callback: any;
  currencyCallback: any;
  selectedCurrency: string;
  setCartDrawerOpen: any;
  cartDrawerOpen: any;
}

class AppHeader extends React.Component <IHeader, { categories: any, currencyDrawer: boolean }> {
  constructor(props: any) {
    super(props);

    // Initializing the state
    this.state = {categories: [], currencyDrawer: false};
  }

  handleCallback(selectedCategor: any) {
    this.props.callback(selectedCategor)
  }

  handleCurrencyCallback(selectedCurrency: any) {
    this.props.currencyCallback(selectedCurrency)
  }

  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);
    console.log(queryParams, "dnfkj")
    getCategories().then((value) => {
      this.setState({categories: value});
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

  render() {
    let catagoriesMenu = this.getCategoriesHtml()

    return (
      <div className="app-header">
        <nav className="Nav">
          <ul className="Nav__item-wrapper">
            {catagoriesMenu}
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
            <span className={"currency"}>$</span>
            <img className={"arrow-icon"} alt={"arrow"} src={Arrow}/>
            {this.state.currencyDrawer && (<div className="currency-drawer">
              <ul className="currency-list-items">
                <li onClick={() => this.handleCurrencyCallback("USD")}
                    className={`list-item ${this.props.selectedCurrency === "USD" ? "active" : ""}`}>$ USD
                </li>
                <li onClick={() => this.handleCurrencyCallback("RUB")}
                    className={`list-item ${this.props.selectedCurrency === "RUB" ? "active" : ""}`}>₽ RUB
                </li>
                {/*There was EUR given on Figma but the products don't have that currency so I,ve replaced EUR with RUB*/}
                <li onClick={() => this.handleCurrencyCallback("JPY")}
                    className={`list-item ${this.props.selectedCurrency === "JPY" ? "active" : ""}`}>¥ JPY
                </li>
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
