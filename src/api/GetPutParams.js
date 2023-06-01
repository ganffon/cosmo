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
    this.line_id = raw.line_id;
    this.line_nm = raw.line_nm;
  }
}
class process {
  constructor(raw) {
    this.proc_id = raw.proc_id;
    this.proc_nm = raw.proc_nm;
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
    this.proc_id = raw.proc_id;
    this.equip_id = raw.equip_id;
    this.equip_cd = raw.equip_cd;
    this.equip_nm = raw.equip_nm;
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
class workerGroup {
  constructor(raw) {
    this.worker_group_id = raw.worker_group_id;
    this.worker_group_cd = raw.worker_group_cd;
    this.worker_group_nm = raw.worker_group_nm;
  }
}
class productGbn {
  constructor(raw) {
    this.prod_gbn_id = raw.prod_gbn_id;
    this.prod_gbn_nm = raw.prod_gbn_nm;
  }
}
class product {
  constructor(raw) {
    this.prod_id = raw.prod_id;
    this.prod_cd = raw.prod_cd;
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
    this.width = !isNaN(parseFloat(raw.width))
      ? Number(raw.width.toString().replace(/,/g, ""))
      : null;
    this.length = !isNaN(parseFloat(raw.length))
      ? Number(raw.length.toString().replace(/,/g, ""))
      : null;
    this.height = !isNaN(parseFloat(raw.height))
      ? Number(raw.height.toString().replace(/,/g, ""))
      : null;
    this.material = raw.material;
    this.color = raw.color;
    this.weight = !isNaN(parseFloat(raw.weight))
      ? Number(raw.weight.toString().replace(/,/g, ""))
      : null;
    this.thickness = !isNaN(parseFloat(raw.thickness))
      ? Number(raw.thickness.toString().replace(/,/g, ""))
      : null;
    this.is_spareparts = raw.is_spareparts ? true : false;
    this.mat_order_fg = raw.mat_order_fg ? true : false;
    this.mat_unit_id = raw.mat_unit_id;
    this.mat_order_min_qty = !isNaN(parseFloat(raw.mat_order_min_qty))
      ? Number(raw.mat_order_min_qty.toString().replace(/,/g, ""))
      : null;
    this.mat_supply_days = !isNaN(parseFloat(raw.mat_supply_days))
      ? Number(raw.mat_supply_days.toString().replace(/,/g, ""))
      : null;
    this.sal_order_fg = raw.sal_order_fg ? true : false;
    this.inv_use_fg = raw.inv_use_fg ? true : false;
    this.inv_unit_qty = !isNaN(parseFloat(raw.inv_unit_qty))
      ? Number(raw.inv_unit_qty.toString().replace(/,/g, ""))
      : null;
    this.inv_safe_qty = !isNaN(parseFloat(raw.inv_safe_qty))
      ? Number(raw.inv_safe_qty.toString().replace(/,/g, ""))
      : null;
    this.inv_to_store_id = raw.inv_to_store_id;
    this.inv_to_location_id = raw.inv_to_location_id;
    this.qms_receive_insp_fg = raw.qms_receive_insp_fg ? true : false;
    this.qms_proc_insp_fg = raw.qms_proc_insp_fg ? true : false;
    this.qms_final_insp_fg = raw.qms_final_insp_fg ? true : false;
    this.prd_plan_type_id = raw.prd_plan_type_id;
    this.prd_active_fg = raw.prd_active_fg ? true : false;
    this.prd_min = !isNaN(parseFloat(raw.prd_min))
      ? Number(raw.prd_min.toString().replace(/,/g, ""))
      : null;
    this.prd_max = !isNaN(parseFloat(raw.prd_max))
      ? Number(raw.prd_max.toString().replace(/,/g, ""))
      : null;
  }
}
class productType {
  constructor(raw) {
    this.prod_type_id = raw.prod_type_id;
    this.prod_type_nm = raw.prod_type_nm;
  }
}
class productTypeSmall {
  constructor(raw) {
    this.prod_type_small_id = raw.prod_type_small_id;
    this.prod_type_small_nm = raw.prod_type_small_nm;
  }
}
class productModel {
  constructor(raw) {
    this.model_id = raw.model_id;
    this.model_nm = raw.model_nm;
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
class department {
  constructor(raw) {
    this.dept_id = raw.dept_id;
    this.dept_nm = raw.dept_nm;
  }
}
class grade {
  constructor(raw) {
    this.grade_id = raw.grade_id;
    this.grade_nm = raw.grade_nm;
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
    this.scheduled_shutdown_fg = raw.scheduled_shutdown_fg ? true : false;
  }
}
class inspFiling {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.insp_filing_id = raw.insp_filing_id;
    this.insp_filing_cd = raw.insp_filing_cd;
    this.insp_filing_nm = raw.insp_filing_nm;
  }
}
class inspMethod {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.insp_method_id = raw.insp_method_id;
    this.insp_method_cd = raw.insp_method_cd;
    this.insp_method_nm = raw.insp_method_nm;
  }
}
class inspTool {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.insp_tool_id = raw.insp_tool_id;
    this.insp_tool_cd = raw.insp_tool_cd;
    this.insp_tool_nm = raw.insp_tool_nm;
  }
}
class inspItemType {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.insp_item_type_id = raw.insp_item_type_id;
    this.insp_item_type_cd = raw.insp_item_type_cd;
    this.insp_item_type_nm = raw.insp_item_type_nm;
  }
}
class inspItem {
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
class infcItemType {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.infc_item_type_id = raw.infc_item_type_id;
    this.infc_item_type_cd = raw.infc_item_type_cd;
    this.infc_item_type_nm = raw.infc_item_type_nm;
  }
}
class infcItem {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.infc_item_type_id = raw.infc_item_type_id;
    this.infc_item_id = raw.infc_item_id;
    this.infc_item_cd = raw.infc_item_cd;
    this.infc_item_nm = raw.infc_item_nm;
  }
}
class infcMemory {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.infc_memory_id = raw.infc_memory_id;
    this.infc_item_id = raw.infc_item_id;
    this.line_id = raw.line_id;
    this.proc_id = raw.proc_id;
    this.equip_id = raw.equip_id;
    this.plc_ip = raw.plc_ip;
    this.unit_nm = raw.unit_nm;
    this.weight = String(raw.weight) ? Number(raw.weight) : null;
    this.constant_value = String(raw.constant_value)
      ? Number(raw.constant_value)
      : null;
    this.plc_port = String(raw.plc_port) ? Number(raw.plc_port) : null;
    this.device_address = raw.device_address;
    this.tag_id = raw.tag_id;
    this.infc_memory_nm = raw.infc_memory_nm;
    this.remark = raw.remark;
  }
}
class equipmentLarge {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.equip_classification_id = raw.equip_classification_id;
    this.equip_classification_cd = raw.equip_classification_cd;
    this.equip_classification_nm = raw.equip_classification_nm;
  }
}
class equipmentMedium {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.equip_group_id = raw.equip_group_id;
    this.equip_group_cd = raw.equip_group_cd;
    this.equip_group_nm = raw.equip_group_nm;
  }
}
class equipmentSmall {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.equip_class_id = raw.equip_class_id;
    this.equip_class_cd = raw.equip_class_cd;
    this.equip_class_nm = raw.equip_class_nm;
  }
}
class equipmentDetail {
  constructor(raw) {
    this.equip_detail_id = raw.equip_detail_id;
    this.factory_id = raw.factory_id;
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
    this.purchase_date = raw.purchase_date;
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
    this.setup_id = raw.setup_id;
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
    this.insp_document_id = raw.insp_document_id;
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
    this.insp_document_detail_id = raw.insp_document_detail_id;
    this.insp_document_id = raw.insp_document_id;

    this.sortby = !isNaN(parseFloat(raw.sortby))
      ? Number(raw.sortby.toString().replace(/,/g, ""))
      : null;
    this.proc_id = raw.proc_id;
    this.equip_id = raw.equip_id;
    this.insp_proc_gbn = raw.insp_proc_gbn;
    this.insp_item_id = raw.insp_item_id;
    this.insp_item_desc = raw.insp_item_desc;
    this.spec_std = raw.spec_std;
    this.spec_min = !isNaN(parseFloat(raw.spec_min))
      ? Number(raw.spec_min.toString().replace(/,/g, ""))
      : null;
    this.spec_max = !isNaN(parseFloat(raw.spec_max))
      ? Number(raw.spec_max.toString().replace(/,/g, ""))
      : null;
    this.spec_lcl = !isNaN(parseFloat(raw.spec_lcl))
      ? Number(raw.spec_lcl.toString().replace(/,/g, ""))
      : null;
    this.spec_ucl = !isNaN(parseFloat(raw.spec_ucl))
      ? Number(raw.spec_ucl.toString().replace(/,/g, ""))
      : null;
    this.insp_filing_id = raw.insp_filing_id;
    this.insp_tool_id = raw.insp_tool_id;
    this.insp_method_id = raw.insp_method_id;
    this.special_property = raw.special_property;
    this.worker_sample_cnt = !isNaN(parseFloat(raw.worker_sample_cnt))
      ? Number(raw.worker_sample_cnt.toString().replace(/,/g, ""))
      : null;
    this.worker_insp_cycle = raw.worker_insp_cycle;
    this.inspector_sample_cnt = !isNaN(parseFloat(raw.inspector_sample_cnt))
      ? Number(raw.inspector_sample_cnt.toString().replace(/,/g, ""))
      : null;
    this.inspector_insp_cycle = raw.inspector_insp_cycle;
    this.infc_memory_id = raw.infc_memory_id;
    this.remark = raw.remark;
  }
}
class spareReceive {
  constructor(raw) {
    this.spare_receive_id = raw.spare_receive_id;
    this.factory_id = raw.factory_id;
    this.partner_id = raw.partner_id;
    this.supplier_id = raw.supplier_id;
    this.stmt_no = raw.stmt_no;
    this.reg_date = raw.reg_date;
    this.total_price = String(raw.total_price) ? Number(raw.total_price) : null;
    this.total_qty = String(raw.total_qty) ? Number(raw.total_qty) : null;
    this.order_id = raw.order_id;
    this.spare_receive_uid = raw.spare_receive_uid;
    this.remark = raw.remark;
  }
}
class spareReceiveDetail {
  constructor(raw) {
    this.spare_receive_detail_id = raw.spare_receive_detail_id;
    this.spare_receive_id = raw.spare_receive_id;
    this.factory_id = raw.factory_id;
    this.prod_id = raw.prod_id;
    this.unit_id = raw.unit_id;
    this.lot_no = raw.lot_no;
    this.manufactured_lot_no = raw.manufactured_lot_no;
    this.qty = String(raw.qty) ? Number(raw.qty) : null;
    this.price = String(raw.price) ? Number(raw.price) : null;
    this.money_unit_id = raw.money_unit_id;
    this.exchange = String(raw.exchange) ? Number(raw.exchange) : null;
    this.total_price = String(raw.total_price) ? Number(raw.total_price) : null;
    this.unit_qty = String(raw.unit_qty) ? Number(raw.unit_qty) : null;
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
    this.control_plan_id = raw.control_plan_id;
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
    this.control_plan_detail_id = raw.control_plan_detail_id;
    this.control_plan_id = raw.control_plan_id;
    this.order_input_fg = raw.order_input_fg ? true : false;
    this.proc_no = String(raw.proc_no) ? Number(raw.proc_no) : null;
    this.insp_document_detail_id = raw.insp_document_detail_id;
    this.insp_document_id = raw.insp_document_id;
    this.remark = raw.remark;
  }
}
class subdivision {
  constructor(raw) {
    this.work_subdivision_id = raw.work_subdivision_id;
    this.subdivision_date = raw.subdivision_date;
    this.prod_id = raw.prod_id;
    this.remark = raw.remark;
  }
}
class subdivisionDetail {
  constructor(raw) {
    this.work_subdivision_detail_id = raw.work_subdivision_detail_id;
    this.work_subdivision_id = raw.work_subdivision_id;
    this.order_detail_id = raw.order_detail_id;
    this.prod_id = raw.prod_id;
    this.lot_no = raw.lot_no;
    this.before_qty = String(raw.before_subdivision_qty)
      ? Number(raw.before_subdivision_qty)
      : null;
    this.after_qty = String(raw.after_subdivision_qty)
      ? Number(raw.after_subdivision_qty)
      : null;
    this.qty = String(raw.subdivision_qty) ? Number(raw.subdivision_qty) : null;
    this.subdivision_date = raw.subdivision_date;
    this.subdivision_time = raw.subdivision_time;
    this.subdivision_emp_id = raw.subdivision_emp_id;
    this.inv_to_store_id = raw.inv_to_store_id;
    this.inv_to_location_id = raw.inv_to_location_id;
    // this.barcode_no = raw.barcode_no;
    this.remark = raw.remark;
  }
}
class partnerType {
  constructor(raw) {
    this.partner_type_id = raw.partner_type_id;
    this.partner_type_cd = raw.partner_type_cd;
    this.partner_type_nm = raw.partner_type_nm;
  }
}

class partner {
  constructor(raw) {
    this.partner_id = raw.partner_id;
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
    this.spare_release_id = raw.spare_release_id;
    this.line_id = raw.line_id;
    this.equip_detail_id = raw.equip_detail_id;
    this.release_qty = String(raw.release_qty) ? Number(raw.release_qty) : null;
    this.release_emp_id = raw.release_uid;
    this.remark = raw.remark;
  }
}
class lineDepartment {
  constructor(raw) {
    this.line_dept_id = raw.line_dept_id;
    this.line_dept_cd = raw.line_dept_cd;
    this.line_dept_nm = raw.line_dept_nm;
    this.line_id = raw.line_id;
    this.dept_id = raw.dept_id;
  }
}

class productClass {
  constructor(raw) {
    this.prod_class_id = raw.prod_class_id;
    this.prod_class_cd = raw.prod_class_cd;
    this.prod_class_nm = raw.prod_class_nm;
  }
}
class order {
  constructor(raw) {
    this.work_order_id = raw.work_order_id;
    this.work_order_date = raw.work_order_date;
    this.work_start_date = raw.work_start_date;
    this.work_end_date = raw.work_end_date;
    this.work_order_qty = String(raw.work_order_qty)
      ? Number(raw.work_order_qty)
      : null;
    this.complete_fg = raw.complete_fg ? true : false;
    this.complete_date = raw.complete_date;
    this.remark = raw.remark;
  }
}

class orderInput {
  constructor(raw) {
    this.work_order_input_id = raw.work_order_input_id;
    this.spec_lcl = String(raw.spec_lcl) ? Number(raw.spec_lcl) : null;
    this.spec_max = String(raw.spec_max) ? Number(raw.spec_max) : null;
    this.spec_min = String(raw.spec_min) ? Number(raw.spec_min) : null;
    this.spec_std = raw.spec_std;
    this.spec_ucl = String(raw.spec_ucl) ? Number(raw.spec_ucl) : null;
    this.remark = raw.remark;
  }
}

class orderDetail {
  constructor(raw) {
    this.work_order_detail_id = raw.work_order_detail_id;
    this.spec_lcl = String(raw.spec_lcl) ? Number(raw.spec_lcl) : null;
    this.spec_max = String(raw.spec_max) ? Number(raw.spec_max) : null;
    this.spec_min = String(raw.spec_min) ? Number(raw.spec_min) : null;
    this.spec_std = raw.spec_std;
    this.spec_ucl = String(raw.spec_ucl) ? Number(raw.spec_ucl) : null;
    this.remark = raw.remark;
  }
}
class packing {
  constructor(raw) {
    this.work_packing_id = raw.work_packing_id;
    this.packing_emp_id = raw.packing_emp_id;
    this.remark = raw.remark;
  }
}
class weight {
  constructor(raw) {
    this.work_weigh_id = raw.work_weigh_id;
    this.work_weigh_date = raw.work_weigh_date;
    this.work_weigh_time = raw.work_weigh_time;
    this.weigh_emp_id = raw.weigh_emp_id;
    this.input_emp_id = raw.input_emp_id;
  }
}

class weightDetail {
  constructor(raw) {
    this.work_weigh_detail_id = raw.work_weigh_detail_id;
    this.bag_qty = String(raw.bag_qty) ? Number(raw.bag_qty) : null;
    this.input_qty = String(raw.input_qty) ? Number(raw.input_qty) : null;
    this.remark = raw.remark;
  }
}

class productionDownTime {
  constructor(raw) {
    this.work_downtime_id = raw.work_downtime_id;
    this.work_order_id = raw.work_order_id;
    this.line_id = raw.line_id;
    this.proc_id = raw.proc_id;
    this.equip_id = raw.equip_id;
    this.downtime_id = raw.downtime_id;
    this.downtime_start_date = raw.start_date;
    this.downtime_start_time = raw.start_time;
    this.downtime_end_date = raw.end_date;
    this.downtime_end_time = raw.end_time;
    this.downtime = String(raw.downtime) ? Number(raw.downtime) : null;
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
    case "process":
      params = new process(raw);
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
    case "workerGroup":
      params = new workerGroup(raw);
      break;
    case "productGbn":
      params = new productGbn(raw);
      break;
    case "product":
      params = new product(raw);
      break;
    case "productType":
      params = new productType(raw);
      break;
    case "productTypeSmall":
      params = new productTypeSmall(raw);
      break;
    case "productModel":
      params = new productModel(raw);
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
    case "orderInput":
      params = new orderInput(raw);
      break;
    case "orderDetail":
      params = new orderDetail(raw);
      break;
    case "packing":
      params = new packing(raw);
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
    default:
  }
  return params;
}

export default GetPutParams;
