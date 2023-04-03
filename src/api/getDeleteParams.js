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

function getDeleteParams(componentName, raw) {
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

export default getDeleteParams;
