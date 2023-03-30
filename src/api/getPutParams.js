// ✨ UPDATE ✨
class factory {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.factory_cd = raw.factory_cd;
    this.factory_nm = raw.factory_nm;
  }
}
class line {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.line_id = raw.line_id;
    this.line_cd = raw.line_cd;
    this.line_nm = raw.line_nm;
  }
}
class equipment {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.equip_id = raw.equip_id;
    this.proc_id = raw.proc_id;
    this.equip_type_id = raw.equip_type_id;
    this.equip_cd = raw.equip_cd;
    this.equip_nm = raw.equip_nm;
    this.workings_id = raw.workings_id;
    this.manager_emp_id = raw.manager_emp_id;
    this.sub_manager_emp_id = raw.sub_manager_emp_id;
    this.use_fg = raw.use_fg ? true : false;
    this.prd_fg = raw.prd_fg ? true : false;
    this.remark = raw.remark;
  }
}
function GetPutParams(componentName, raw) {
  let params = "";

  switch (componentName) {
    case "FactorySet":
      params = new factory(raw);
      break;
    case "LineSet":
      params = new line(raw);
      break;
    case "EquipmentSet":
      params = new equipment(raw);
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
  // console.log(params);
  return params;
}

export default GetPutParams;
