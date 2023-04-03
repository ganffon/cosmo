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

function GetPutParams(componentName, raw) {
  let params = "";

  switch (componentName) {
    case "FactorySet":
      params = new factory(raw);
      break;
    case "LineSet":
      params = new line(raw);
      break;
    case "EquipmentSet":
      params = new equipment(raw);
      break;
    case "UnitSet":
      params = new unit(raw);
      break;
    case "WorkingGroupSet":
      params = new workingGroup(raw);
      break;
    default:
  }
  return params;
}

export default GetPutParams;
