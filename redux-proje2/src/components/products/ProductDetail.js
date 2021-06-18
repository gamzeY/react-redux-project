import React from "react";
import TextInput from "../toolbox/TextInput";

const ProductDetail = (categories, product, onSave, onChange) => {
  return (
    <from onSubmit={onSave}>
      <h2>{product.productID ? "Güncelle" : "Ekle"}</h2>
      <TextInput
        name="productName"
        label="Product Name"
        value={product.productName}
        onChange={onChange}
        error="error"
      />
      <button type="submit" className="btn btn-success">Save</button>
    </from>
  );
};
export default ProductDetail