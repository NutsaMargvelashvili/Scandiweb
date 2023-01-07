import "./index.scss";
import React from "react";
import {connect} from "react-redux";
import {State} from "../../state";
import {addCartProduct} from "../../state/action-creators";
import {getProductByID, getProductsByCategory} from "../../GQL";

interface IProduct {
  // selectedProduct: any;
  selectedCurrency: any;
  cartProducts: [];
  addCartProduct: any;
}
class Product extends React.Component<IProduct, {selectedSize: string, selectedColor: string, selectedImage: number, selectedProduct: any}> {
  public product = [];
  constructor(props: any) {
    super(props);
    this.state = { selectedSize: "S", selectedColor: "#D3D2D5", selectedImage: 0, selectedProduct: []};
    // Initializing the state

  }

  componentDidMount() {
    this.getProduct()
  }

  getProduct() {
    getProductByID(window.location.pathname.split('/')[2]).then((value) => {
      console.log(value, "prodddd")
      this.setState({selectedProduct: value})
    })
      .catch((e) => {
        console.error(e); // "oh, no!"
      })
  }

  getProductSizes(){
    let sizes;
    if(this.state.selectedProduct.attributes){
      sizes = this.state.selectedProduct.attributes.find((attributeName:any)=> {return attributeName.name === "Size"});
    }
  return sizes?.items ?  <><p className={"caption"}>Size:</p>
      <div className="size-wrapper">
        {sizes?.items?.map((size: any, index: any)=> {return <div key={index + size.id} onClick={() => {this.setState({selectedSize: size.value})}} className={`size ${this.state.selectedSize === size.value ? "active" : ""}`}>{size.value}</div>})}
      </div></> : ""
  }

  handleCurrency(){
    let curr;
    if(this.state.selectedProduct.prices){
      curr = this.state.selectedProduct.prices.find((price:any)=> {return price.currency.label === this.props.selectedCurrency?.label});
    }
    return   (<p className={"price"}>{curr && (curr.currency.symbol + curr.amount)}</p>)
  }
  getProductHtml(){
    return  this.state.selectedProduct.gallery ? this.state.selectedProduct.gallery.map((image: any, index: any)=>
        <img onClick={()=> {this.setState({selectedImage: index})}} className={"all-img"} alt={this.state.selectedProduct.name} key={index + this.state.selectedProduct.id} src={image}/>) : ""
  }

  render() {
   let product = this.getProductHtml()
   let productSizes = this.getProductSizes()
    return (
      <div className="product-wrapper">
        <div className="gallery">
          <div className="all-img">
            {product}
          </div>
          <img className={"main-img"} alt={this.state.selectedProduct.name} src={this.state.selectedProduct?.gallery?.[this.state.selectedImage]}/>
        </div>
        <div className="product-info">
          <p className={"brand"}>{this.state.selectedProduct.brand}</p>
          <p className={"name"}>{this.state.selectedProduct.name}</p>
            {productSizes}
          <p className={"caption"}>color:</p>
          <div className="color-wrapper">
            <div onClick={() => {this.setState({selectedColor: "#D3D2D5"})}} className={`border ${this.state.selectedColor === "#D3D2D5" ? "active" : ""}`}>
            <div style={{background: "#D3D2D5"}} className={"color"} ></div>
            </div>
            <div onClick={() => {this.setState({selectedColor: "#2B2B2B"})}} className={`border ${this.state.selectedColor === "#2B2B2B" ? "active" : ""}`}>
              <div style={{background: "#2B2B2B"}} className={"color"} ></div>
            </div>
            <div onClick={() => {this.setState({selectedColor: "#0F6450"})}} className={`border ${this.state.selectedColor === "#0F6450" ? "active" : ""}`}>
              <div style={{background: "#0F6450"}} className={"color"} ></div>
            </div>
          </div>
          <p className={"caption"}>price:</p>
          {this.handleCurrency()}
          <button onClick={() => {addCartProduct(this.state.selectedProduct); console.log("onclick")}} className={"add-cart-btn"}>Add to cart</button>
          {this.props.cartProducts}
          <p className={"description"}>{this.state.selectedProduct.description}</p>
        </div>
      </div>
    );
  }
};
const mapStateToProps = (state: State) => {
  return{
    cartProducts: state.cart.cartProducts
  }
}
const mapDispatchToProps = (dispatch:any, product: {}) =>({
  addCartProduct
})
export default connect(mapStateToProps, mapDispatchToProps)(Product);
