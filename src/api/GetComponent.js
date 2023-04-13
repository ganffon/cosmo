import FactorySet from "pages/mes/standard/factory/FactorySet";
import EquipmentSet from "pages/mes/standard/equipment/EquipmentSet";
import LineSet from "pages/mes/standard/line/LineSet";
import ProcessSet from "pages/mes/standard/process/ProcessSet";
import ProductGbnSet from "pages/mes/standard/productGbn/ProductGbnSet";
import ProductSet from "pages/mes/standard/product/ProductSet";
import ProductTypeSet from "pages/mes/standard/productType/ProductTypeSet";

const GetComponent = (componentName) => {
  let component = "";
  switch (componentName) {
    case "FactorySet":
      component = FactorySet;
      break;
    case "EquipmentSet":
      component = EquipmentSet;
      break;
    case "LineSet":
      component = LineSet;
      break;
    case "ProcessSet":
      component = ProcessSet;
      break;
    case "ProductGbnSet":
      component = ProductGbnSet;
      break;
    case "ProductSet":
      component = ProductSet;
      break;
    case "ProductTypeSet":
      component = ProductTypeSet;
      break;
    default:
  }
  return component;
};

export default GetComponent;
