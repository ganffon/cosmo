import { LoginStateChk } from "custom/LoginStateChk";
import ContentsArea from "components/layout/common/ContentsArea";
import * as S from "pages/mes/style/oneGrid.styled";
import InputSearch from "../../../../components/input/InputSearch";
import useInputSet from "../../../../custom/useInputSet";
import { useContext, useEffect, useRef, useState } from "react";
import { LayoutContext } from "../../../../components/layout/common/Layout";
import StoreSet from "../store/StoreSet";
import NoticeSet from "./NoticeSet";
import DatePicker from "../../../../components/datetime/DatePicker";
import DateTime from "../../../../components/datetime/DateTime";
import BtnComponent from "../../../../components/button/BtnComponent";
import GridSingle from "../../../../components/grid/GridSingle";
import restURI from "json/restURI.json";
import restAPI from "../../../../api/restAPI";
import ModalNew from "../../../../components/modal/ModalNew";
import BackDrop from "../../../../components/backdrop/BackDrop";
import NoticeModal from "./NoticeModal";
import AlertDelete from "../../../../components/onlySearchSingleGrid/modal/AlertDelete";
import NoticeAlertModal from "../../../../components/alert/NoticeAlertModal";

function Notice(props) {
  LoginStateChk();
  const { currentMenuName, isAllScreen } = useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const refModalGrid = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReadOnlyOpen, setIsReadOnlyOpen] = useState(false);

  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [searchToggle, setSearchToggle] = useState(false);
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
    endDate: DateTime().dateFull,
  });
  const [onClickData, setOnClickData] = useState(null);

  /*Set변수 설정*/
  const { rowHeaders, header, columns, columnOptions, inputSet, datePickerSet } = NoticeSet(isEditMode);
  /*Set변수 설정*/

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);

  const onClickModalAddRow = () => {
    refModalGrid?.current?.gridInst?.appendRow();
  };

  let rowKey;
  const onClickModalGrid = (e) => {
    rowKey = e.rowKey;
  };
  const onClickModalCancelRow = () => {
    refModalGrid?.current?.gridInst?.removeRow(rowKey);
  };

  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
    }
  };

  /*버튼 함수 부분*/
  const onClickSearch = async () => {
    setIsBackDrop(true);
    let URI = restURI.notice + `?reg_date=${dateText.startDate}`;
    if (inputTextChange !== undefined) {
      if (inputTextChange.notice_title !== "") {
        URI = URI + `&title=${inputTextChange.notice_title}`;
      }
      if (inputTextChange.notice_content !== "") {
        URI = URI + `&contents=${inputTextChange.notice_content}`;
      }
    }

    const data = await restAPI.get(URI);
    await setGridData(data?.data?.data?.rows);
    setIsBackDrop(false);
  };
  const onClickNew = () => {
    setIsModalOpen(true);
  };
  const onClickEdit = () => {
    if (onClickData !== null) {
      setIsEditMode(true);
      setIsModalOpen(true);
    }
  };
  const onClickDelete = () => {
    const data = refSingleGrid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      setIsDeleteAlertOpen(true);
    }
  };
  const handleDelete = async () => {
    const data = refSingleGrid?.current?.gridInst?.getCheckedRows();
    if (data !== undefined) {
      setIsBackDrop(true);
      await restAPI
        .delete(restURI.notice, { data })
        .then((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.data?.message,
            severity: "success",
          });
        })
        .catch((res) => {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.response?.data?.message,
            severity: "error",
          });
        })
        .finally(() => {
          setIsBackDrop(false);
          setIsDeleteAlertOpen(false);
          setSearchToggle(!searchToggle);
        });
    }
  };

  function onClickModalClose() {
    setIsModalOpen(false);
    setIsEditMode(false);
    setIsReadOnlyOpen(false);
    setOnClickData(null);
    setSearchToggle(!searchToggle);
  }

  const onClickGrid = (e) => {
    if (e.targetType === "cell") {
      let rowKey = e.rowKey;
      setOnClickData(e?.instance?.store?.data?.rawData[rowKey]);
    }
  };

  const openReadOnlyModal = (e) => {
    if (onClickData !== null) {
      setIsReadOnlyOpen(true);
    }
  };

  /*버튼 함수 부분*/

  useEffect(() => {
    onClickSearch();
  }, [searchToggle]);

  return (
    <ContentsArea>
      <S.ShadowBoxButton>
        <S.ToolWrap>
          <S.SearchWrap>
            <DatePicker datePickerSet={datePickerSet} dateText={dateText} setDateText={setDateText} />
            {inputSet.map((v) => (
              <InputSearch
                key={v.id}
                id={v.id}
                name={v.name}
                handleInputTextChange={handleInputTextChange}
                onClickSearch={onClickSearch}
                onKeyDown={onKeyDown}
              />
            ))}
          </S.SearchWrap>
          <S.ButtonWrap>
            <BtnComponent btnName={"Search"} onClick={onClickSearch} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.ButtonWrap>
          <BtnComponent btnName={"Detail"} onClick={openReadOnlyModal} />
          <BtnComponent btnName={"New"} onClick={onClickNew} />
          <BtnComponent btnName={"Edit"} onClick={onClickEdit} />
          <BtnComponent btnName={"Delete"} onClick={onClickDelete} />
        </S.ButtonWrap>
        <S.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeaders}
            header={header}
            data={gridData}
            draggable={false}
            refGrid={refSingleGrid}
            onClickGrid={onClickGrid}
          />
        </S.GridWrap>
      </S.ShadowBoxGrid>
      {isModalOpen ? (
        <NoticeModal onClickModalClose={onClickModalClose} isEditMode={isEditMode} onClickData={onClickData} />
      ) : null}
      {isReadOnlyOpen ? (
        <NoticeModal
          onClickModalClose={onClickModalClose}
          isEditMode={isEditMode}
          onClickData={onClickData}
          readOnly={true}
        />
      ) : null}
      {isDeleteAlertOpen ? (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={handleDelete}
          onCancel={() => {
            setIsDeleteAlertOpen(false);
          }}
        />
      ) : null}
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default Notice;
