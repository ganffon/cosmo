// ✨ INSERT ✨

class factory {
  constructor(raw) {
    this.factory_cd = raw.factory_cd;
    this.factory_nm = raw.factory_nm;
  }
}
class line {
  constructor(raw) {
    this.line_cd = raw.line_cd;
    this.line_nm = raw.line_nm;
    this.rework_fg = raw.rework_fg ? true : false;
  }
}
class process {
  constructor(raw) {
    this.proc_cd = raw.proc_cd;
    this.proc_nm = raw.proc_nm;
  }
}
class user {
  constructor(raw) {
    this.id = raw.id;
    this.group_id = raw.group_id;
    this.user_nm = raw.user_nm;
    this.pwd = raw.pwd;
    this.pwd_dev = raw.pwd_dev;
    this.email = raw.email ? raw.email : null;
    this.pwd_fg = raw.pwd_fg ? true : false;
    this.admin_fg = raw.admin_fg ? true : false;
    this.super_admin_fg = raw.super_admin_fg ? true : false;
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
    this.use_fg = raw.use_fg ? true : false;
    this.worker_fg = raw.worker_fg ? true : false;
    this.remark = raw.remark;
  }
}
class equipment {
  constructor(raw) {
    this.proc_id = raw.proc_id;
    this.equip_cd = raw.equip_cd;
    this.equip_nm = raw.equip_nm;
    this.manager_emp_id = raw.manager_emp_id;
    this.sub_manager_emp_id = raw.sub_manager_emp_id;
    this.use_fg = raw.use_fg ? true : false;
    this.prd_fg = raw.prd_fg ? true : false;
    this.remark = raw.remark;
  }
}
class product {
  constructor(raw) {
    this.prod_cd = raw.prod_cd;
    this.prod_nm = raw.prod_nm;
    this.prod_gbn_id = raw.prod_gbn_id;
    this.model_id = raw.model_id;
    // this.prod_type_id = raw.prod_type_id;
    // this.prod_type_small_id = raw.prod_type_small_id;
    this.prod_class_id = raw.prod_class_id;
    this.unit_id = raw.unit_id;
    this.rev = raw.rev;
    this.prod_std = raw.prod_std;
    this.bag_qty = !isNaN(parseFloat(raw.bag_qty)) ? Number(raw.bag_qty.replace(/,/g, "")) : null;
    this.lot_fg = raw.lot_fg ? true : false;
    this.use_fg = raw.use_fg ? true : false;
    this.active_fg = raw.active_fg ? true : false;
    this.bom_type_id = raw.bom_type_id;
    this.width = !isNaN(parseFloat(raw.width)) ? Number(raw.width.replace(/,/g, "")) : null;
    this.length = !isNaN(parseFloat(raw.length)) ? Number(raw.length.replace(/,/g, "")) : null;
    this.height = !isNaN(parseFloat(raw.height)) ? Number(raw.height.replace(/,/g, "")) : null;
    this.material = raw.material;
    this.color = raw.color;
    this.weight = !isNaN(parseFloat(raw.weight)) ? Number(raw.weight.replace(/,/g, "")) : null;
    this.thickness = !isNaN(parseFloat(raw.thickness)) ? Number(raw.thickness.replace(/,/g, "")) : null;
    this.is_spareparts = raw.is_spareparts ? true : false;
    this.mat_order_fg = raw.mat_order_fg ? true : false;
    this.mat_unit_id = raw.mat_unit_id;
    this.mat_order_min_qty = !isNaN(parseFloat(raw.mat_order_min_qty))
      ? Number(raw.mat_order_min_qty.replace(/,/g, ""))
      : null;
    this.mat_supply_days = !isNaN(parseFloat(raw.mat_supply_days))
      ? Number(raw.mat_supply_days.replace(/,/g, ""))
      : null;
    this.sal_order_fg = raw.sal_order_fg ? true : false;
    this.inv_use_fg = raw.inv_use_fg ? true : false;
    this.inv_unit_qty = !isNaN(parseFloat(raw.inv_unit_qty)) ? Number(raw.inv_unit_qty.replace(/,/g, "")) : null;
    this.inv_safe_qty = !isNaN(parseFloat(raw.inv_safe_qty)) ? Number(raw.inv_safe_qty.replace(/,/g, "")) : null;
    this.inv_to_store_id = raw.inv_to_store_id;
    this.inv_to_location_id = raw.inv_to_location_id;
    this.qms_receive_insp_fg = raw.qms_receive_insp_fg ? true : false;
    this.qms_proc_insp_fg = raw.qms_proc_insp_fg ? true : false;
    this.qms_final_insp_fg = raw.qms_final_insp_fg ? true : false;
    this.prd_plan_type_id = raw.prd_plan_type_id;
    this.prd_active_fg = raw.prd_active_fg ? true : false;
    this.prd_min = !isNaN(parseFloat(raw.prd_min)) ? Number(raw.prd_min.replace(/,/g, "")) : null;
    this.prd_max = !isNaN(parseFloat(raw.prd_max)) ? Number(raw.prd_max.replace(/,/g, "")) : null;
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
class productTypeSmall {
  constructor(raw) {
    this.prod_type_small_cd = raw.prod_type_small_cd;
    this.prod_type_small_nm = raw.prod_type_small_nm;
  }
}
class routing {
  constructor(raw) {
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
  constructor(raw) {
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
class grade {
  constructor(raw) {
    this.grade_cd = raw.grade_cd;
    this.grade_nm = raw.grade_nm;
  }
}
class downtimeType {
  constructor(raw) {
    this.downtime_type_cd = raw.downtime_type_cd;
    this.downtime_type_nm = raw.downtime_type_nm;
  }
}
class downtime {
  constructor(raw) {
    this.downtime_type_id = raw.downtime_type_id;
    this.downtime_cd = raw.downtime_cd;
    this.downtime_nm = raw.downtime_nm;
    this.scheduled_shutdown_fg = raw.scheduled_shutdown_fg ? true : false;
  }
}
class productModel {
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
class workerGroup {
  constructor(raw) {
    this.worker_group_cd = raw.worker_group_cd;
    this.worker_group_nm = raw.worker_group_nm;
  }
}
class inspFiling {
  constructor(raw) {
    this.insp_filing_cd = raw.insp_filing_cd;
    this.insp_filing_nm = raw.insp_filing_nm;
  }
}
class inspMethod {
  constructor(raw) {
    this.insp_method_cd = raw.insp_method_cd;
    this.insp_method_nm = raw.insp_method_nm;
  }
}
class inspTool {
  constructor(raw) {
    this.insp_tool_cd = raw.insp_tool_cd;
    this.insp_tool_nm = raw.insp_tool_nm;
  }
}
class inspItemType {
  constructor(raw) {
    this.insp_item_type_cd = raw.insp_item_type_cd;
    this.insp_item_type_nm = raw.insp_item_type_nm;
  }
}
class inspItem {
  constructor(raw) {
    this.insp_item_type_id = raw.insp_item_type_id;
    this.insp_item_cd = raw.insp_item_cd;
    this.insp_item_nm = raw.insp_item_nm;
    this.insp_tool_id = raw.insp_tool_id;
    this.insp_method_id = raw.insp_method_id;
    this.unit_id = raw.unit_id;
  }
}
class infcItemType {
  constructor(raw) {
    this.infc_item_type_cd = raw.infc_item_type_cd;
    this.infc_item_type_nm = raw.infc_item_type_nm;
  }
}
class infcItem {
  constructor(raw) {
    this.infc_item_type_id = raw.infc_item_type_id;
    this.infc_item_cd = raw.infc_item_cd;
    this.infc_item_nm = raw.infc_item_nm;
  }
}
class infcMemory {
  constructor(raw) {
    this.sortby = raw.sortby === null || raw.sortby === "" ? null : Number(raw.sortby);
    this.infc_item_type_id = raw.infc_item_type_id;
    this.infc_item_id = raw.infc_item_id;
    this.line_id = raw.line_id;
    this.proc_id = raw.proc_id;
    this.equip_id = raw.equip_id;
    this.plc_ip = raw.plc_ip;
    this.plc_port = raw.plc_port === null || raw.plc_port === "" ? null : Number(raw.plc_port);
    this.device_address = raw.device_address;
    this.tag_id = raw.tag_id;
    this.unit_nm = raw.unit_nm;
    this.weight = raw.weight === null || raw.weight === "" ? null : Number(raw.weight);
    this.constant_value = raw.constant_value === null || raw.constant_value === "" ? null : Number(raw.constant_value);
    this.infc_memory_nm = raw.infc_memory_nm;
    this.history_fg = raw.history_fg ? true : false;
    this.remark = raw.remark;
  }
}
class equipmentLarge {
  constructor(raw) {
    this.equip_classification_cd = raw.equip_classification_cd;
    this.equip_classification_nm = raw.equip_classification_nm;
  }
}
class equipmentMedium {
  constructor(raw) {
    this.equip_group_cd = raw.equip_group_cd;
    this.equip_group_nm = raw.equip_group_nm;
  }
}
class equipmentSmall {
  constructor(raw) {
    this.equip_class_cd = raw.equip_class_cd;
    this.equip_class_nm = raw.equip_class_nm;
  }
}
class equipmentDetail {
  constructor(raw) {
    this.proc_id = raw.proc_id;
    this.equip_id = raw.equip_id;
    this.equip_detail_cd = raw.equip_detail_cd;
    this.equip_detail_nm = raw.equip_detail_nm;
    this.equip_classification_id = raw.equip_classification_id;
    this.equip_group_id = raw.equip_group_id;
    this.equip_class_id = raw.equip_class_id;
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
    this.purchase_date = raw.purchase_date === "" ? null : raw.purchase_date;
    this.purchase_tel = raw.purchase_tel;
    this.purchase_price = !isNaN(parseFloat(raw.purchase_price))
      ? Number(raw.purchase_price.toString().replace(/,/g, ""))
      : null;
    this.use_fg = raw.use_fg ? true : false;
    this.remark = raw.remark;
  }
}
class setup {
  constructor(raw) {
    this.setup_cd = raw.setup_cd;
    this.setup_nm = raw.setup_nm;
    this.auth_read = raw.auth_read ? true : false;
    this.auth_create = raw.auth_create ? true : false;
    this.auth_update = raw.auth_update ? true : false;
    this.auth_delete = raw.auth_delete ? true : false;
  }
}
class document {
  constructor(raw) {
    this.insp_document_no = raw.insp_document_no;
    this.line_id = raw.line_id;
    this.prod_id = raw.prod_id;
    this.insp_document_reg_date = raw.insp_document_reg_date;
    this.apply_date = raw.apply_date;
    this.apply_fg = raw.apply_fg ? true : false;
    this.contents = raw.contents;
    this.remark = raw.remark;
  }
}
class documentDetail {
  constructor(raw) {
    this.insp_document_id = raw.insp_document_id;
    this.sortby = !isNaN(parseFloat(raw.sortby)) ? Number(raw.sortby) : null;
    this.proc_id = raw.proc_id;
    this.equip_id = raw.equip_id;
    this.insp_proc_gbn = raw.insp_proc_gbn;
    this.insp_item_id = raw.insp_item_id;
    this.insp_item_desc = raw.insp_item_desc;
    this.spec_std = raw.spec_std;
    this.spec_min = !isNaN(parseFloat(raw.spec_min)) ? Number(raw.spec_min) : null;
    this.spec_max = !isNaN(parseFloat(raw.spec_max)) ? Number(raw.spec_max) : null;
    this.spec_lcl = !isNaN(parseFloat(raw.spec_lcl)) ? Number(raw.spec_lcl) : null;
    this.spec_ucl = !isNaN(parseFloat(raw.spec_ucl)) ? Number(raw.spec_ucl) : null;
    this.insp_filing_id = raw.insp_filing_id;
    this.insp_tool_id = raw.insp_tool_id;
    this.insp_method_id = raw.insp_method_id;
    this.special_property = raw.special_property;
    this.worker_sample_cnt = !isNaN(parseFloat(raw.worker_sample_cnt)) ? Number(raw.worker_sample_cnt) : null;
    this.worker_insp_cycle = raw.worker_insp_cycle;
    this.inspector_sample_cnt = !isNaN(parseFloat(raw.inspector_sample_cnt)) ? Number(raw.inspector_sample_cnt) : null;
    this.inspector_insp_cycle = raw.inspector_insp_cycle;
    this.infc_memory_id = raw.infc_memory_id === "" ? null : raw.infc_memory_id;
    this.remark = raw.remark;
  }
}

class spareReceive {
  constructor(raw) {
    this.partner_id = raw.partner_id;
    this.supplier_id = raw.supplier_id;
    this.stmt_no = raw.stmt_no;
    this.reg_date = raw.reg_date;
    this.total_price = raw.total_price === null || raw.total_price === "" ? null : Number(raw.total_price);
    this.total_qty = raw.total_qty === null || raw.total_qty === "" ? null : Number(raw.total_qty);
    this.order_id = raw.order_id;
    this.spare_receive_uid = raw.spare_receive_uid;
    this.emp_nm = raw.emp_nm;
    this.remark = raw.remark;
  }
}
class spareReceiveDetail {
  constructor(raw) {
    this.spare_receive_id = raw.spare_receive_id;
    this.prod_id = raw.prod_id;
    this.unit_id = raw.unit_id;
    this.lot_no = raw.lot_no;
    this.manufactured_lot_no = raw.manufactured_lot_no;
    this.qty = raw.qty === null || raw.qty === "" ? null : Number(raw.qty);
    this.price = raw.price === null || raw.price === "" ? null : Number(raw.price);
    this.money_unit_id = raw.money_unit_id;
    this.exchange = raw.exchange === null || raw.exchange === "" ? null : Number(raw.exchange);
    this.total_price = raw.total_price === null || raw.total_price === "" ? null : Number(raw.total_price);
    this.unit_qty = raw.unit_qty === null || raw.unit_qty === "" ? null : Number(raw.unit_qty);
    this.insp_fg = raw.insp_fg ? true : false;
    this.carry_fg = raw.carry_fg ? true : false;
    this.order_detail_id = raw.order_detail_id;
    this.to_store_id = raw.to_store_id;
    this.to_location_id = raw.to_location_id;
    this.barcode = raw.barcode;
    this.remark = raw.remark;
  }
}
class controlPlan {
  constructor(raw) {
    this.control_plan_no = raw.control_plan_no;
    this.line_id = raw.line_id;
    this.prod_id = raw.prod_id;
    this.control_plan_reg_date = raw.control_plan_reg_date;
    this.apply_date = raw.apply_date;
    this.apply_fg = raw.apply_fg ? true : false;
    this.contents = raw.contents;
    this.remark = raw.remark;
  }
}
class controlPlanDetail {
  constructor(raw) {
    this.control_plan_id = raw.control_plan_id;
    this.proc_no = raw.proc_no === null || raw.proc_no === "" ? null : Number(raw.proc_no);
    this.insp_document_detail_id = raw.insp_document_detail_id;
    this.insp_document_id = raw.insp_document_id;
    this.order_input_fg = raw.order_input_fg ? true : false;
    this.remark = raw.remark;
  }
}
class subdivision {
  constructor(raw) {
    this.subdivision_date = raw.subdivision_date;
    this.prod_id = raw.prod_id;
    this.lot_no = raw.lot_no;
    this.remark = raw.remark;
  }
}
class subdivisionDetail {
  constructor(raw) {
    this.work_subdivision_id = raw.work_subdivision_id;
    this.lot_no = raw.lot_no;
    this.before_qty =
      raw.before_subdivision_qty === null || raw.before_subdivision_qty === ""
        ? null
        : Number(raw.before_subdivision_qty);
    this.after_qty =
      raw.after_subdivision_qty === null || raw.after_subdivision_qty === "" ? null : Number(raw.after_subdivision_qty);
    this.qty = raw.subdivision_qty === null || raw.subdivision_qty === "" ? null : Number(raw.subdivision_qty);
    this.subdivision_emp_id = raw.subdivision_emp_id;
    this.inv_to_store_id = raw.inv_to_store_id;
    this.inv_to_location_id = raw.inv_to_location_id;
    this.barcode_no = raw.barcode_no;
    this.subdivision_date = raw.subdivision_date;
    this.subdivision_time = raw.subdivision_time;
    this.remark = raw.remark;
  }
}
class subdivisionGround {
  constructor(raw) {
    this.prod_id = raw.prod_id;
    this.remark = raw.remark;
    this.worker_group_nm = raw.workGroupKey;
    this.subdivision_date = raw.subdivision_date;
  }
}

class subdivisionGroundDetail {
  constructor(raw) {
    this.work_subdivision_id = raw.work_subdivision_id;
    this.lot_no = raw.lot_no;
    this.qty = raw.qty;
    this.subdivision_date = raw.subdivision_date;
    this.subdivision_time = raw.subdivision_time;
  }
}
class itfOrder {
  constructor(raw) {
    this.work_subdivision_id = raw.work_subdivision_id;
    this.corp_code = raw.corp_code;
    this.plce_code = raw.plce_code;
    this.request_no = raw.request_no;
    this.item_id = raw.prod_id;
    this.item_cd = raw.prod_cd;
    this.work_order_id = raw.work_order_id;
    this.work_order_no = raw.work_order_no;
    this.line_dept_cd = raw.line_dept_cd;
    this.line_dept_nm = raw.line_dept_nm;
    this.work_order_date = raw.work_order_date;
    this.work_start_date = raw.work_start_date;
    this.work_end_date = raw.work_end_date;
    this.work_order_qty = typeof Number(raw.work_order_qty) === "number" ? Number(raw.work_order_qty) : null;
    this.order_emp_cd = raw.order_emp_cd;
    this.input_emp_cd = raw.input_emp_cd;
  }
}
class lotChange {
  constructor(raw) {
    this.prod_id = raw.prod_id;
    this.input_lot_no = raw.input_lot_no;
    this.input_packing_no = typeof Number(raw.input_packing_no) === "number" ? Number(raw.input_packing_no) : null;
    this.input_qty = typeof Number(raw.input_qty) === "number" ? Number(raw.input_qty) : null;
    this.input_date = raw.input_date;
    this.remark = raw.remark;
  }
}

class createSubdivisionDetailBarcode {
  constructor(raw) {
    this.barcode_type = "SUBDIVISION_DETAIL";
    this.reference_id = raw;
  }
}

class createBarcode {
  constructor(raw) {
    this.barcode_type = "SUBDIVISION";
    this.reference_id = raw;
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
class sparepartsOutgo {
  constructor(raw) {
    this.prod_id = raw.prod_id;
    this.release_date = raw.outgo_date;
    this.lot_no = raw.lot_no;
    this.release_qty = raw.stock === null || raw.stock === "" ? null : Number(raw.stock);
    this.equip_detail_id = raw.equip_detail_id;
    this.line_id = raw.line_id;
    this.inv_from_store_id = raw.store_id;
    this.inv_from_location_id = raw.location_id;
    this.release_emp_id = raw.release_uid;
    this.remark = raw.remark;
  }
}
class lineDepartment {
  constructor(raw) {
    this.line_dept_cd = raw.line_dept_cd;
    this.line_dept_nm = raw.line_dept_nm;
    this.line_id = raw.line_id;
    this.dept_id = raw.dept_id;
  }
}

class productClass {
  constructor(raw) {
    this.prod_class_cd = raw.prod_class_cd;
    this.prod_class_nm = raw.prod_class_nm;
  }
}
class order {
  constructor(raw) {
    this.request_no = raw.request_no;
    this.work_order_date = raw.work_order_date;
    this.line_dept_id = raw.line_dept_id;
    this.line_id = raw.line_id;
    this.prod_id = raw.prod_id;
    this.prod_cd = raw.prod_cd;
    this.prod_nm = raw.prod_nm;
    this.work_start_date = raw.work_start_date;
    this.work_start_time = raw.work_start_time;
    this.work_end_date = raw.work_end_date === "" || raw.work_end_date === null ? "2099-12-31" : raw.work_end_date;
    this.work_end_time = raw.work_end_time;
    this.work_order_qty = raw.work_order_qty === null || raw.work_order_qty === "" ? null : Number(raw.work_order_qty);
    this.complete_fg = raw.complete_fg;
    this.complete_date = raw.complete_date === "" || raw.complete_date === null ? null : raw.complete_date;
    this.remark = raw.remark;
  }
}
class packing {
  constructor(raw) {
    this.work_order_id = raw.work_order_id;
    this.line_id = raw.line_id;
    this.line_dept_id = raw.line_dept_id;
    this.prod_id = raw.prod_id;
    this.lot_no = raw.lot_no;
    this.packing_qty = raw.packing_qty === null || raw.packing_qty === "" ? null : Number(raw.packing_qty);
    this.packing_cnt = raw.packing_cnt === null || raw.packing_cnt === "" ? null : Number(raw.packing_cnt);
    this.work_packing_date = raw.work_packing_date;
    this.work_packing_time = raw.work_packing_time;
    this.packing_emp_id = raw.packing_emp_id;
    this.inv_to_store_id = raw.inv_to_store_id;
    this.inv_to_location_id = raw.inv_to_location_id;
    this.rework_fg = raw.rework_fg ? true : false;
    this.remark = raw.remark;
  }
}
class packingDetail {
  constructor(raw) {
    this.work_packing_id = raw.work_packing_id;
    this.packing_qty = raw.packing_qty === null || raw.packing_qty === "" ? null : Number(raw.packing_qty);
    this.packing_emp_id = raw.packing_emp_id;
    this.work_packing_date = raw.work_packing_date === "" ? null : raw.work_packing_date;
    this.work_packing_time = raw.work_packing_time === "" ? null : raw.work_packing_time;
    this.barcode_no = raw.barcode_no;
    this.packing_no = +raw.packing_no;
    this.remark = raw.remark;
  }
}
class weight {
  constructor(raw) {
    this.work_order_id = raw.work_order_id;
    this.line_id = raw.line_id;
    this.line_dept_id = raw.line_dept_id;
    this.prod_id = raw.prod_id;
    this.lot_no = raw.lot_no;
    this.work_weigh_date = raw.work_weigh_date;
    this.work_weigh_time = raw.work_weigh_time;
    this.weigh_emp_id = raw.weigh_emp_id;
    this.work_input_date = raw.work_input_date;
    this.work_input_time = raw.work_input_time;
    this.input_emp_id = raw.input_emp_id;
    this.inv_to_store_id = raw.inv_to_store_id;
    this.inv_to_location_id = raw.inv_to_location_id;
    // this.bag_cleaning_fg = raw.bag_cleaning_fg ? true : false;
    this.remark = raw.remark;
  }
}

class weightDetail {
  constructor(raw) {
    this.work_weigh_id = raw.work_weigh_id;
    this.work_order_input_id = raw.work_order_input_id;
    this.prod_id = raw.prod_id;
    this.lot_no = raw.lot_no;
    this.total_qty = raw.total_qty === null || raw.total_qty === "" ? null : Number(raw.total_qty);
    this.bag_qty = raw.bag_qty === null || raw.bag_qty === "" ? null : Number(raw.bag_qty);
    this.input_qty = raw.input_qty === null || raw.input_qty === "" ? null : Number(raw.input_qty);
    this.remark = raw.remark;
  }
}

class productionDownTime {
  constructor(raw) {
    this.work_order_id = raw.work_order_id;
    this.line_id = raw.line_id;
    this.proc_id = raw.proc_id;
    this.equip_id = raw.equip_id;
    this.downtime_id = raw.downtime_id;
    this.downtime_start_date = raw.start_date;
    this.downtime_start_time = raw.start_time;
    this.downtime_end_date = raw.end_date;
    this.downtime_end_time = raw.end_time;
    this.remark = raw.remark;
  }
}
class workGroupStatusDetail {
  constructor(raw) {
    this.emp_id = raw.emp_id;
    this.work_start_date = raw.work_start_date;
    this.work_start_time = raw.work_start_time;
    this.work_end_date = raw.work_end_date;
    this.work_end_time = raw.work_end_time;
    this.work_type_id = raw.work_type_id;
    this.leader_fg = raw.leader_fg;
    this.support_fg = false;
    this.remark = raw.remark;
  }
}
class workerGroupStatusAddEmp {
  constructor(raw) {
    this.worker_group_status_id = raw.worker_group_status_id;
    this.emp_id = raw.emp_id;
    this.work_type_id = raw.work_type_id;
    this.work_start_date = raw.work_start_date;
    this.work_start_time = raw.work_start_time;
    this.work_end_date = raw.work_end_date;
    this.work_end_time = raw.work_end_time;
    this.leader_fg = raw.leader_fg;
    this.support_fg = false;
    this.remark = raw.remark;
  }
}
class inspectionResultUpload {
  constructor(raw) {
    this.prod_id = raw.prod_id;
    this.lot_no = raw.lot_no;
    this.work_date = raw.work_date;
    this.insp_item = raw.insp_item === null || raw.insp_item === "" ? null : Number(raw.insp_item);
    this.insp_min = raw.insp_min === null || raw.insp_min === "" ? null : Number(raw.insp_min);
    this.insp_max = raw.insp_max === null || raw.insp_max === "" ? null : Number(raw.insp_max);
    this.insp_value = raw.insp_value === null || raw.insp_value === "" ? null : Number(raw.insp_value);
    this.remark = raw.remark;
  }
}
class workYield {
  constructor(raw) {
    this.line_id = raw.line_id;
    this.yield_value = raw.yield_value === null || raw.yield_value === "" ? null : Number(raw.yield_value);
    this.remark = raw.remark;
  }
}
class PackingInput {
  constructor(raw) {
    this.work_packing_id = raw.work_packing_id;
    this.lot_no = raw.lot_no;
    this.input_qty = raw.input_qty;
    this.loss_qty = raw.loss_qty;
    this.work_yield = raw.work_yield;
    this.store_id = raw.store_id;
    this.location_id = raw.location_id;
    this.remark = raw.remark;
  }
}
class inspDocumentInput {
  constructor(raw) {
    this.insp_document_id = raw.insp_document_id;
    this.sortby = raw.sortby === null || raw.sortby === "" ? null : Number(raw.sortby);
    this.prod_id = raw.prod_id;
    this.insp_item_id = raw.insp_item_id;
    this.insp_item_desc = raw.insp_item_desc;
    this.spec_std = raw.spec_std;
    this.spec_min = raw.spec_min === null || raw.spec_min === "" ? null : Number(raw.spec_min);
    this.spec_max = raw.spec_max === null || raw.spec_max === "" ? null : Number(raw.spec_max);
    this.spec_lcl = raw.spec_lcl === null || raw.spec_lcl === "" ? null : Number(raw.spec_lcl);
    this.spec_ucl = raw.spec_ucl === null || raw.spec_ucl === "" ? null : Number(raw.spec_ucl);
    this.insp_filing_id = raw.insp_filing_id;
    this.insp_tool_id = raw.insp_tool_id;
    this.insp_method_id = raw.insp_method_id;
    this.special_property = raw.special_property;
    this.worker_sample_cnt =
      raw.worker_sample_cnt === null || raw.worker_sample_cnt === "" ? null : Number(raw.worker_sample_cnt);
    this.worker_insp_cycle = raw.worker_insp_cycle;
    this.inspector_sample_cnt =
      raw.inspector_sample_cnt === null || raw.inspector_sample_cnt === "" ? null : Number(raw.inspector_sample_cnt);
    this.inspector_insp_cycle = raw.inspector_insp_cycle;
    this.infc_memory_id = raw.infc_memory_id;
    this.remark = raw.remark;
  }
}
class inspDocumentDetail {
  constructor(raw) {
    this.insp_document_id = raw.insp_document_id;
    this.sortby = raw.sortby === null || raw.sortby === "" ? null : Number(raw.sortby);
    this.proc_id = raw.proc_id;
    this.equip_id = raw.equip_id;
    this.insp_item_id = raw.insp_item_id;
    this.insp_item_desc = raw.insp_item_desc;
    this.spec_std = raw.spec_std;
    this.spec_min = raw.spec_min === null || raw.spec_min === "" ? null : Number(raw.spec_min);
    this.spec_max = raw.spec_max === null || raw.spec_max === "" ? null : Number(raw.spec_max);
    this.spec_lcl = raw.spec_lcl === null || raw.spec_lcl === "" ? null : Number(raw.spec_lcl);
    this.spec_ucl = raw.spec_ucl === null || raw.spec_ucl === "" ? null : Number(raw.spec_ucl);
    this.insp_filing_id = raw.insp_filing_id;
    this.insp_tool_id = raw.insp_tool_id;
    this.insp_method_id = raw.insp_method_id;
    this.special_property = raw.special_property;
    this.worker_sample_cnt =
      raw.worker_sample_cnt === null || raw.worker_sample_cnt === "" ? null : Number(raw.worker_sample_cnt);
    this.worker_insp_cycle = raw.worker_insp_cycle;
    this.inspector_sample_cnt =
      raw.inspector_sample_cnt === null || raw.inspector_sample_cnt === "" ? null : Number(raw.inspector_sample_cnt);
    this.inspector_insp_cycle = raw.inspector_insp_cycle;
    this.infc_memory_id = raw.infc_memory_id;
    this.remark = raw.remark;
  }
}
class workType {
  constructor(raw) {
    this.work_type_cd = raw.work_type_cd;
    this.work_type_nm = raw.work_type_nm;
    this.is_work = raw.is_work ? true : false;
  }
}
class supportWorkGroupStatusDetail {
  constructor(raw) {
    this.emp_id = raw.emp_id;
    this.work_start_date = raw.work_start_date;
    this.work_start_time = raw.work_start_time;
    this.work_end_date = raw.work_end_date;
    this.work_end_time = raw.work_end_time;
    this.work_type_id = raw.work_type_id;
    this.leader_fg = raw.leader_fg !== null ? raw.leader_fg : false;
    this.support_fg = true;
    this.remark = raw.remark;
  }
}
class workerGroupStatusAddSupportEmp {
  constructor(raw) {
    this.worker_group_status_id = raw.worker_group_status_id;
    this.emp_id = raw.emp_id;
    this.work_type_id = raw.work_type_id;
    this.work_start_date = raw.work_start_date;
    this.work_start_time = raw.work_start_time;
    this.work_end_date = raw.work_end_date;
    this.work_end_time = raw.work_end_time;
    this.leader_fg = raw.leader_fg;
    this.support_fg = true;
    this.remark = raw.remark;
  }
}
class notice {
  constructor(raw) {
    this.title = raw.title;
    this.contents = raw.contents;
    this.writer_uid = raw.writer_uid;
    this.notice_start_date = raw.notice_start_date;
    this.notice_end_date = raw.notice_end_date;
  }
}
class ProductRouting {
  constructor(raw) {
    this.prod_id = raw.prod_id_fdr;
    this.mapping_id = raw.prod_id;
    this.mapping_cd = raw.prod_cd;
    this.mapping_nm = raw.prod_nm;
    this.mapping_system = raw.mapping_system;
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
function GetPostParams(componentName, raw) {
  let params = "";
  if (raw !== undefined) {
    switch (componentName) {
      case "factory":
        params = new factory(raw);
        break;
      case "line":
        params = new line(raw);
        break;
      case "process":
        params = new process(raw);
        break;
      case "user":
        params = new user(raw);
        break;
      case "employee":
        params = new employee(raw);
        break;
      case "unit":
        params = new unit(raw);
        break;
      case "equipment":
        params = new equipment(raw);
        break;
      case "product":
        params = new product(raw);
        break;
      case "productGbn":
        params = new productGbn(raw);
        break;
      case "productType":
        params = new productType(raw);
        break;
      case "productTypeSmall":
        params = new productTypeSmall(raw);
        break;
      case "routing":
        params = new routing(raw);
        break;
      case "store":
        params = new store(raw);
        break;
      case "storeLocation":
        params = new storeLocation(raw);
        break;
      case "department":
        params = new department(raw);
        break;
      case "grade":
        params = new grade(raw);
        break;
      case "downtimeType":
        params = new downtimeType(raw);
        break;
      case "downtime":
        params = new downtime(raw);
        break;
      case "productModel":
        params = new productModel(raw);
        break;
      case "workerGroup":
        params = new workerGroup(raw);
        break;
      case "inspFiling":
        params = new inspFiling(raw);
        break;
      case "inspMethod":
        params = new inspMethod(raw);
        break;
      case "inspTool":
        params = new inspTool(raw);
        break;
      case "inspItemType":
        params = new inspItemType(raw);
        break;
      case "inspItem":
        params = new inspItem(raw);
        break;
      case "infcItemType":
        params = new infcItemType(raw);
        break;
      case "infcItem":
        params = new infcItem(raw);
        break;
      case "infcMemory":
        params = new infcMemory(raw);
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
      case "setup":
        params = new setup(raw);
        break;
      case "document":
        params = new document(raw);
        break;
      case "documentDetail":
        params = new documentDetail(raw);
        break;
      case "spareReceive":
        params = new spareReceive(raw);
        break;
      case "spareReceiveDetail":
        params = new spareReceiveDetail(raw);
        break;
      case "controlPlan":
        params = new controlPlan(raw);
        break;
      case "controlPlanDetail":
        params = new controlPlanDetail(raw);
        break;
      case "subdivision":
        params = new subdivision(raw);
        break;
      case "subdivisionDetail":
        params = new subdivisionDetail(raw);
        break;
      case "createSubdivisionDetailBarcode":
        params = new createSubdivisionDetailBarcode(raw);
        break;
      case "createBarcode":
        params = new createBarcode(raw);
        break;
      case "partnerType":
        params = new partnerType(raw);
        break;
      case "partner":
        params = new partner(raw);
        break;
      case "sparepartsOutgo":
        params = new sparepartsOutgo(raw);
        break;
      case "lineDepartment":
        params = new lineDepartment(raw);
        break;
      case "productClass":
        params = new productClass(raw);
        break;
      case "order":
        params = new order(raw);
        break;
      case "packing":
        params = new packing(raw);
        break;
      case "packingDetail":
        params = new packingDetail(raw);
        break;
      case "weight":
        params = new weight(raw);
        break;

      case "weightDetail":
        params = new weightDetail(raw);
        break;
      case "productionDownTime":
        params = new productionDownTime(raw);
        break;
      case "workGroupStatusDetail":
        params = new workGroupStatusDetail(raw);
        break;
      case "workerGroupStatusAddEmp":
        params = new workerGroupStatusAddEmp(raw);
        break;
      case "inspectionResultUpload":
        params = new inspectionResultUpload(raw);
        break;
      case "workYield":
        params = new workYield(raw);
        break;
      case "PackingInput":
        params = new PackingInput(raw);
        break;
      case "inspDocumentInput":
        params = new inspDocumentInput(raw);
        break;
      case "inspDocumentDetail":
        params = new inspDocumentDetail(raw);
        break;
      case "workType":
        params = new workType(raw);
        break;
      case "supportWorkGroupStatusDetail":
        params = new supportWorkGroupStatusDetail(raw);
        break;
      case "workerGroupStatusAddSupportEmp":
        params = new workerGroupStatusAddSupportEmp(raw);
        break;
      case "notice":
        params = new notice(raw);
        break;
      case "ProductRouting":
        params = new ProductRouting(raw);
        break;
      case "subdivisionGround":
        params = new subdivisionGround(raw);
        break;
      case "subdivisionGroundDetail":
        params = new subdivisionGroundDetail(raw);
        break;
      case "itfOrder":
        params = new itfOrder(raw);
        break;
      case "lotChange":
        params = new lotChange(raw);
        break;
      default:
    }
  }

  const keys = Object.keys(params).filter((key) => {
    return key.endsWith("_date") || key.endsWith("_time");
  });
  keys.forEach((key) => {
    if (params[key] === "") {
      params[key] = null;
    }
  });

  return params;
}

export default GetPostParams;
