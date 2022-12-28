import "./index.scss";
import React from "react";
import {getCategories} from "../../GQL";
import {Link} from "react-router-dom";

// import { match } from 'react-router-dom';
// interface DetailsProps {
//   required: string;
//   match?: match<DetailParams>;
// }

interface ICategory {
  selectedCategory: string;
}
class Category extends React.Component<ICategory, {categoryName: string, products: any}> {
  constructor(props: any) {
    super(props);

    // Initializing the state
    this.state = { categoryName: "Category Name", products: []  };
  }

  componentDidMount() {

    // console.log('Props:', this.props.match)
    // const { match } = this.props;
    // console.log(match.params.id)
    // console.log(this.props.products, "prooood")
  }

  componentDidUpdate(prevProps: any, prevState:any) {
    // Typical usage (don't forget to compare props):
    if (this.props.selectedCategory !== prevProps.selectedCategory) {
      // console.log(this.props.products, "prooood")
      let selectedCategoryProducts;
      getCategories().then((value) => {
        selectedCategoryProducts = value.find((category:any)=> {return category.name === this.props.selectedCategory});
        this.setState({products: selectedCategoryProducts})

      })
        .catch((e) => {
          console.error(e); // "oh, no!"
        })
    }
  }
  render() {

    return (
      <div className="category-wrapper">
        <div className="category-name">{this.props.selectedCategory}</div>
        <div className="products-wrapper">
          {(this.state.products.products && this.state.products.products.length)  ? (this.state.products.products.map((product: any, index: any) => (
            <div className={`product ${!product.inStock ? "out-of-stock" : ""}`} key={product.name + index}>
              <div className="product-image">
                {!product.inStock && <span>out of stock</span>}
                <img src={product.gallery[0]} alt={product.name }/>
              </div>
              <p className={"product-name"}>{product.name}</p>
              <p className={"product-price"}>{product.prices[0].currency.symbol + product.prices[0].amount}</p>
            </div>
          ))) : ""}
        </div>
      </div>
    );
  }
};
export default Category;
