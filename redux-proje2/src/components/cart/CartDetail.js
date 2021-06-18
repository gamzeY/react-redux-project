import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cardActions from "../../redux/actions/cartActions";
import { Table, Button } from "reactstrap";
import alertify from 'alertifyjs';

class CartDetail extends Component {
  removeFromCart(product) {
    this.props.removeFromCart(product);
    alertify.error(product.name + " deleted")
  }
  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map((cartItem) => (
              <tr key={cartItem.product.productID}>
                <th scope="row">{cartItem.product.productID}</th>
                <td>{cartItem.product.name}</td>
                <td>{cartItem.product.unitPrice}</td>
                <td>{cartItem.quantity}</td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => this.removeFromCart(cartItem.product)}
                  >
                    delete
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
function mapDispatchToProps(dispatch) {
  return {
    removeFromCart: bindActionCreators(cardActions.removeFromCart, dispatch),
  };
}
function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
