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
    this.prod_no = raw.prod_no;
    this.prod_nm = raw.prod_nm;
    this.prod_gbn_id = raw.prod_gbn_nm;
    this.model_id = raw.model_nm;
    this.prod_type_id = raw.prod_type_nm;
    this.prod_type_small_id = raw.prod_type_small_nm;
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

function GetPutParams(componentName, raw) {
  let params = "";

  switch (componentName) {
    case "Factory":
      params = new factory(raw);
      break;
    case "Line":
      params = new line(raw);
      break;
    case "Equipment":
      params = new equipment(raw);
      break;
    case "Unit":
      params = new unit(raw);
      break;
    case "WorkingGroup":
      params = new workingGroup(raw);
      break;
    case "Product":
      params = new products(raw);
      break;
    default:
  }
  return params;
}

export default GetPutParams;
