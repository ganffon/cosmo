// ✨ INSERT ✨

class factory {
  constructor(raw) {
    this.factory_cd = raw.factory_cd;
    this.factory_nm = raw.factory_nm;
  }
}
class user {
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
class equipment {
  constructor(raw, factory_id) {
    this.factory_id = factory_id;
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
class product {
  constructor(raw, factory_id) {
    this.factory_id = factory_id;
    this.prod_no = raw.prod_no;
    this.prod_nm = raw.prod_nm;
    this.prod_gbn_id = raw.prod_gbn_nm;
    this.model_id = raw.model_nm;
    this.prod_type_id = raw.prod_type_nm;
    this.prod_type_small_id = raw.prod_type_small_nm;
    this.unit_id = raw.unit_nm;
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
class productGbn {
  constructor(raw) {
    this.prod_gbn_cd = raw.prod_gbn_cd;
    this.prod_gbn_nm = raw.prod_gbn_nm;
  }
}
class productType {
  constructor(raw) {
    this.prod_type_cd = raw.prod_type_cd;
    this.prod_type_nm = raw.prod_type_nm;
  }
}
class routing {
  constructor(raw, factory_id) {
    this.factory_id = factory_id;
    this.line_id = raw.line_id;
    this.proc_id = raw.proc_id;
    this.prod_id = raw.prod_id;
    this.proc_no = raw.proc_no;
    this.auto_work_fg = raw.auto_work_fg ? true : false;
    this.cycle_time = raw.cycle_time;
    this.uph = raw.uph;
  }
}
class store {
  constructor(raw, factory_id) {
    this.factory_id = factory_id;
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
  constructor(raw, factory_id) {
    this.factory_id = factory_id;
    this.store_id = raw.store_id;
    this.location_cd = raw.location_cd;
    this.location_nm = raw.location_nm;
  }
}
class department {
  constructor(raw) {
    this.dept_cd = raw.dept_cd;
    this.dept_nm = raw.dept_nm;
  }
}
class employee {
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
class grade {
  constructor(raw) {
    this.grade_cd = raw.grade_cd;
    this.grade_nm = raw.grade_nm;
  }
}
class downtimeType {
  constructor(raw, factory_id) {
    this.factory_id = factory_id;
    this.downtime_type_cd = raw.downtime_type_cd;
    this.downtime_type_nm = raw.downtime_type_nm;
  }
}
class downTime {
  constructor(raw, factory_id) {
    this.factory_id = factory_id;
    this.downtime_type_id = raw.downtime_type_id;
    this.downtime_cd = raw.downtime_cd;
    this.downtime_nm = raw.downtime_nm;
    this.eqm_failure_fg = raw.eqm_failure_fg ? true : false;
  }
}
class model {
  constructor(raw) {
    this.model_cd = raw.model_cd;
    this.model_nm = raw.model_nm;
  }
}
class unit {
  constructor(raw) {
    this.unit_cd = raw.unit_cd;
    this.unit_nm = raw.unit_nm;
  }
}
class workingGroup {
  constructor(raw, factory_id) {
    this.factory_id = factory_id;
    this.worker_group_cd = raw.worker_group_cd;
    this.worker_group_nm = raw.worker_group_nm;
  }
}
class inspectFiling {
  constructor(raw, factory_id) {
    this.factory_id = factory_id;
    this.insp_filing_cd = raw.insp_filing_cd;
    this.insp_filing_nm = raw.insp_filing_nm;
  }
}
class inspectMethod {
  constructor(raw, factory_id) {
    this.factory_id = factory_id;
    this.insp_method_cd = raw.insp_method_cd;
    this.insp_method_nm = raw.insp_method_nm;
  }
}
class inspectTool {
  constructor(raw, factory_id) {
    this.factory_id = factory_id;
    this.insp_tool_cd = raw.insp_tool_cd;
    this.insp_tool_nm = raw.insp_tool_nm;
  }
}
class inspectType {
  constructor(raw, factory_id) {
    this.factory_id = factory_id;
    this.insp_item_type_cd = raw.insp_item_type_cd;
    this.insp_item_type_nm = raw.insp_item_type_nm;
  }
}
class interfaceItemType {
  constructor(raw, factory_id) {
    this.factory_id = factory_id;
    this.infc_item_type_cd = raw.infc_item_type_cd;
    this.infc_item_type_nm = raw.infc_item_type_nm;
  }
}
class interfaceMemory {
  constructor(raw, factory_id) {
    this.factory_id = factory_id;
    this.infc_item_type_id = raw.infc_item_type_nm;
    this.infc_item_id = raw.infc_item_nm;
    this.line_id = raw.line_nm;
    this.proc_id = raw.proc_nm;
    this.equip_id = raw.equip_nm;
    this.plc_ip = raw.plc_ip;
    this.plc_port = Number(raw.plc_port);
    this.device_addre = raw.device_addre;
    this.tag_id = raw.tag_id;
    this.infc_memory_nm = raw.infc_memory_nm;
    this.remark = raw.remark;
  }
}

/**
 * 🔍 Grid Cell 이 Combo 인 경우
 * this.prod_gbn_id = raw.prod_gbn_nm; ➡️ id = nm 형식으로 작성
 */

/**
 * @param {string} componentName 소문자로 시작
 * @param {any} raw 처리 할 데이터
 * @param {string} factory_id 쿠키에서 현재 로그인 한 사업부 아이디
 * @returns
 */
function GetPostParams(componentName, raw, factory_id) {
  let params = "";

  switch (componentName) {
    case "factory":
      params = new factory(raw);
      break;
    case "user":
      params = new user(raw);
      break;
    case "unit":
      params = new unit(raw);
      break;
    case "equipment":
      params = new equipment(raw, factory_id);
      break;
    case "product":
      params = new product(raw, factory_id);
      break;
    case "productGbn":
      params = new productGbn(raw);
      break;
    case "productType":
      params = new productType(raw);
      break;
    case "routing":
      params = new routing(raw, factory_id);
      break;
    case "store":
      params = new store(raw, factory_id);
      break;
    case "storeLocation":
      params = new storeLocation(raw, factory_id);
      break;
    case "department":
      params = new department(raw);
      break;
    case "employee":
      params = new employee(raw);
      break;
    case "grade":
      params = new grade(raw);
      break;
    case "downtimeType":
      params = new downtimeType(raw, factory_id);
      break;
    case "downTime":
      params = new downTime(raw, factory_id);
      break;
    case "model":
      params = new model(raw);
      break;
    case "workingGroup":
      params = new workingGroup(raw, factory_id);
      break;
    case "inspectFiling":
      params = new inspectFiling(raw, factory_id);
      break;
    case "inspectMethod":
      params = new inspectMethod(raw, factory_id);
      break;
    case "inspectTool":
      params = new inspectTool(raw, factory_id);
      break;
    case "inspectType":
      params = new inspectType(raw, factory_id);
      break;
    case "interfaceItemType":
      params = new interfaceItemType(raw, factory_id);
      break;
    case "interfaceMemory":
      params = new interfaceMemory(raw, factory_id);
      break;
    default:
  }
  return params;
}

export default GetPostParams;
