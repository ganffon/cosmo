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
class user {
  constructor(raw) {
    this.uid = raw.uid;
    this.id = raw.id;
    this.group_id = raw.group_id;
    this.user_nm = raw.user_nm;
    this.pwd = raw.pwd;
    this.email = raw.email;
    this.pwd_fg = raw.pwd_fg ? true : false;
    this.admin_fg = raw.admin_fg ? true : false;
    this.super_admin_fg = raw.super_admin_fg ? true : false;
  }
}
class employee {
  constructor(raw) {
    this.emp_id = raw.emp_id;
    this.emp_cd = raw.emp_cd;
    this.emp_nm = raw.emp_nm;
    this.uid = raw.uid;
    this.dept_id = raw.dept_id;
    this.grade_id = raw.grade_id;
    this.worker_group_id = raw.worker_group_id;
    this.birthday = raw.birthday;
    this.hp = raw.hp;
    this.post = raw.post;
    this.addr = raw.addr;
    this.addr_detail = raw.addr_detail;
    this.enter_date = raw.enter_date;
    this.leave_date = raw.leave_date;
    this.use_fg = raw.use_fg ? true : false;
    this.worker_fg = raw.worker_fg ? true : false;
    this.remark = raw.remark;
  }
}
class equipment {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.proc_id = raw.proc_id;
    this.equip_id = raw.equip_id;
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
class unit {
  constructor(raw) {
    this.unit_id = raw.unit_id;
    this.unit_cd = raw.unit_cd;
    this.unit_nm = raw.unit_nm;
  }
}
class workingGroup {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.worker_group_id = raw.worker_group_id;
    this.worker_group_cd = raw.worker_group_cd;
    this.worker_group_nm = raw.worker_group_nm;
  }
}
class product {
  constructor(raw) {
    this.prod_id = raw.prod_id;
    this.prod_no = raw.prod_no;
    this.prod_nm = raw.prod_nm;
    this.prod_gbn_id = raw.prod_gbn_id;
    this.model_id = raw.model_id;
    this.prod_type_id = raw.prod_type_id;
    this.prod_type_small_id = raw.prod_type_small_id;
    this.unit_id = raw.unit_id;
    this.rev = raw.rev;
    this.prod_std = raw.prod_std;
    this.lot_fg = raw.lot_fg ? true : false;
    this.use_fg = raw.use_fg ? true : false;
    this.active_fg = raw.active_fg ? true : false;
    this.bom_type_id = raw.bom_type_id;
    this.width = Number(raw.width);
    this.length = Number(raw.length);
    this.height = Number(raw.height);
    this.material = raw.material;
    this.color = raw.color;
    this.weight = Number(raw.weight);
    this.thickness = Number(raw.thickness);
    this.is_spareparts = raw.is_spareparts ? true : false;
    this.mat_order_fg = raw.mat_order_fg ? true : false;
    this.mat_unit_id = raw.mat_unit_id;
    this.mat_order_min_qty = Number(raw.mat_order_min_qty);
    this.mat_supply_days = Number(raw.mat_supply_days);
    this.sal_order_fg = raw.sal_order_fg ? true : false;
    this.inv_use_fg = raw.inv_use_fg ? true : false;
    this.inv_unit_qty = Number(raw.inv_unit_qty);
    this.inv_safe_qty = Number(raw.inv_safe_qty);
    this.inv_to_store_id = raw.inv_to_store_id;
    this.inv_to_location_id = raw.inv_to_location_id;
    this.qms_receive_insp_fg = raw.qms_receive_insp_fg ? true : false;
    this.qms_proc_insp_fg = raw.qms_proc_insp_fg ? true : false;
    this.qms_final_insp_fg = raw.qms_final_insp_fg ? true : false;
    this.prd_plan_type_id = raw.prd_plan_type_id;
    this.prd_active_fg = raw.prd_active_fg ? true : false;
    this.prd_min = Number(raw.prd_min);
    this.prd_max = Number(raw.prd_max);
  }
}
class productTypeSmall {
  constructor(raw) {
    this.prod_type_small_id = raw.prod_type_small_id;
    this.prod_type_small_cd = raw.prod_type_small_cd;
    this.prod_type_small_nm = raw.prod_type_small_nm;
  }
}
class store {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.store_id = raw.store_id;
    this.store_cd = raw.store_cd;
    this.store_nm = raw.store_nm;
    this.reject_store_fg = raw.reject_store_fg ? true : false;
    this.return_store_fg = raw.return_store_fg ? true : false;
    this.outgo_store_fg = raw.outgo_store_fg ? true : false;
    this.final_insp_store_fg = raw.final_insp_store_fg ? true : false;
    this.outsourcing_store_fg = raw.outsourcing_store_fg ? true : false;
    this.available_store_fg = raw.available_store_fg ? true : false;
    this.position_type = raw.position_type;
  }
}
class storeLocation {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.store_id = raw.store_id;
    this.location_id = raw.location_id;
    this.location_cd = raw.location_cd;
    this.location_nm = raw.location_nm;
  }
}

class downtimeType {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.downtime_type_id = raw.downtime_type_id;
    this.downtime_type_cd = raw.downtime_type_cd;
    this.downtime_type_nm = raw.downtime_type_nm;
  }
}
class downtime {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.downtime_type_id = raw.downtime_type_id;
    this.downtime_id = raw.downtime_id;
    this.downtime_cd = raw.downtime_cd;
    this.downtime_nm = raw.downtime_nm;
    this.eqm_failure_fg = raw.eqm_failure_fg ? true : false;
  }
}
class inspectFiling {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.insp_filing_id = raw.insp_filing_id;
    this.insp_filing_cd = raw.insp_filing_cd;
    this.insp_filing_nm = raw.insp_filing_nm;
  }
}
class inspectMethod {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.insp_method_id = raw.insp_method_id;
    this.insp_method_cd = raw.insp_method_cd;
    this.insp_method_nm = raw.insp_method_nm;
  }
}
class inspectTool {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.insp_tool_id = raw.insp_tool_id;
    this.insp_tool_cd = raw.insp_tool_cd;
    this.insp_tool_nm = raw.insp_tool_nm;
  }
}
class inspectType {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.insp_item_type_id = raw.insp_item_type_id;
    this.insp_item_type_cd = raw.insp_item_type_cd;
    this.insp_item_type_nm = raw.insp_item_type_nm;
  }
}
class inspectItem {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.insp_item_type_id = raw.insp_item_type_id;
    this.insp_item_id = raw.insp_item_id;
    this.insp_item_cd = raw.insp_item_cd;
    this.insp_item_nm = raw.insp_item_nm;
    this.insp_tool_id = raw.insp_tool_id;
    this.insp_method_id = raw.insp_method_id;
    this.unit_id = raw.unit_id;
  }
}
class interfaceItemType {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.infc_item_type_id = raw.infc_item_type_id;
    this.infc_item_type_cd = raw.infc_item_type_cd;
    this.infc_item_type_nm = raw.infc_item_type_nm;
  }
}
class interfaceItem {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.infc_item_type_id = raw.infc_item_type_id;
    this.infc_item_id = raw.infc_item_id;
    this.infc_item_cd = raw.infc_item_cd;
    this.infc_item_nm = raw.infc_item_nm;
  }
}
class interfaceMemory {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.infc_memory_id = raw.infc_memory_id;
    this.infc_item_type_id = raw.infc_item_type_id;
    this.infc_item_id = raw.infc_item_id;
    this.line_id = raw.line_id;
    this.proc_id = raw.proc_id;
    this.equip_id = raw.equip_id;
    this.plc_ip = raw.plc_ip;
    this.plc_port = Number(raw.plc_port);
    this.device_addre = raw.device_addre;
    this.tag_id = raw.tag_id;
    this.infc_memory_nm = raw.infc_memory_nm;
    this.remark = raw.remark;
  }
}
class equipmentLarge {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.classification_id = raw.classification_id;
    this.classification_cd = raw.classification_cd;
    this.classification_nm = raw.classification_nm;
  }
}
class equipmentMedium {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.group_id = raw.group_id;
    this.group_cd = raw.group_cd;
    this.group_nm = raw.group_nm;
  }
}
class equipmentSmall {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.class_id = raw.class_id;
    this.class_cd = raw.class_cd;
    this.class_nm = raw.class_nm;
  }
}
class equipmentDetail {
  constructor(raw) {
    this.eqm_detail_id = raw.eqm_detail_id;
    this.factory_id = raw.factory_id;
    this.proc_id = raw.proc_id;
    this.equip_id = raw.equip_id;
    this.eqm_detail_cd = raw.eqm_detail_cd;
    this.eqm_detail_nm = raw.eqm_detail_nm;
    this.classification_id = raw.classification_id;
    this.group_id = raw.group_id;
    this.class_id = raw.class_id;
    this.manager_emp_id = raw.manager_emp_id;
    this.sub_manager_emp_id = raw.sub_manager_emp_id;
    this.equip_no = raw.equip_no;
    this.equip_grade = raw.equip_grade;
    this.equip_model = raw.equip_model;
    this.equip_std = raw.equip_std;
    this.equip_spec = raw.equip_spec;
    this.voltage = raw.voltage;
    this.manufacturer = raw.manufacturer;
    this.purchase_partner = raw.purchase_partner;
    this.purchase_date = raw.purchase_date;
    this.purchase_tel = raw.purchase_tel;
    this.purchase_price = Number(raw.purchase_price);
    this.use_fg = raw.use_fg ? true : false;
    this.remark = raw.remark;
  }
}

/**
 * @param {string} componentName 소문자로 시작
 * @param {any} raw 처리 할 데이터
 * @returns
 */
function GetPutParams(componentName, raw) {
  let params = "";

  switch (componentName) {
    case "factory":
      params = new factory(raw);
      break;
    case "line":
      params = new line(raw);
      break;
    case "user":
      params = new user(raw);
      break;
    case "employee":
      params = new employee(raw);
      break;
    case "equipment":
      params = new equipment(raw);
      break;
    case "unit":
      params = new unit(raw);
      break;
    case "workingGroup":
      params = new workingGroup(raw);
      break;
    case "product":
      params = new product(raw);
      break;
    case "productTypeSmall":
      params = new productTypeSmall(raw);
      break;
    case "store":
      params = new store(raw);
      break;
    case "storeLocation":
      params = new storeLocation(raw);
      break;
    case "downtimeType":
      params = new downtimeType(raw);
      break;
    case "downtime":
      params = new downtime(raw);
      break;
    case "inspectFiling":
      params = new inspectFiling(raw);
      break;
    case "inspectMethod":
      params = new inspectMethod(raw);
      break;
    case "inspectTool":
      params = new inspectTool(raw);
      break;
    case "inspectType":
      params = new inspectType(raw);
      break;
    case "inspectItem":
      params = new inspectItem(raw);
      break;
    case "interfaceItemType":
      params = new interfaceItemType(raw);
      break;
    case "interfaceItem":
      params = new interfaceItem(raw);
      break;
    case "interfaceMemory":
      params = new interfaceMemory(raw);
      break;
    case "equipmentLarge":
      params = new equipmentLarge(raw);
      break;
    case "equipmentMedium":
      params = new equipmentMedium(raw);
      break;
    case "equipmentSmall":
      params = new equipmentSmall(raw);
      break;
    case "equipmentDetail":
      params = new equipmentDetail(raw);
      break;
    default:
  }
  return params;
}

export default GetPutParams;
