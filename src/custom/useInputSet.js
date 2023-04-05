import { useState, useCallback, useEffect } from "react";

const useInputSet = (currentMenuName, inputSet) => {
  const [inputTextChange, setInputTextChange] = useState();
  const [inputBoxID, setInputBoxID] = useState([]);

  const handleInputSetInit = useCallback(
    (data) => {
      const inputBoxID = new Array();
      const jsonObj = new Object();
      for (let i = 0; i < data.length; i++) {
        inputBoxID.push(data[i].id);
        jsonObj[data[i].id] = "";
      }
      return [inputBoxID, jsonObj];
    },
    [currentMenuName]
  );

  useEffect(() => {
    const data = handleInputSetInit(inputSet);
    setInputBoxID(data[0]);
    setInputTextChange(data[1]);
  }, [currentMenuName]);

  return [inputBoxID, inputTextChange, setInputTextChange];
};

export default useInputSet;
