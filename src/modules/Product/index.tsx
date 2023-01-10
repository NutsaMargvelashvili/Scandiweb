import "./index.scss";
import React from "react";
import {connect} from "react-redux";
import {State} from "../../state";
import {addCartProduct} from "../../state/action-creators";
import {getProductByID} from "../../GQL";
import Attributes from "../../components/Attributes";

interface IProduct {
  cartProducts: [];
  currency: any;
  addCartProduct: any;
}

class Product extends React.Component<IProduct, { selectedImage: number, selectedProduct: any, selectedAttribute: any}> {
  public product = [];

  constructor(props: any) {
    super(props);
    this.state = {selectedImage: 0, selectedProduct: [], selectedAttribute: {}};

  }

  componentDidMount(state = {}) {
    this.getProduct()
  }

  getProduct() {
    getProductByID(window.location.pathname.split('/')[2]).then((value) => {
      this.setState({selectedProduct: value})
    })
      .catch((e) => {
        console.error(e);
      })
  }

  handleCurrency() {
    let curr;
    if (this.state.selectedProduct.prices) {
      curr = this.state.selectedProduct.prices.find((price: any) => {
        return price.currency.label === this.props.currency?.label
      });
    }
    return (<p className={"price"}>{curr && (curr.currency.symbol + curr.amount)}</p>)
  }

  getProductHtml() {
    return this.state.selectedProduct.gallery ? this.state.selectedProduct.gallery.map((image: any, index: any) =>
      <img onClick={() => {
        this.setState({selectedImage: index})
      }} className={"all-img"} alt={this.state.selectedProduct.name} key={index + this.state.selectedProduct.id}
           src={image}/>) : ""
  }

  public handleAttribute = (payload: any) => {
   this.setState({selectedAttribute: payload})
  }

  render() {
    let product = this.getProductHtml()
    return (
      <div className="product-wrapper">
        <div className="gallery">
          <div className="all-img">
            {product}
          </div>
          <img className={"main-img"} alt={this.state.selectedProduct.name}
               src={this.state.selectedProduct?.gallery?.[this.state.selectedImage]}/>
        </div>
        <div className="product-info">
          <p className={"brand"}>{this.state.selectedProduct.brand}</p>
          <p className={"name"}>{this.state.selectedProduct.name}</p>
          <Attributes setSelectedAttribute={this.handleAttribute} selectedAttribute={this.state.selectedAttribute} product={this.state.selectedProduct}/>
          <p className={"caption"}>price:</p>
          {this.handleCurrency()}
          <button disabled={!this.state.selectedProduct.inStock} onClick={() => {
            console.log(this.state.selectedAttribute, "selected attribute")
            this.props.addCartProduct({...this.state.selectedProduct, selectedAttributes : this.state.selectedAttribute},)
          }} className={"add-cart-btn"}>Add to cart
          </button>
          <div className={"description"}
               dangerouslySetInnerHTML={{__html: this.state.selectedProduct.description}}></div>
        </div>
      </div>
    );
  }
};
const mapStateToProps = (state: State) => {
  return {
    cartProducts: state.cart.cartProducts,
    currency: state.products.currency,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCartProduct: (product: {}) => {
      dispatch(addCartProduct(product))
    }
  }

};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
