const getParams = (params) => {
  let query = [];
  for (let key in params) {
    if (params.hasOwnProperty(key) && params[key] !== null && params[key] !== undefined && params[key] !== "") {
      // 배열인지 확인
      if (Array.isArray(params[key])) {
        for (let value of params[key]) {
          query.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        }
      } else {
        query.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
      }
    }
  }
  return query.length ? "?" + query.join("&") : "";
};

export { getParams };
