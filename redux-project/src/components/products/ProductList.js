import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productsActions";
import { Table } from "reactstrap";
import * as cardActions from "../../redux/actions/cartActions";
import { Button } from "reactstrap";
import alertify from 'alertifyjs';
import {Link} from "react-router-dom"
class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
  }
  addToCart =(product) =>{
    this.props.actions.addToCart({quantity:1,product})
    alertify.success(product.name + " added")
  }
  render() {
    return (
      <div>
        <h3>
          Products
        </h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity Per Unit</th>
              <th>Units In Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.productID}>
                <th scope="row">{product.productID}</th>
                <td><Link to={"/saveproudct/"+product.id}>{product.name}</Link></td>
                <td>{product.unitPrice}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
                <td>
                  <Button color="success" onClick={()=>this.addToCart(product)}>
                    Add
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cardActions.addToCart, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
