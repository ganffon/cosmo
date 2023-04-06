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
class products {
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

class downtimeType {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.downtime_type_id = raw.downtime_type_id;
    this.downtime_type_cd = raw.downtime_type_cd;
    this.downtime_type_nm = raw.downtime_type_nm;
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

function GetPutParams(componentName, raw) {
  let params = "";

  switch (componentName) {
    case "factory":
      params = new factory(raw);
      break;
    case "line":
      params = new line(raw);
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
      params = new products(raw);
      break;
    case "store":
      params = new store(raw);
      break;
    case "downtimeType":
      params = new downtimeType(raw);
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
    default:
  }
  return params;
}

export default GetPutParams;
