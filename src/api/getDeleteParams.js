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
class Equipment {
  constructor(raw) {
    this.equip_id = raw.equip_id;
  }
}
class Unit {
  constructor(raw) {
    this.unit_id = raw.unit_id;
  }
}

function GetDeleteParams(componentName, raw) {
  let params = "";

  switch (componentName) {
    case "FactorySet":
      params = new factory(raw);
      break;
    case "LineSet":
      params = new line(raw);
      break;
    case "EquipmentSet":
      params = new Equipment(raw);
      break;
    case "UnitSet":
      params = new Unit(raw);
      break;
    default:
  }

  return params;
}

export default GetDeleteParams;
