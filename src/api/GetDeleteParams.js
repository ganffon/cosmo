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
class workingGroup {
  constructor(raw) {
    this.worker_group_id = raw.worker_group_id;
  }
}
class product {
  constructor(raw) {
    this.prod_id = raw.prod_id;
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
class inspectFiling {
  constructor(raw) {
    this.insp_filing_id = raw.insp_filing_id;
  }
}
class inspectMethod {
  constructor(raw) {
    this.insp_method_id = raw.insp_method_id;
  }
}
class inspectTool {
  constructor(raw) {
    this.insp_tool_id = raw.insp_tool_id;
  }
}
class inspectType {
  constructor(raw) {
    this.insp_item_type_id = raw.insp_item_type_id;
  }
}
class inspectItem {
  constructor(raw) {
    this.insp_item_id = raw.insp_item_id;
  }
}
class interfaceItemType {
  constructor(raw) {
    this.infc_item_type_id = raw.infc_item_type_id;
  }
}
class interfaceItem {
  constructor(raw) {
    this.infc_item_id = raw.infc_item_id;
  }
}
class interfaceMemory {
  constructor(raw) {
    this.infc_memory_id = raw.infc_memory_id;
  }
}
class equipmentLarge {
  constructor(raw) {
    this.classification_id = raw.classification_id;
  }
}
class equipmentMedium {
  constructor(raw) {
    this.group_id = raw.group_id;
  }
}
class equipmentSmall {
  constructor(raw) {
    this.class_id = raw.class_id;
  }
}
class equipmentDetail {
  constructor(raw) {
    this.eqm_detail_id = raw.eqm_detail_id;
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
    case "setup":
      params = new setup(raw);
      break;
    case "document":
      params = new document(raw);
      break;
    case "documentDetail":
      params = new documentDetail(raw);
      break;
    default:
  }

  return params;
}

export default GetDeleteParams;
