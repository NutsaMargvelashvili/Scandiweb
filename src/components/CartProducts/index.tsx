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
import Attributes from "../Attributes";


interface ICartProducts {
  cartProducts: any;
  addCartProduct: any;
  removeCartProduct: any;
  countCartProductsPrice: any;
  countCartProducts: any;
  big: any;
  currency: any;
}

class CartProducts extends React.Component <ICartProducts, { selectedAttribute: any, categories: any, currencyDrawer: boolean, cartDrawer: boolean, currencies: any, cartProductsCounts: number, productsCount: number, productsTotalPrice: any }> {
  constructor(props: any) {
    super(props);

    // Initializing the state
    this.state = {
      selectedAttribute: {},
      categories: [],
      currencyDrawer: false,
      cartDrawer: false,
      currencies: [],
      cartProductsCounts: 0,
      productsCount: 0,
      productsTotalPrice: {price: 0, symbol: this.props.currency.symbol}
    };
  }

  componentDidMount() {
    this.getCategories()
    this.getCurrencies()
    if (this.props.cartProducts) {
      this.countCartProducts()
      this.countCartProductsPrice()
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

  componentDidUpdate(prevProps: any, prevState: { categories: number; }) {
    if (this.props.cartProducts !== prevProps.cartProducts) {
      this.countCartProducts()
      this.countCartProductsPrice()
    }
    if (this.props.currency !== prevProps.currency) {
      this.countCartProductsPrice()
    }
  }

  countCartProductsPrice() {
    let totalPrice = 0;
    this.props.cartProducts && Object.values(this.props.cartProducts).forEach((cartProduct: any) => {
      totalPrice = totalPrice + cartProduct.product.prices.find((price: any) => {
        return price.currency.label === this.props.currency?.label
      }).amount * cartProduct.count
    })
    this.props.countCartProductsPrice({
      symbol: this.props.currency?.symbol,
      label: this.props.currency?.label,
      amount: parseFloat(totalPrice.toFixed(2))
    })
  }

  countCartProducts() {
    let count = 0;
    this.props.cartProducts && Object.values(this.props.cartProducts).forEach((cartProduct: any) => count = count + cartProduct.count)
    this.props.countCartProducts(count)
    this.setState({productsCount: count})
  }

  handleCurrency(product: any) {
    let curr;
    if (product.prices) {
      curr = product.prices.find((price: any) => {
        return price.currency.label === this.props.currency?.label
      });
    }
    return (<p className={"price"}>{curr && (curr.currency.symbol + curr.amount)}</p>)
  }

  render() {
    return (
      <div className={`cart-products-wrapper ${this.props.big ? "big" : ""}`}>
        {this.props.cartProducts ? Object.entries(this.props.cartProducts).map((cartProductEntrie: any, index: any) => {
         const cartProduct = cartProductEntrie[1]
          console.log(cartProductEntrie[0])
          console.log(this.props.cartProducts)
          console.log(cartProductEntrie[1])
          return (
            <div key={cartProductEntrie[0]} >
              <div className={"cart-product-wrapper"}>
                <div className="cart-product-info">
                  <p className={"brand"}>{cartProduct.product.brand}</p>
                  <p className={"name"}>{cartProduct.product.name}</p>
                  {this.handleCurrency(cartProduct.product)}
                  <Attributes  selectedAttribute={cartProduct.product.selectedAttributes} inCart product={cartProduct.product}/>
                </div>
                <div className={"product-image-with-actions"}>
                  <div className={"cart-product-actions"}>
                    <button onClick={() => {
                      this.props.removeCartProduct(cartProduct.product)
                    }}>-
                    </button>
                    <span>{cartProduct.count}</span>
                    <button onClick={() => {
                      this.props.addCartProduct(cartProduct.product)
                    }}>+
                    </button>
                  </div>
                  <img src={cartProduct.product.gallery[0]} alt={cartProduct.product.id}/>
                </div>
              </div>
              {this.props.big && <hr className={"separator"}/>}
            </div>)
        }) : ""}
      </div>
    );
  }
};

const mapStateToProps = (state: State) => {
  return {
    cartProducts: state.cart.cartProducts,
    currency: state.products.currency
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
    countCartProductsPrice: (price: {}) => {
      dispatch(countCartProductsPrice(price))
    },
    countCartProducts: (price: {}) => {
      dispatch(countCartProducts(price))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartProducts);
