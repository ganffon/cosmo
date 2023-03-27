import FactorySet from "pages/gridSetting/FactorySet";
import EquipmentSet from "pages/gridSetting/EquipmentSet";
import LineSet from "pages/gridSetting/LineSet";
import ProcessSet from "pages/gridSetting/ProcessSet";
import ProductGbnSet from "pages/gridSetting/ProductGbnSet";
import ProductSet from "pages/gridSetting/ProductSet";
import ProductTypeSet from "pages/gridSetting/ProductTypeSet";
import RoutingSet from "pages/gridSetting/RoutingSet";

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
    case "RoutingSet":
      component = RoutingSet;
      break;
    default:
  }
  return component;
};

export default GetComponent;
