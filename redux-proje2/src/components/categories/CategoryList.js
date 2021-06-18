import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productsActions";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }
  selectCategories = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.categoryID);
    console.log(category.categoryID);
  };
  render() {
    console.log(this.props.categories);
    return (
      <div>
        <h3>Categories</h3>

        <ListGroup>
          {this.props.categories.map((category) => (
            <ListGroupItem
              active={
                category.categoryID === this.props.currentCategory.categoryID
              }
              onClick={() => this.selectCategories(category)}
              key={category.categoryID}
            >
              {category.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
