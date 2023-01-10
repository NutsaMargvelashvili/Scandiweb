import "./index.scss";
import React from "react";
import {connect} from "react-redux";
import {State} from "../../state";
import {addCartProduct} from "../../state/action-creators";
import {getProductByID} from "../../GQL";

interface IProduct {
  cartProducts: [];
  currency: any;
  addCartProduct: any;
}
class Product extends React.Component<IProduct, {selectedImage: number, selectedProduct: any, selectedAttribute: any}> {
  public product = [];
  constructor(props: any) {
    super(props);
    this.state = {selectedImage: 0, selectedProduct: [], selectedAttribute: {}};
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
  handleAttribute(name: string, value:any){
    let attribute: any = this.state.selectedAttribute;
    attribute[name] = value;
   this.setState({selectedAttribute: attribute})
    console.log(this.state.selectedAttribute, "selected attribute")
  }
  getProductAttributes(){
    let attribute;

    if(this.state.selectedProduct.attributes)
      attribute = this.state.selectedProduct.attributes.map((attribute:any)=>{
        if(attribute.type === "text") {
          let attributeName = attribute.name;
          return ( <><p className={"caption"}>{attribute.name}:</p>
        <div className="text-attribute-wrapper">
          {attribute?.items?.map((attribute: any, index: any)=>
            <div key={index + attribute.id} onClick={() => {this.handleAttribute(attributeName, attribute.value)}} className={`text-attribute ${this.state.selectedAttribute[attributeName] === attribute.value ? "active" : ""}`}>{attribute.value}</div>)}
        </div>
      </>)
        }
        else if(attribute.type === "swatch"){
          let attributeName = attribute.name;
          return ( <><p className={"caption"}>{attribute.name}:</p>
            <div className="swatch-attribute-wrapper">
              {attribute?.items?.map((attribute: any, index: any)=> {return <div key={index + attribute.id} onClick={() => {this.handleAttribute(attributeName, attribute.value)}} className={`border ${this.state.selectedAttribute[attributeName] === attribute.value ? "active" : ""}`}><div style={{background: attribute.value}} className={"swatch-attribute"} ></div></div>})}
            </div>
          </>)
        }
        return <></>
         } );
    return attribute
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
   let product = this.getProductHtml()
   let productAttributes = this.getProductAttributes()
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
            {productAttributes}
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
