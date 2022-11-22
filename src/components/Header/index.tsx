import "./index.scss";
import React from "react";
import {Link} from "react-router-dom";
import Arrow from "../../assets/svg/ArrowDown.svg"
import Cart from "../../assets/svg/CartEmpty.svg"
import Logo from "../../assets/svg/Logo.svg"

class AppHeader extends React.Component {
  render() {
    return (
      <div className="app-header">
        <nav className="Nav">
              <ul className="Nav__item-wrapper">
                <li className="Nav__item active">
                  <Link className="Nav__link" to="/Women">Women</Link>
                </li>
                <li className="Nav__item">
                  <Link className="Nav__link" to="/Men">Men</Link>
                </li>
                <li className="Nav__item">
                  <Link className="Nav__link" to="/Kids">Kids</Link>
                </li>
              </ul>
        </nav>
        <div className="logo-wrapper">
          <Link to="/" className="brand">
            <img src={Logo} className="logo" />
          </Link>
        </div>
        <div className="actions">
          <div className="currency-convertor">
              <span className={"currency"}>$</span>
              <img className={"arrow-icon"} alt={"arrow"} src={Arrow}/>
          </div>
          <div className="cart">
            <img className={"cart-icon"} alt={"cart"} src={Cart}/>
            <div className="cart-product-amount">3</div>
          </div>
        </div>
      </div>
    );
  }
};

export default AppHeader;
