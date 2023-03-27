// ✨ ComboBox ✨
class factory {
  constructor(raw) {
    this.factory_id = raw.factory_id;
    this.factory_nm = raw.factory_nm;
  }
}
class process {
  constructor(raw) {
    this.text = raw.proc_nm;
    this.value = raw.proc_id;
  }
}

async function GetComboParams(componentName, raw) {
  let params = "";
  switch (componentName) {
    case "Factory":
      params = new factory();
      break;
    case "ProcessSet":
      params = new process(raw);
      break;
    default:
  }
  console.log(JSON.stringify(params));
  return JSON.stringify(params);
}

export default GetComboParams;
