import * as actionTypes from "./actionTypes";

export function changeCategory(category) {
  return { type: actionTypes.CHANGE_CATEGORY, payload: category };
}
export function getCategoriesSucces(categories){
  console.log(categories);
    return { type: actionTypes.GET_CATEGORIES_SUCCESS, payload: categories };
}
export function getCategories() {
  return function (dispatch) {
    let url = "http://localhost:3000/categorys";
    return fetch(url)
      .then((r) => r.json())
      .then((result) => dispatch(getCategoriesSucces(result)));
  };
}
