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
  price: any;
  count: number
}
class Cart extends React.Component<ICart, {priceWithTax: number}> {
  public tax = 21;
  constructor(props: any) {
    super(props);
    // Initializing the state
    this.state = {priceWithTax: 0}
  }
  componentDidMount() {
    this.computePriceWithTax()
  }

  componentDidUpdate(prevProps: any) {
    if(this.props.cartProducts !== prevProps.cartProducts){
      this.computePriceWithTax()
    }
    if(this.props.selectedCurrency !== prevProps.selectedCurrency){
      this.computePriceWithTax()
    }
  }
  computePriceWithTax(){
    this.setState({priceWithTax: parseFloat(((this.props.price.amount * this.tax) / 100).toFixed(2))})
  }


  render() {

    return (
      <div className="cart-wrapper">
        <h1 className={"caption"}>Cart</h1>
        <hr className={"separator"}/>
        <CartProducts selectedCategory={this.props.selectedCategory}
                      callback={this.props.callback}
                      currencyCallback={this.props.currencyCallback}
                      selectedCurrency={this.props.selectedCurrency} big={true}/>
      <div className="total">
        <p className={"tax"}>Tax {this.tax}%: <span>{this.props.price.symbol}{this.state.priceWithTax}</span></p>
        <p className={"quantity"}>Quantity: <span>{this.props.count}</span></p>
        <p className={"price"}>Total: <span>{this.props.price.symbol}{this.props.price.amount}</span></p>
        <button className={"order"}>order</button>
      </div>
      </div>
    );
  }
};
const mapStateToProps = (state: State) => {
  return{
    cartProducts: state.cart.cartProducts,
    price: state.cart.price,
    count: state.cart.count
  }
}
export default connect(mapStateToProps)(Cart);
