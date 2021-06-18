import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cardActions from "../../redux/actions/cartActions";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Badge
} from "reactstrap";
import {Link} from "react-router-dom";
import alertify from 'alertifyjs';

class CartSummery extends Component {
  removeFromCart(product) {
    this.props.removeFromCart(product);
    alertify.error(product.name + " deleted")
  }
  renderEmpty() {
    return (
      <NavItem>
        <NavLink >Cart Empty</NavLink>
      </NavItem>
    );
  }
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Your Cart
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map(cartItem => (
            <DropdownItem key={cartItem.product.productID}>
              <Badge  color="danger" size="sm" onClick={()=> this.removeFromCart(cartItem.product)}>x</Badge>
              {cartItem.product.name}
              <Badge  color="success" size="sm">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}

          <DropdownItem divider />
          <DropdownItem><Link to={"/cart"}>Go-Cart</Link></DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
      </div>
    );
  }
}
function mapDispatchToProps(dispatch){
    return{
        removeFromCart: bindActionCreators(cardActions.removeFromCart, dispatch)
    }
}
function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(CartSummery);
