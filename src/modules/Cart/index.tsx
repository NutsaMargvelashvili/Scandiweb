import "./index.scss";
import React from "react";
import {State} from "../../state";
import {connect} from "react-redux";

interface ICart {

}
class Cart extends React.Component<ICart, {}> {
  constructor(props: any) {
    super(props);
    // Initializing the state

  }

  render() {

    return (
      <div className="cart-wrapper">
        Cart
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
