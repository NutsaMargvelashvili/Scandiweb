import "./index.scss";
import React from "react";

interface IProduct {
  selectedProduct: any;
  selectedCurrency: string
}
class Product extends React.Component<IProduct, {selectedSize: string, selectedColor: string}> {
  constructor(props: any) {
    super(props);
    this.state = { selectedSize: "S", selectedColor: "#D3D2D5"};
    // Initializing the state

  }
  handleCurrency(){
    console.log("entered")
    let curr;
    if(this.props.selectedProduct.prices){
      curr = this.props.selectedProduct.prices.find((price:any)=> {return price.currency.label === this.props.selectedCurrency});
    }

    return   (<p className={"price"}>{curr && (curr.currency.symbol + curr.amount)}</p>)
  }
  render() {
    {console.log(this.props.selectedProduct, "producttt")}

    return (
      <div className="product-wrapper">
        <div className="gallery">
          <img className={"main-img"} alt={this.props.selectedProduct.name} src={this.props.selectedProduct.gallery[0]}/>
        </div>
        <div className="product-info">
          <p className={"brand"}>{this.props.selectedProduct.brand}</p>
          <p className={"name"}>{this.props.selectedProduct.name}</p>
          <p className={"caption"}>Size:</p>
          <div className="size-wrapper">
             <div onClick={() => {this.setState({selectedSize: "XS"})}} className={`size ${this.state.selectedSize === "XS" ? "active" : ""}`}>XS</div>
             <div onClick={() => {this.setState({selectedSize: "S"})}} className={`size ${this.state.selectedSize === "S" ? "active" : ""}`}>S</div>
             <div onClick={() => {this.setState({selectedSize: "M"})}} className={`size ${this.state.selectedSize === "M" ? "active" : ""}`}>M</div>
             <div onClick={() => {this.setState({selectedSize: "L"})}} className={`size ${this.state.selectedSize === "L" ? "active" : ""}`}>L</div>
          </div>
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
          <button className={"add-cart-btn"}>Add to cart</button>
          <p className={"description"}>{this.props.selectedProduct.description}</p>
        </div>
      </div>
    );
  }
};
export default Product;
