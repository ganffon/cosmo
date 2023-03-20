class lines {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.line_id = raw.line_id;
    this.line_cd = raw.line_cd;
    this.line_nm = raw.line_nm;
  }
}
function GetPutParams(componentName, raw) {
  let params = "";

  switch (componentName) {
    //   case "Factory":
    //     params = new factories(raw);
    //     break;
    case "LineSet":
      params = new lines(raw);
      break;
    //   case "Process":
    //     params = new process(raw);
    //     break;
    //   case "User":
    //     params = new users(raw);
    //     break;
    //   case "Equipment":
    //     params = new equipments(raw);
    //     break;
    //   case "Product":
    //     params = new products(raw);
    //     break;
    //   case "ProductGbn":
    //     params = new productsGbn(raw);
    //     break;
    //   case "ProductType":
    //     params = new productsType(raw);
    //     break;
    //   case "Routing":
    //     params = new routings(raw);
    //     break;
    //   case "Store":
    //     params = new stores(raw);
    //     break;
    //   case "StoreLocations":
    //     params = new storeLocations(raw);
    //     break;
    //   case "Department":
    //     params = new departments(raw);
    //     break;
    //   case "Employee":
    //     params = new employees(raw);
    //     break;
    //   case "Grade":
    //     params = new grades(raw);
    //     break;
    //   case "DownTimeType":
    //     params = new downTimeType(raw);
    //     break;
    //   case "DownTime":
    //     params = new downTime(raw);
    //     break;
    //   case "InspectionType":
    //     params = new inspectionType(raw);
    //     break;
    //   case "InspectionMethod":
    //     params = new inspectionMethod(raw);
    //     break;
    //   case "InspectionTool":
    //     params = new inspectionTool(raw);
    //     break;
    //   case "InspectionItem":
    //     params = new inspectionItem(raw);
    //     break;
    //   case "Receive":
    //     params = new receives(raw);
    //     break;
    //   case "ReceiveDetail":
    //     params = new receiveDetails(raw);
    //     break;
    //   case "Income":
    //     params = new incomes(raw);
    //     break;
    //   case "PartnerType":
    //     params = new partnerType(raw);
    //     break;
    //   case "Partner":
    //     params = new partner(raw);
    //     break;
    //   case "Model":
    //     params = new model(raw);
    //     break;
    default:
  }

  return JSON.stringify(params);
}

export default GetPutParams;
