import "./index.scss";
import React from "react";
import {getCategories, getCurrencies} from "../../GQL";
import {State} from "../../state";
import {connect} from "react-redux";
import {
  addCartProduct,
  countCartProducts,
  countCartProductsPrice,
  removeCartProduct
} from "../../state/action-creators";


interface ICartProducts {
  selectedCategory: any;
  callback: any;
  currencyCallback: any;
  selectedCurrency: any;
  cartProducts: any;
  addCartProduct: any;
  removeCartProduct: any;
  countCartProductsPrice: any;
  countCartProducts: any;
  big: any;
}

class CartProducts extends React.Component <ICartProducts, { selectedSize: string, selectedColor: string, categories: any, currencyDrawer: boolean, cartDrawer: boolean, currencies: any, cartProductsCounts: number, productsCount: number, productsTotalPrice: any}> {
  constructor(props: any) {
    super(props);

    // Initializing the state
    this.state = {selectedSize: "S", selectedColor: "#D3D2D5", categories: [], currencyDrawer: false, cartDrawer: false, currencies: [], cartProductsCounts: 0, productsCount: 0, productsTotalPrice: {price: 0, symbol: this.props.selectedCurrency.symbol}};
  }

  componentDidMount() {
    this.getCategories()
    this.getCurrencies()
    if (this.props.cartProducts){
      this.countCartProducts()
      this.countCartProductsPrice()
    }
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
      console.log("cartProducts have changed")
      this.countCartProducts()
      this.countCartProductsPrice()
    }
    if(this.props.selectedCurrency !== prevProps.selectedCurrency){
      this.countCartProductsPrice()
    }
  }
  countCartProductsPrice(){
    let totalPrice = 0;
    this.props.cartProducts && Object.values(this.props.cartProducts).forEach((cartProduct: any)=> {
      totalPrice = totalPrice + cartProduct.product.prices.find((price:any)=>
      {return price.currency.label === this.props.selectedCurrency?.label}).amount * cartProduct.count
    })
    this.props.countCartProductsPrice({symbol: this.props.selectedCurrency?.symbol, label: this.props.selectedCurrency?.label, amount: parseFloat(totalPrice.toFixed(2))})
    // this.setState({productsTotalPrice: {symbol: this.props.selectedCurrency?.symbol, amount: parseFloat(totalPrice.toFixed(2))}})
  }
  countCartProducts(){
    let count = 0;
    this.props.cartProducts && Object.values(this.props.cartProducts).forEach((cartProduct: any)=> count = count + cartProduct.count)
    this.props.countCartProducts(count)
    this.setState({productsCount: count})
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
    return (
      <>
                {this.props.cartProducts ? Object.values(this.props.cartProducts).map((cartProduct: any, index: any)=>{
                  return (
                    <>
                    <div key={index+cartProduct.id} className={`cart-product-wrapper ${this.props.big ? "big" : ""}`}>
                    <div className="cart-product-info">
                      <p className={"brand"}>{cartProduct.product.brand}</p>
                      <p className={"name"}>{cartProduct.product.name}</p>
                      {this.handleCurrency(cartProduct.product)}
                      {this.getProductSizes(cartProduct.product)}
                      {this.getProductColors(cartProduct.product)}
                    </div>
                    <div className={"product-image-with-actions"}>
                    <div className={"cart-product-actions"}>
                      <button onClick={() => {this.props.removeCartProduct(cartProduct.product)}}>-</button>
                      <span>{cartProduct.count}</span>
                      <button onClick={() => {this.props.addCartProduct(cartProduct.product)}}>+</button>
                    </div>
                    <img src={cartProduct.product.gallery[0]} alt={cartProduct.product.id} />
                    </div>
                  </div>
                      {this.props.big && <hr className={"separator"}/>}
                    </>)
                }) : "" }
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
    },
    removeCartProduct: (product: {}) => {
      dispatch(removeCartProduct(product))
    },
    countCartProductsPrice: (price: {}) => {
      dispatch(countCartProductsPrice(price))
    },
    countCartProducts: (price: {}) => {
      dispatch(countCartProducts(price))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartProducts);
