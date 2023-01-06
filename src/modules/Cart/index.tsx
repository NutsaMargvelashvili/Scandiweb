import "./index.scss";
import React from "react";

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
export default Cart;
