// ✨ ComboBox ✨
class process {
  constructor(raw) {
    this.text = raw.proc_nm;
    this.value = raw.proc_id;
  }
}
class productGbn {
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
class unit {
  constructor(raw) {
    this.text = raw.unit_nm;
    this.value = raw.unit_id;
  }
}

function GetComboParams(componentName, raw) {
  let params = "";
  switch (componentName) {
    case "process":
      params = new process(raw);
      break;
    case "productGbn":
      params = new productGbn(raw);
      break;
    case "productModel":
      params = new productModel(raw);
      break;
    case "productType":
      params = new productType(raw);
      break;
    case "productTypeSmall":
      params = new productTypeSmall(raw);
      break;
    case "unit":
      params = new unit(raw);
      break;
    default:
  }
  return params;
}

export default GetComboParams;
