function GetCboSearchParams(beforeParams = null, comboValue) {
  let params = "";
  let key;
  if (beforeParams) {
    for (key of Object.keys(comboValue)) {
      if (comboValue[key] !== null) {
        params = params + `&${key}=${comboValue[key]}`;
      }
    }
  } else {
    params = "?";
    for (key of Object.keys(comboValue)) {
      if (comboValue[key] !== null) {
        params = params + `${key}=${comboValue[key]}&`;
      }
    }
    params = params.slice(0, params.length - 1);
  }
  return params;
}
export default GetCboSearchParams;
