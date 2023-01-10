import "./index.scss";
import React from "react";

interface IAttributes {
  product: any;
  inCart?: boolean
}

class Attributes extends React.Component <IAttributes, { selectedAttribute: any}> {
  constructor(props: any) {
    super(props);

    // Initializing the state
    this.state = {selectedAttribute: {},};
  }


  handleAttribute(name: string, value: any) {
    let attribute: any = this.state.selectedAttribute;
    attribute[name] = value;
    this.setState({selectedAttribute: attribute})
  }

  getProductAttributes(selectedProduct: any) {
    let attribute;
    if (selectedProduct.attributes)
      attribute = selectedProduct.attributes.map((attribute: any) => {
        if (attribute.type === "text") {
          let attributeName = attribute.name;
          return (<><p className={"caption"}>{attribute.name}:</p>
            <div className="text-attribute-wrapper">
              {attribute?.items?.map((attribute: any, index: any) =>
                <div key={index + attribute.id} onClick={() => {
                  this.handleAttribute(attributeName, attribute.value)
                }}
                     className={`text-attribute ${this.state.selectedAttribute[attributeName] === attribute.value ? "active" : ""}`}>{attribute.value}</div>)}
            </div>
          </>)
        } else if (attribute.type === "swatch") {
          let attributeName = attribute.name;
          return (<><p className={"caption"}>{attribute.name}:</p>
            <div className="swatch-attribute-wrapper">
              {attribute?.items?.map((attribute: any, index: any) => {
                return <div key={index + attribute.id} onClick={() => {
                  this.handleAttribute(attributeName, attribute.value)
                }}
                            className={`border ${this.state.selectedAttribute[attributeName] === attribute.value ? "active" : ""}`}>
                  <div style={{background: attribute.value}} className={"swatch-attribute"}></div>
                </div>
              })}
            </div>
          </>)
        }
        return <></>
      });
    return attribute
  }

  render() {
    return (
      <div className={`attributes-wrapper ${this.props.inCart? "cart" : ""}`}>
        {this.getProductAttributes(this.props.product)}
      </div>
    );
  }
};


export default Attributes;
