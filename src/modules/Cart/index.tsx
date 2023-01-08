import "./index.scss";
import React from "react";
import {State} from "../../state";
import {connect} from "react-redux";
import CartProducts from "../../components/CartProducts";

interface ICart {
  selectedCategory: any;
  callback: any;
  currencyCallback: any;
  selectedCurrency: any;
  cartProducts: any;
}
class Cart extends React.Component<ICart, {}> {
  constructor(props: any) {
    super(props);
    // Initializing the state

  }

  render() {

    return (
      <div className="cart-wrapper">
        <h1 className={"caption"}>Cart</h1>
        <CartProducts selectedCategory={this.props.selectedCategory}
                      callback={this.props.callback}
                      currencyCallback={this.props.currencyCallback}
                      selectedCurrency={this.props.selectedCurrency} />
      </div>
    );
  }
};
const mapStateToProps = (state: State) => {
  return{
    cartProducts: state.cart.cartProducts
  }
}
export default connect(mapStateToProps)(Cart);
