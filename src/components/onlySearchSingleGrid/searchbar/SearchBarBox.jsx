import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import CssBaseline from "@mui/material/CssBaseline";
// ⬇️ reference of page
import InputBox from "./InputBox";
import ButtonBox from "./ButtonBox";
import InsertModal from "components/onlySearchSingleGrid/modal/InsertModal";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import { LayoutContext } from "components/layout/common/Layout";
import { OnlySearchSingleGridContext } from "components/onlySearchSingleGrid/OnlySearchSingleGrid";
import restAPI from "api/restAPI";
import NoticeSnack from "components/alert/NoticeSnack";
import * as S from "./SearchBarBox.styled";
import InputAdornment from "@mui/material/InputAdornment";

export const SearchBarBoxContext = createContext();

function SearchBarBox(props) {
  const {
    componentName,
    columns,
    columnOptions,
    header,
    uri,
    datePickerSet,
    inputSet,
    btnDisabled,
  } = props;
  const { currentMenuName, isModalOpen, setIsModalOpen } =
    useContext(LayoutContext);
  const {
    refSingleGrid,
    setSingleGridData,
    isBackDrop,
    setIsBackDrop,
    setIsEditMode,
  } = useContext(OnlySearchSingleGridContext);
  //🔸조회 성공, 실패 스낵바 팝업 조건
  const [alertOpen, setAlertOpen] = useState({
    open: false,
  });
  const [alertDeleteOpen, setAlertDeleteOpen] = useState(false);
  //🔸inputSet에 세팅된 갯수만큼 useState 초기값을 위한 객체 만들기
  const inputSetInit = useCallback(
    (data) => {
      const inputBox = new Array(); //🔸inputBox에 할당 된 id값 저장하기 위한 변수
      const jsonObj = new Object();
      for (let i = 0; i < data.length; i++) {
        jsonObj[data[i].id] = "";
        inputBox.push(data[i].id);
      }
      return [inputBox, jsonObj];
    },
    [currentMenuName]
  );

  const [inputText, setInputText] = useState();
  const inputTextChange = (e) => {
    setInputText({ ...inputText, [e.target.id]: e.target.value });
  };
  const [inputBoxID, setInputBoxID] = useState([]);
  const [dateText, setDateText] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const data = inputSetInit(inputSet);
    setInputBoxID(data[0]);
    setInputText(data[1]);
  }, [currentMenuName]);

  //🔽 REST API 조회 URI 만들기
  const makeSearchParams = () => {
    try {
      let params = "";
      let cnt = 0;
      //🔸inputBox 가 있다면?!
      if (inputBoxID.length > 0) {
        //🔸inputBox 갯수만큼 반복!
        for (let i = 0; i < inputBoxID.length; i++) {
          //🔸inputBox에 검색조건 있으면 가져오기
          if (inputText[inputBoxID[i]].length > 0) {
            //🔸처음 가져오는 것이면 params에 /search? 세팅
            if (cnt === 0) {
              params = "/search?";
              cnt++;
            }
            params =
              params + inputBoxID[i] + "=" + inputText[inputBoxID[i]] + "&";
          }
        }
        //🔸마지막에 찍힌 & 기호 제거
        params = params.slice(0, params.length - 1);
        return params;
      }
      params = "";
      return params;
    } catch {
      //🔸화면 처음 들어왔을 때 빈값 넘겨줌
      return "";
    }
  };

  useEffect(() => {
    onClickSearch(true);
  }, [currentMenuName]);

  const onClickSearch = async (props) => {
    refSingleGrid?.current?.gridInst?.finishEditing();
    //🔸검색버튼을 이미 눌러서 Loading ProgressBar가 돌고있다면 API 호출 못함
    if (isBackDrop === false) {
      try {
        setIsBackDrop(true);
        const params = makeSearchParams();
        const readURI = uri + params;
        const gridData = await restAPI.get(readURI);
        setSingleGridData(gridData?.data?.data?.rows);
        props &&
          setAlertOpen({
            ...alertOpen,
            open: true,
            message: "조회 성공",
            severity: "success",
          });
      } catch {
        setAlertOpen({
          ...alertOpen,
          open: true,
          message: "조회 실패",
          severity: "error",
        });
      } finally {
        setIsBackDrop(false);
      }
    }
  };

  const onClickNew = () => {
    setIsModalOpen(true);
  };

  const onClickEdit = () => {
    setIsEditMode(true);
  };

  const onClickDelete = () => {
    const data = refSingleGrid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setAlertDeleteOpen(true);
    }
  };

  const handleDelete = async () => {
    refSingleGrid?.current?.gridInst?.finishEditing();
    const data = refSingleGrid?.current?.gridInst
      ?.getCheckedRows()
      ?.map((v) => ({
        line_id: v.line_id,
      }));
    if (data.length !== 0 && isBackDrop === false) {
      setIsBackDrop(true);
      await restAPI
        .delete(uri, { data })
        .then((res) => {
          setAlertOpen({
            ...alertOpen,
            open: true,
            message: res.data.message,
            severity: "success",
          });
        })
        .catch((res) => {
          setAlertOpen({
            ...alertOpen,
            open: true,
            message: res.response.data.message,
            severity: "error",
          });
        })
        .finally(() => {
          setIsBackDrop(false);
          setAlertDeleteOpen(false);
          onClickSearch(false);
        });
    }
  };

  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];

  return (
    <SearchBarBoxContext.Provider
      value={{
        dateText,
        setDateText,
        setInputText,
        inputTextChange,
        onClickSearch,
        onClickNew,
        onClickDelete,
        handleDelete,
        onClickEdit,
        alertOpen,
        setAlertOpen,
        setAlertDeleteOpen,
      }}
    >
      <S.SearchBarBox>
        {/* {componentName === "LineSet" && (
          <S.ComboBox
            disablePortal
            id="combo-box-demo"
            size="small"
            options={top100Films}
            renderInput={(params) => (
              <S.TextF {...params} label="test" size="small" />
            )}
          />
        )} */}
        <InputBox datePickerSet={datePickerSet} inputSet={inputSet} />
        <ButtonBox
          componentName={componentName}
          uri={uri}
          btnDisabled={btnDisabled}
        />
        <NoticeSnack state={alertOpen} setState={setAlertOpen} />
        {alertDeleteOpen ? <AlertDelete /> : null}
        {isModalOpen ? (
          <InsertModal
            columns={columns}
            columnOptions={columnOptions}
            header={header}
            uri={uri}
            onClickSearch={onClickSearch}
          />
        ) : null}
      </S.SearchBarBox>
    </SearchBarBoxContext.Provider>
  );
}

export default SearchBarBox;
