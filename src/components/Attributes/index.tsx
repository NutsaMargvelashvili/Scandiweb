import "./index.scss";
import React from "react";

interface IAttributes {
  product: any;
  inCart?: boolean;
  selectedAttribute?: any;
  setSelectedAttribute?: any;
}

class Attributes extends React.Component <IAttributes> {
  componentDidUpdate(prevProps: Readonly<IAttributes>, prevState: Readonly<{}>, snapshot?: any) {
    if (this.props.product.attributes !== prevProps.product.attributes) {
      this.selectDefaultAttribute()
    }
  }

  selectDefaultAttribute() {
    this.props.product.attributes && this.props.product.attributes.map((attribute: any) => {
      if (!this.props.inCart && !this.props.selectedAttribute[attribute.name]) {
        this.handleAttribute(attribute.name, attribute?.items[0].value)
      }
    })
  }

  handleAttribute(name: string, value: any) {
    let attribute: any = this.props.selectedAttribute;
    attribute[name] = value;
    this.props.setSelectedAttribute(attribute)
  }

  getProductAttributes(selectedProduct: any) {
    let attribute;
    if (selectedProduct.attributes)
      attribute = selectedProduct.attributes.map((attribute: any) => {
        if (attribute.type === "text") {
          let attributeName = attribute.name;
          return (<div key={attribute.name}><p className={"caption"}>{attribute.name}:</p>
            <div className="text-attribute-wrapper">
              {attribute?.items?.map((attribute: any, index: any) =>
                <div style={{cursor: !this.props.inCart ? "pointer" : "default"}} key={index + attribute.id}
                     onClick={() => {
                       !this.props.inCart && this.handleAttribute(attributeName, attribute.value)
                     }}
                     className={`text-attribute ${this.props.selectedAttribute[attributeName] === attribute.value ? "active" : ""}`}>{attribute.value}</div>)}
            </div>
          </div>)
        }
        let attributeName = attribute.name;
        return (<div key={attribute.name}><p className={"caption"}>{attribute.name}:</p>
          <div className="swatch-attribute-wrapper">
            {attribute?.items?.map((attribute: any, index: any) => {
              return <div style={{cursor: !this.props.inCart ? "pointer" : "default"}} key={index + attribute.id}
                          onClick={() => {
                            !this.props.inCart && this.handleAttribute(attributeName, attribute.value)
                          }}
                          className={`border ${this.props.selectedAttribute[attributeName] === attribute.value ? "active" : ""}`}>
                <div style={{background: attribute.value}} className={"swatch-attribute"}></div>
              </div>
            })}
          </div>
        </div>)

      });
    return attribute
  }

  render() {
    let productAttributes = this.getProductAttributes(this.props.product);
    return (
      <div className={`attributes-wrapper ${this.props.inCart ? "cart" : ""}`}>
        {productAttributes}
      </div>
    );
  }
};


export default Attributes;
