// ✨ INSERT ✨
class factories {
  constructor(raw) {
    this.factory_cd = raw.factory_cd;
    this.factory_nm = raw.factory_nm;
  }
}
class lines {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.line_cd = raw.line_cd;
    this.line_nm = raw.line_nm;
  }
}
class process {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.proc_cd = raw.proc_cd;
    this.proc_nm = raw.proc_nm;
  }
}
class users {
  constructor(raw) {
    this.id = raw.id;
    this.group_id = raw.group_id;
    this.user_nm = raw.user_nm;
    this.pwd = raw.pwd;
    this.pwd_dev = raw.pwd_dev;
    this.email = raw.email;
    this.pwd_fg = raw.pwd_fg ? true : false;
    this.admin_fg = raw.admin_fg ? true : false;
    this.super_admin_fg = raw.super_admin_fg ? true : false;
  }
}
class equipments {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.equip_type_id = raw.equip_type_id;
    this.proc_id = raw.proc_nm;
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
class products {
  constructor(raw) {
    this.prod_no = raw.prod_no;
    this.prod_nm = raw.prod_nm;
    this.prod_gbn_id = raw.prod_gbn_id;
    this.prod_type_id = raw.prod_type_id;
    this.prod_type_small_id = raw.prod_type_small_id;
    this.unit_id = raw.unit_id;
    this.rev = raw.rev;
    this.prod_std = raw.prod_std;
    this.lot_fg = raw.lot_fg ? true : false;
    this.use_fg = raw.use_fg ? true : false;
    this.active_fg = raw.active_fg ? true : false;
    this.bom_type_id = raw.bom_type_id;
    this.width = raw.width;
    this.length = raw.length;
    this.height = raw.height;
    this.material = raw.material;
    this.color = raw.color;
    this.weight = raw.weight;
    this.thickness = raw.thickness;
    this.is_spareparts = raw.is_spareparts;
    this.mat_order_fg = raw.mat_order_fg ? true : false;
    this.mat_unit_id = raw.mat_unit_id;
    this.mat_order_min_qty = raw.mat_order_min_qty;
    this.mat_supply_days = raw.mat_supply_days;
    this.sal_order_fg = raw.sal_order_fg ? true : false;
    this.inv_use_fg = raw.inv_use_fg ? true : false;
    this.inv_unit_qty = raw.inv_unit_qty;
    this.inv_safe_qty = raw.inv_safe_qty;
    this.inv_to_store_id = raw.inv_to_store_id;
    this.inv_to_location_id = raw.inv_to_location_id;
    this.qms_receive_insp_fg = raw.qms_receive_insp_fg ? true : false;
    this.qms_proc_insp_fg = raw.qms_proc_insp_fg ? true : false;
    this.qms_final_insp_fg = raw.qms_final_insp_fg ? true : false;
    this.prd_plan_type_id = raw.prd_plan_type_id;
    this.prd_active_fg = raw.prd_active_fg ? true : false;
    this.prd_min = raw.prd_min;
    this.prd_max = raw.prd_max;
  }
}
class productsGbn {
  constructor(raw) {
    this.prod_gbn_cd = raw.prod_gbn_cd;
    this.prod_gbn_nm = raw.prod_gbn_nm;
  }
}
class productsType {
  constructor(raw) {
    this.prod_type_cd = raw.prod_type_cd;
    this.prod_type_nm = raw.prod_type_nm;
  }
}
class routings {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.line_id = raw.line_id;
    this.proc_id = raw.proc_id;
    this.prod_id = raw.prod_id;
    this.proc_no = raw.proc_no;
    this.auto_work_fg = raw.auto_work_fg ? true : false;
    this.cycle_time = raw.cycle_time;
    this.uph = raw.uph;
  }
}
class stores {
  constructor(raw) {
    this.factory_id = raw.factory_id;
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
class storeLocations {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.store_id = raw.store_id;
    this.location_cd = raw.location_cd;
    this.location_nm = raw.location_nm;
  }
}
class departments {
  constructor(raw) {
    this.dept_cd = raw.dept_cd;
    this.dept_nm = raw.dept_nm;
  }
}
class employees {
  constructor(raw) {
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
    this.worker_fg = raw.worker_fg ? true : false;
    this.remark = raw.remark;
  }
}
class grades {
  constructor(raw) {
    this.grade_cd = raw.grade_cd;
    this.grade_nm = raw.grade_nm;
  }
}
class downTimeType {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.downtime_type_cd = raw.downtime_type_cd;
    this.downtime_type_nm = raw.downtime_type_nm;
  }
}
class downTime {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.downtime_type_id = raw.downtime_type_id;
    this.downtime_cd = raw.downtime_cd;
    this.downtime_nm = raw.downtime_nm;
    this.eqm_failure_fg = raw.eqm_failure_fg ? true : false;
  }
}
class inspectionType {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.insp_item_type_cd = raw.insp_item_type_cd;
    this.insp_item_type_nm = raw.insp_item_type_nm;
  }
}
class inspectionMethod {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.insp_method_cd = raw.insp_method_cd;
    this.insp_method_nm = raw.insp_method_nm;
  }
}
class inspectionTool {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.insp_tool_cd = raw.insp_tool_cd;
    this.insp_tool_nm = raw.insp_tool_nm;
  }
}
class inspectionItem {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.insp_item_type_id = raw.insp_item_type_id;
    this.insp_item_cd = raw.insp_item_cd;
    this.insp_item_nm = raw.insp_item_nm;
    this.insp_tool_id = raw.insp_tool_id;
    this.insp_method_id = raw.insp_method_id;
    this.unit_id = raw.unit_id;
  }
}
class receives {
  constructor(raw) {
    this.receive_id = raw.receive_id;
    this.seq = raw.seq;
    this.factory_id = raw.factory_id;
    this.prod_id = raw.prod_id;
    this.unit_id = raw.unit_id;
    this.lot_no = raw.lot_no;
    this.manufactured_lot_no = raw.manufactured_lot_no;
    this.qty = raw.qty;
    this.price = raw.price;
    this.money_unit_id = raw.money_unit_id;
    this.exchange = raw.exchange;
    this.total_price = raw.total_price;
    this.unit_qty = raw.unit_qty;
    this.insp_fg = raw.insp_fg ? true : false;
    this.carry_fg = raw.carry_fg ? true : false;
    this.order_detail_id = raw.order_detail_id;
    this.to_store_id = raw.to_store_id;
    this.to_location_id = raw.to_location_id;
    this.barcode = raw.barcode;
    this.remark = raw.remark;
  }
}
class receiveDetails {
  constructor(raw) {
    this.receive_id = raw.receive_id;
    this.seq = raw.seq;
    this.factory_id = raw.factory_id;
    this.prod_id = raw.prod_id;
    this.unit_id = raw.unit_id;
    this.lot_no = raw.lot_no;
    this.manufactured_lot_no = raw.manufactured_lot_no;
    this.qty = raw.qty;
    this.price = raw.price;
    this.money_unit_id = raw.money_unit_id;
    this.exchange = raw.exchange;
    this.total_price = raw.total_price;
    this.unit_qty = raw.unit_qty;
    this.insp_fg = raw.insp_fg ? true : false;
    this.carry_fg = raw.carry_fg ? true : false;
    this.order_detail_id = raw.order_detail_id;
    this.to_store_id = raw.to_store_id;
    this.to_location_id = raw.to_location_id;
    this.barcode = raw.barcode;
    this.remark = raw.remark;
  }
}
class incomes {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.prod_id = raw.prod_id;
    this.reg_date = raw.reg_date;
    this.lot_no = raw.lot_no;
    this.qty = raw.qty;
    this.receive_detail_id = raw.receive_detail_id;
    this.to_store_id = raw.to_store_id;
    this.to_location_id = raw.to_location_id;
    this.income_uid = raw.income_uid;
    this.remark = raw.remark;
    this.barcode = raw.barcode;
  }
}
class partnerType {
  constructor(raw) {
    this.partner_type_cd = raw.partner_type_cd;
    this.partner_type_nm = raw.partner_type_nm;
  }
}
class partner {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.partner_cd = raw.partner_cd;
    this.partner_nm = raw.partner_nm;
    this.partner_type_id = raw.partner_type_id;
    this.partner_no = raw.partner_no;
    this.boss_nm = raw.boss_nm;
    this.manager = raw.manager;
    this.email = raw.email;
    this.tel = raw.tel;
    this.fax = raw.fax;
    this.post = raw.post;
    this.addr = raw.addr;
    this.addr_detail = raw.addr_detail;
    this.use_fg = raw.use_fg ? true : false;
    this.vendor_fg = raw.vendor_fg ? true : false;
    this.customer_fg = raw.customer_fg ? true : false;
    this.remark = raw.remark;
  }
}
class model {
  constructor(raw) {
    this.model_cd = raw.model_cd;
    this.model_nm = raw.model_nm;
  }
}

function GetPostParams(componentName, raw) {
  let params = "";

  switch (componentName) {
    case "FactorySet":
      params = new factories(raw);
      break;
    case "LineSet":
      params = new lines(raw);
      break;
    case "Process":
      params = new process(raw);
      break;
    case "User":
      params = new users(raw);
      break;
    case "EquipmentSet":
      params = new equipments(raw);
      break;
    case "Product":
      params = new products(raw);
      break;
    case "ProductGbn":
      params = new productsGbn(raw);
      break;
    case "ProductType":
      params = new productsType(raw);
      break;
    case "Routing":
      params = new routings(raw);
      break;
    case "Store":
      params = new stores(raw);
      break;
    case "StoreLocations":
      params = new storeLocations(raw);
      break;
    case "Department":
      params = new departments(raw);
      break;
    case "Employee":
      params = new employees(raw);
      break;
    case "Grade":
      params = new grades(raw);
      break;
    case "DownTimeType":
      params = new downTimeType(raw);
      break;
    case "DownTime":
      params = new downTime(raw);
      break;
    case "InspectionType":
      params = new inspectionType(raw);
      break;
    case "InspectionMethod":
      params = new inspectionMethod(raw);
      break;
    case "InspectionTool":
      params = new inspectionTool(raw);
      break;
    case "InspectionItem":
      params = new inspectionItem(raw);
      break;
    case "Receive":
      params = new receives(raw);
      break;
    case "ReceiveDetail":
      params = new receiveDetails(raw);
      break;
    case "Income":
      params = new incomes(raw);
      break;
    case "PartnerType":
      params = new partnerType(raw);
      break;
    case "Partner":
      params = new partner(raw);
      break;
    case "Model":
      params = new model(raw);
      break;
    default:
  }
  return params;
}

export default GetPostParams;
