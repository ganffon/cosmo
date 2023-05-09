function GetCboSearchParams(beforeParams = null, comboValue) {
  let params = "";
  let key;
  if (beforeParams.length !== 0) {
    for (key of Object.keys(comboValue)) {
      if (comboValue[key] !== null) {
        params = params + beforeParams + `&${key}=${comboValue[key]}`;
      }
    }
    if (params.length === 0) {
      params = beforeParams;
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
