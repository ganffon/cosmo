class documentDetailIncludeHeader {
  constructor(raw) {
    this.insp_document_id = raw.H_insp_document_id;
    this.factory_id = raw.H_factory_id;
    this.insp_document_no = raw.H_insp_document_no;
    this.line_id = raw.H_line_id;
    this.line_nm = raw.H_line_nm;
    this.prod_id = raw.H_prod_id;
    this.prod_no = raw.H_prod_no;
    this.prod_nm = raw.H_prod_nm;
    this.reg_date = raw.H_reg_date;
    this.apply_date = raw.H_apply_date;
    this.apply_fg = raw.H_apply_fg ? true : false;
    this.contents = raw.H_contents;
    this.remark = raw.H_remark;
    this.insp_document_detail_id = raw.insp_document_detail_id;
    this.insp_document_id = raw.insp_document_id;
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
    this.spec_min = raw.spec_min ? Number(raw.spec_min) : null;
    this.spec_max = raw.spec_max ? Number(raw.spec_max) : null;
    this.spec_lcl = raw.spec_lcl ? Number(raw.spec_lcl) : null;
    this.spec_ucl = raw.spec_ucl ? Number(raw.spec_ucl) : null;
    this.insp_filing_id = raw.insp_filing_id;
    this.insp_filing_nm = raw.insp_filing_nm;
    this.insp_tool_id = raw.insp_tool_id;
    this.insp_tool_nm = raw.insp_tool_nm;
    this.insp_method_id = raw.insp_method_id;
    this.insp_method_nm = raw.insp_method_nm;
    this.special_property = raw.special_property;
    this.worker_sample_cnt = raw.worker_sample_cnt
      ? Number(raw.worker_sample_cnt)
      : null;
    this.worker_insp_cycle = raw.worker_insp_cycle;
    this.inspector_sample_cnt = raw.inspector_sample_cnt
      ? Number(raw.inspector_sample_cnt)
      : null;
    this.inspector_insp_cycle = raw.inspector_insp_cycle;
    this.infc_memory_id = raw.infc_memory_id;
    this.remark = raw.remark;
    this.create_at = raw.create_at;
    this.create_uid = raw.create_uid;
    this.update_at = raw.update_at;
    this.update_uid = raw.update_uid;
    this.delete_at = raw.delete_at;
    this.delete_uid = raw.delete_uid;
  }
}

function GetIncludeHeader(componentName, raw) {
  let params = "";
  if (raw !== undefined) {
    switch (componentName) {
      case "documentDetailIncludeHeader":
        params = new documentDetailIncludeHeader(raw);
        break;
      default:
    }
  }
  return params;
}

export default GetIncludeHeader;
