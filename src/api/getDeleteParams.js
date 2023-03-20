class lines {
  constructor(raw) {
    this.line_id = raw.line_id;
  }
}

function GetDeleteParams(componentName, raw) {
  let params = "";

  switch (componentName) {
    case "LineSet":
      params = new lines(raw);
      break;
    default:
  }

  return JSON.stringify(params);
}

export default GetDeleteParams;
