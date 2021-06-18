import * as actionTypes from "./actionTypes";

export function getProductsSucces(products) {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function createProductSucess(product) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product };
}
export function updateProductSucess(product) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCESS, payload: product };
}

export function saveProduct(product) {
  return fetch("http://localhost:3000/products/ "+(product.id),{
    method: product.id?"PUT":"POST",
    headers: {"content-type":"application/json"},
    body:JSON.stringify(product)
  }).then(handleResponse).catch(handleError);
}
export function save(product){
  return function (dispatch) {
    return saveProduct(product).then(saveProduct=>{
      product.productId?dispatch(updateProductSucess(saveProduct)):dispatch(createProductSucess(saveProduct))
    }).catch(error =>{throw error})
  }
}
export function getProducts(categoryID) {
  return function (dispatch) {
    let url = "http://localhost:3000/products";
    console.log(categoryID);
    if (categoryID) {
      url = url + "?categoryID=" + categoryID;
    }
    console.log(url);
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getProductsSucces(result)));
  };
}
export async function handleResponse(response){
  if(response.ok){
    return response.json()
  }
  const error = await response.text()
  throw new Error(error);
}
export function handleError(error){
  console.error("error 404")
  throw error;
}