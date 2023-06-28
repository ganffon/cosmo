// ✨ SEARCH ✨
class storeFrom {
  constructor(raw) {
    this.from_store_id = raw.store_id;
    this.from_store_nm = raw.store_nm;
    this.from_location_id = raw.location_id;
    this.from_location_nm = raw.location_nm;
  }
}
class documentDetailIncludeHeader {
  constructor(raw) {
    this.insp_document_id = raw.insp_document_id;
    this.insp_document_no = raw.insp_document_no;
    this.line_id = raw.line_id;
    this.line_nm = raw.line_nm;
    this.prod_id = raw.prod_id;
    this.prod_cd = raw.prod_cd;
    this.prod_nm = raw.prod_nm;
    this.insp_document_reg_date = raw.insp_document_reg_date;
    this.apply_date = raw.apply_date;
    this.apply_fg = raw.apply_fg ? true : false;
    this.contents = raw.contents;
    this.remark = raw.remark;
    this.insp_document_detail_id = raw.insp_document_detail_id;
    this.sortby = raw.sortby;
    this.factory_id = raw.factory_id;
    this.proc_id = raw.proc_id;
    this.proc_nm = raw.proc_nm;
    this.equip_id = raw.equip_id;
    this.equip_nm = raw.equip_nm;
    this.insp_proc_gbn = raw.insp_proc_gbn;
    this.insp_item_type_id = raw.insp_item_type_id;
    this.insp_item_type_nm = raw.insp_item_type_nm;
    this.insp_item_id = raw.insp_item_id;
    this.insp_item_nm = raw.insp_item_nm;
    this.insp_item_desc = raw.insp_item_desc;
    this.spec_std = raw.spec_std;
    this.spec_min = String(raw.spec_min) ? Number(raw.spec_min) : null;
    this.spec_max = String(raw.spec_max) ? Number(raw.spec_max) : null;
    this.spec_lcl = String(raw.spec_lcl) ? Number(raw.spec_lcl) : null;
    this.spec_ucl = String(raw.spec_ucl) ? Number(raw.spec_ucl) : null;
    this.insp_filing_id = raw.insp_filing_id;
    this.insp_filing_nm = raw.insp_filing_nm;
    this.insp_tool_id = raw.insp_tool_id;
    this.insp_tool_nm = raw.insp_tool_nm;
    this.insp_method_id = raw.insp_method_id;
    this.insp_method_nm = raw.insp_method_nm;
    this.special_property = raw.special_property;
    this.worker_sample_cnt = String(raw.worker_sample_cnt) ? Number(raw.worker_sample_cnt) : null;
    this.worker_insp_cycle = raw.worker_insp_cycle;
    this.inspector_sample_cnt = String(raw.inspector_sample_cnt) ? Number(raw.inspector_sample_cnt) : null;
    this.inspector_insp_cycle = raw.inspector_insp_cycle;
    this.infc_memory_id = raw.infc_memory_id;
    this.remark = raw.detail_remark;
    this.create_at = raw.create_at;
    this.create_user_nm = raw.create_user_nm;
    this.update_at = raw.update_at;
    this.update_user_nm = raw.update_user_nm;
    this.delete_at = raw.delete_at;
    this.delete_user_nm = raw.delete_user_nm;
  }
}
class releaseUser {
  constructor(raw) {
    this.dept_nm = raw.dept_nm;
    this.grade_nm = raw.grade_nm;
    this.release_uid = raw.emp_id;
    this.emp_cd = raw.emp_cd;
    this.release_nm = raw.emp_nm;
  }
}
class prdOrderRequest {
  constructor(raw) {
    this.request_no = raw.request_no;
    this.prod_id = raw.prod_id;
    this.prod_cd = raw.prod_cd;
    this.prod_nm = raw.prod_nm;
    this.partner_nm = raw.request_partner_nm;
    this.request_date = raw.request_date;
    this.request_work_qty = raw.request_work_qty;
    this.sal_order_no = raw.sal_order_no;
    this.request_dept_nm = raw.request_dept_nm;
    this.request_emp_nm = raw.request_emp_nm;
  }
}
class weightEmployee {
  constructor(raw) {
    this.dept_nm = raw.dept_nm;
    this.grade_nm = raw.grade_nm;
    this.weigh_emp_id = raw.emp_id;
    this.emp_cd = raw.emp_cd;
    this.weigh_emp_nm = raw.emp_nm;
    this.worker_group_nm = raw.worker_group_nm;
  }
}

class inputEmployee {
  constructor(raw) {
    this.dept_nm = raw.dept_nm;
    this.grade_nm = raw.grade_nm;
    this.input_emp_id = raw.emp_id;
    this.emp_cd = raw.emp_cd;
    this.input_emp_nm = raw.emp_nm;
    this.worker_group_nm = raw.worker_group_nm;
  }
}
class storeIncludeLocation {
  constructor(raw) {
    this.inv_to_store_id = raw.store_id;
    this.store_nm = raw.store_nm;
    this.inv_to_location_id = raw.location_id;
    this.location_nm = raw.location_nm;
  }
}

/**
 * @param {string} componentName 소문자로 시작
 * @param {any} raw 처리 할 데이터
 * @returns
 */
function GetSearchParams(componentName, raw) {
  let params = "";
  if (raw !== undefined) {
    switch (componentName) {
      case "storeFrom":
        params = new storeFrom(raw);
        break;
      case "documentDetailIncludeHeader":
        params = new documentDetailIncludeHeader(raw);
        break;
      case "releaseUser":
        params = new releaseUser(raw);
        break;
      case "prdOrderRequest":
        params = new prdOrderRequest(raw);
        break;
      case "weightEmployee":
        params = new weightEmployee(raw);
        break;
      case "inputEmployee":
        params = new inputEmployee(raw);
        break;
      case "storeIncludeLocation":
        params = new storeIncludeLocation(raw);
        break;

      default:
    }
  }
  return params;
}

export default GetSearchParams;
