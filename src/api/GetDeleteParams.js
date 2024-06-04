// ✨ DELETE ✨
class factory {
  constructor(raw) {
    this.factory_id = raw.factory_id;
  }
}
class line {
  constructor(raw) {
    this.line_id = raw.line_id;
  }
}
class process {
  constructor(raw) {
    this.proc_id = raw.proc_id;
  }
}
class user {
  constructor(raw) {
    this.uid = raw.uid;
  }
}
class employee {
  constructor(raw) {
    this.emp_id = raw.emp_id;
  }
}
class equipment {
  constructor(raw) {
    this.equip_id = raw.equip_id;
  }
}
class unit {
  constructor(raw) {
    this.unit_id = raw.unit_id;
  }
}
class workerGroup {
  constructor(raw) {
    this.worker_group_id = raw.worker_group_id;
  }
}
class productGbn {
  constructor(raw) {
    this.prod_gbn_id = raw.prod_gbn_id;
  }
}
class product {
  constructor(raw) {
    this.prod_id = raw.prod_id;
  }
}
class productType {
  constructor(raw) {
    this.prod_type_id = raw.prod_type_id;
  }
}
class productTypeSmall {
  constructor(raw) {
    this.prod_type_small_id = raw.prod_type_small_id;
  }
}
class productModel {
  constructor(raw) {
    this.model_id = raw.model_id;
  }
}
class store {
  constructor(raw) {
    this.store_id = raw.store_id;
  }
}
class storeLocation {
  constructor(raw) {
    this.location_id = raw.location_id;
  }
}
class department {
  constructor(raw) {
    this.dept_id = raw.dept_id;
  }
}
class grade {
  constructor(raw) {
    this.grade_id = raw.grade_id;
  }
}
class downtimeType {
  constructor(raw) {
    this.downtime_type_id = raw.downtime_type_id;
  }
}
class downtime {
  constructor(raw) {
    this.downtime_id = raw.downtime_id;
  }
}
class inspFiling {
  constructor(raw) {
    this.insp_filing_id = raw.insp_filing_id;
  }
}
class inspMethod {
  constructor(raw) {
    this.insp_method_id = raw.insp_method_id;
  }
}
class inspTool {
  constructor(raw) {
    this.insp_tool_id = raw.insp_tool_id;
  }
}
class inspItemType {
  constructor(raw) {
    this.insp_item_type_id = raw.insp_item_type_id;
  }
}
class inspItem {
  constructor(raw) {
    this.insp_item_id = raw.insp_item_id;
  }
}
class infcItemType {
  constructor(raw) {
    this.infc_item_type_id = raw.infc_item_type_id;
  }
}
class infcItem {
  constructor(raw) {
    this.infc_item_id = raw.infc_item_id;
  }
}
class infcMemory {
  constructor(raw) {
    this.infc_memory_id = raw.infc_memory_id;
  }
}
class equipmentLarge {
  constructor(raw) {
    this.equip_classification_id = raw.equip_classification_id;
  }
}
class equipmentMedium {
  constructor(raw) {
    this.equip_group_id = raw.equip_group_id;
  }
}
class equipmentSmall {
  constructor(raw) {
    this.equip_class_id = raw.equip_class_id;
  }
}
class equipmentDetail {
  constructor(raw) {
    this.equip_detail_id = raw.equip_detail_id;
  }
}
class setup {
  constructor(raw) {
    this.setup_id = raw.setup_id;
  }
}
class document {
  constructor(raw) {
    this.insp_document_id = raw.insp_document_id;
  }
}
class documentDetail {
  constructor(raw) {
    this.insp_document_detail_id = raw.insp_document_detail_id;
  }
}
class spareReceive {
  constructor(raw) {
    this.spare_receive_id = raw.spare_receive_id;
  }
}
class spareReceiveDetail {
  constructor(raw) {
    this.spare_receive_detail_id = raw.spare_receive_detail_id;
  }
}
class controlPlan {
  constructor(raw) {
    this.control_plan_id = raw.control_plan_id;
  }
}
class controlPlanDetail {
  constructor(raw) {
    this.control_plan_detail_id = raw.control_plan_detail_id;
  }
}
class storeCheck {
  constructor(raw) {
    this.tran_id = raw.tran_id;
  }
}
class subdivision {
  constructor(raw) {
    this.work_subdivision_id = raw.work_subdivision_id;
  }
}
class subdivisionDetail {
  constructor(raw) {
    this.work_subdivision_detail_id = raw.work_subdivision_detail_id;
  }
}
class partnerType {
  constructor(raw) {
    this.partner_type_id = raw.partner_type_id;
  }
}

class partner {
  constructor(raw) {
    this.partner_id = raw.partner_id;
  }
}
class sparepartsIncome {
  constructor(raw) {
    this.spare_income_id = raw.spare_income_id;
  }
}
class sparepartsOutgo {
  constructor(raw) {
    this.spare_release_id = raw.spare_release_id;
  }
}
class lineDepartment {
  constructor(raw) {
    this.line_dept_id = raw.line_dept_id;
  }
}

class productClass {
  constructor(raw) {
    this.prod_class_id = raw.prod_class_id;
  }
}
class orderInput {
  constructor(raw) {
    this.work_order_input_id = raw.work_order_input_id;
  }
}
class orderDetail {
  constructor(raw) {
    this.work_order_detail_id = raw.work_order_detail_id;
  }
}
class order {
  constructor(raw) {
    this.work_order_id = raw.work_order_id;
  }
}
class packing {
  constructor(raw) {
    this.work_packing_id = raw.work_packing_id;
  }
}
class packingDetail {
  constructor(raw) {
    this.work_packing_detail_id = raw.work_packing_detail_id;
  }
}
class weightDetail {
  constructor(raw) {
    this.work_weigh_detail_id = raw.work_weigh_detail_id;
  }
}

class productionDownTime {
  constructor(raw) {
    this.work_downtime_id = raw.work_downtime_id;
  }
}
class equipmentResult {
  constructor(raw) {
    this.insp_result_id = raw.insp_result_id;
  }
}
class WorkerGroupStatus {
  constructor(raw) {
    this.worker_group_status_id = raw.worker_group_status_id;
  }
}
class inspectionResultUpload {
  constructor(raw) {
    this.insp_result_upload_id = raw.insp_result_upload_id;
  }
}
class inspDocument {
  constructor(raw) {
    this.insp_document_id = raw.insp_document_id;
  }
}
class inspDocumentInput {
  constructor(raw) {
    this.insp_document_input_id = raw.insp_document_input_id;
  }
}
class inspDocumentDetail {
  constructor(raw) {
    this.insp_document_detail_id = raw.insp_document_detail_id;
  }
}
class workType {
  constructor(raw) {
    this.work_type_id = raw.work_type_id;
  }
}
class ProductRouting {
  constructor(raw) {
    this.prod_mapping_id = raw.prod_mapping_id;
  }
}
class BuildReport {
  constructor(raw) {
    this.deploy_version_id = raw.deploy_version_id;
  }
}
class itfOrder {
  constructor(raw) {
    this.erp_work_order_no = raw.erp_work_order_no;
  }
}
class lotChange {
  constructor(raw) {
    this.lot_change_id = raw.lot_change_id;
  }
}

/**
 * @param {string} componentName 소문자로 시작
 * @param {any} raw 처리 할 데이터
 * @returns
 */
function GetDeleteParams(componentName, raw) {
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
    case "downtimeType":
      params = new downtimeType(raw);
      break;
    case "downtime":
      params = new downtime(raw);
      break;
    case "grade":
      params = new grade(raw);
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
    case "storeCheck":
      params = new storeCheck(raw);
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
    case "sparepartsIncome":
      params = new sparepartsIncome(raw);
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
    case "orderInput":
      params = new orderInput(raw);
      break;
    case "orderDetail":
      params = new orderDetail(raw);
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
    case "weightDetail":
      params = new weightDetail(raw);
      break;

    case "productionDownTime":
      params = new productionDownTime(raw);
      break;
    case "equipmentResult":
      params = new equipmentResult(raw);
      break;
    case "WorkerGroupStatus":
      params = new WorkerGroupStatus(raw);
      break;
    case "inspectionResultUpload":
      params = new inspectionResultUpload(raw);
      break;
    case "inspDocument":
      params = new inspDocument(raw);
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
    case "ProductRouting":
      params = new ProductRouting(raw);
      break;
    case "BuildReport":
      params = new BuildReport(raw);
      break;
    case "itfOrder":
      params = new itfOrder(raw);
      break;
    case "lotChange":
      params = new lotChange(raw);
      break;

    default:
  }
  return params;
}

export default GetDeleteParams;
