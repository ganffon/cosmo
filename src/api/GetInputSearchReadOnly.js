function GetInputSearchReadOnly(inputBoxID, inputSearchValue) {
  let params = "";
  let cnt = 0;
  //🔸inputBox 가 있다면?!
  if (inputBoxID.length > 0) {
    //🔸inputBox 갯수만큼 반복!
    for (let i = 0; i < inputBoxID.length; i++) {
      //🔸inputBox에 검색조건 있으면 가져오기
      if (inputSearchValue.length > 0) {
        //🔸처음 가져오는 것이면 params에 ? 세팅
        if (cnt === 0) {
          params = "?";
          cnt++;
        }
        params = params + inputBoxID[i] + "=" + inputSearchValue[i] + "&";
      }
    }
    //🔸마지막에 찍힌 & 기호 제거
    params = params.slice(0, params.length - 1);
  }
  return params;
}

export default GetInputSearchReadOnly;
