// ✨ ComboBox ✨
class process {
  constructor(raw) {
    this.text = raw.proc_nm;
    this.value = raw.proc_id;
  }
}
class ProductGbn {
  constructor(raw) {
    this.text = raw.prod_gbn_nm;
    this.value = raw.prod_gbn_id;
  }
}
class productModel {
  constructor(raw) {
    this.text = raw.model_nm;
    this.value = raw.model_id;
  }
}
class productType {
  constructor(raw) {
    this.text = raw.prod_type_nm;
    this.value = raw.prod_type_id;
  }
}
class productTypeSmall {
  constructor(raw) {
    this.text = raw.prod_type_small_nm;
    this.value = raw.prod_type_small_id;
  }
}

function GetComboParams(componentName, raw) {
  let params = "";
  switch (componentName) {
    case "ProcessSet":
      params = new process(raw);
      break;
    case "ProductGbnSet":
      params = new ProductGbn(raw);
      break;
    case "productModelSet":
      params = new productModel(raw);
      break;
    case "productTypeSet":
      params = new productType(raw);
      break;
    case "productTypeSmallSet":
      params = new productTypeSmall(raw);
      break;
    default:
  }
  return params;
}

export default GetComboParams;
