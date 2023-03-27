// ✨ ComboBox ✨
class process {
  constructor(raw) {
    this.text = raw.proc_nm;
    this.value = raw.proc_id;
  }
}

function GetComboParams(componentName, raw) {
  let params = "";
  switch (componentName) {
    case "ProcessSet":
      params = new process(raw);
      break;
    default:
  }
  return params;
}

export default GetComboParams;
