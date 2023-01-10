import "./index.scss";
import React from "react";
import {State} from "../../state";

interface IAttributes {
  product: any;
  inCart?: boolean;
  selectedAttribute?: any;
  setSelectedAttribute?: any;
}

class Attributes extends React.Component <IAttributes> {
  constructor(props: any) {
    super(props);

    // Initializing the state
  }


  handleAttribute(name: string, value: any) {
    let attribute: any = this.props.selectedAttribute;
    attribute[name] = value;
    // this.setState({selectedAttribute: attribute})
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
                <div style={{cursor: !this.props.inCart? "pointer": "default"}} key={index + attribute.id} onClick={() => {
                  !this.props.inCart && this.handleAttribute(attributeName, attribute.value)
                }}
                     className={`text-attribute ${this.props.selectedAttribute[attributeName] === attribute.value ? "active" : ""}`}>{attribute.value}</div>)}
            </div>
          </div>)
        }
        let attributeName = attribute.name;
        return (<div key={attribute.name}><p  className={"caption"}>{attribute.name}:</p>
          <div className="swatch-attribute-wrapper">
            {attribute?.items?.map((attribute: any, index: any) => {
              return <div style={{cursor: !this.props.inCart? "pointer": "default"}} key={index + attribute.id} onClick={() => {
                !this.props.inCart &&  this.handleAttribute(attributeName, attribute.value)
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
    return (
      <div className={`attributes-wrapper ${this.props.inCart? "cart" : ""}`}>
        {this.getProductAttributes(this.props.product)}
      </div>
    );
  }
};


export default Attributes;
