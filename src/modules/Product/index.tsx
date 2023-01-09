import "./index.scss";
import React from "react";
import {connect} from "react-redux";
import {State} from "../../state";
import {addCartProduct} from "../../state/action-creators";
import {getProductByID, getProductsByCategory} from "../../GQL";

interface IProduct {
  cartProducts: [];
  currency: any;
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
  return sizes?.items ?  <><p className={"caption"}>{sizes?.name}:</p>
      <div className="size-wrapper">
        {sizes?.items?.map((size: any, index: any)=> {return <div key={index + size.id} onClick={() => {this.setState({selectedSize: size.value})}} className={`size ${this.state.selectedSize === size.value ? "active" : ""}`}>{size.value}</div>})}
      </div></> : ""
  }

  getProductColors(){
    let colors;

    if(this.state.selectedProduct.attributes){
      colors = this.state.selectedProduct.attributes.find((attributeName:any)=> {return attributeName.name === "Color"});
    }
    return colors?.items ?  <><p className={"caption"}>{colors?.name}:</p>
      <div className="color-wrapper">
        {colors?.items?.map((color: any, index: any)=> {return    <div key={index + color.id} onClick={() => {this.setState({selectedColor: color.value})}} className={`border ${this.state.selectedColor === color.value ? "active" : ""}`}><div style={{background: color.value}} className={"color"} ></div></div>})}
      </div>
    </> : ""
  }

  handleCurrency(){
    let curr;
    if(this.state.selectedProduct.prices){
      curr = this.state.selectedProduct.prices.find((price:any)=> {return price.currency.label === this.props.currency?.label});
    }
    return   (<p className={"price"}>{curr && (curr.currency.symbol + curr.amount)}</p>)
  }
  getProductHtml(){
    return  this.state.selectedProduct.gallery ? this.state.selectedProduct.gallery.map((image: any, index: any)=>
        <img onClick={()=> {this.setState({selectedImage: index})}} className={"all-img"} alt={this.state.selectedProduct.name} key={index + this.state.selectedProduct.id} src={image}/>) : ""
  }

  render() {
    //console.log(this.props.cartProducts, "cartproductttt")
   let product = this.getProductHtml()
   let productSizes = this.getProductSizes()
   let productColors = this.getProductColors()
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
            {productColors}
          <p className={"caption"}>price:</p>
          {this.handleCurrency()}
          <button onClick={() => {this.props.addCartProduct(this.state.selectedProduct)}} className={"add-cart-btn"}>Add to cart</button>
          {/*{this.props.cartProducts}*/}
          <div className={"description"}  dangerouslySetInnerHTML={{__html: this.state.selectedProduct.description}}></div>
        </div>
      </div>
    );
  }
};
const mapStateToProps = (state: State) => {
  return{
    cartProducts: state.cart.cartProducts,
    currency: state.products.currency,
  }
}
// const mapDispatchToProps = (dispatch:any, product: {}) =>({
//   addCartProduct
// })
//

const mapDispatchToProps = (dispatch:any) => {
  return {
    addCartProduct: (product: {}) => {
      dispatch(addCartProduct(product))
      // addCartProduct(product)(dispatch);
    }
  }
  // return {
  //   addCartProduct: addCartProduct(product)(dispatch)
  // }
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
