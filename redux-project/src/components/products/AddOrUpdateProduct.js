import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProductDetail from "./ProductDetail";
import {getCategories} from "../../redux/actions/categoryActions"
import {saveProduct} from "../../redux/actions/productsActions"

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product });
  }, [props.product]);
  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));
  }
  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(() => {
      history.push("/");
    });
  }
  return(
    <ProductDetail product={product} categories={categories} onChange={handleChange} onSave={handleSave}></ProductDetail>
  )
}
  export function getProductById(products, productId) {
    let product = products.find(product => product.id===productId)||null;
    return product;
  }
  function mapStateToProps(state, ownProps) {
    const productId = ownProps.match.params.productId;
    const product =
      productId && state.productReducer.length > 0
        ? getProductById(state.productReducer, productId)
        : {};
    return {
      product,
      products: state.productReducer,
      categories: state.categoryReducer
    }
  };

  const mapDistpatchToProps = {
    getCategories,
    saveProduct
  }

export default connect(mapDistpatchToProps,mapStateToProps)(AddOrUpdateProduct);
