import { useContext, useState, useEffect, useRef, useReducer } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";

import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import BuildReportSet from "./BuildReportSet";
import CloseIcon from "@mui/icons-material/Close";
import * as S from "./BuildReport.styled";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import InputPaper from "components/input/InputPaper";
import DateTime from "components/datetime/DateTime";
import NoticeSnack from "components/alert/NoticeSnack";
import GetDeleteParams from "api/GetDeleteParams";

export function BuildReport(props) {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const { rowNumCheck, rowNum, header, columns, columnOptions } = BuildReportSet(onEditBtn, onApplyBtn);
  const [isEdit, setIsEdit] = useState(false);
  function onEditBtn(e, rowKey) {
    const Grid = refSingleGrid.current?.gridInst;
    const selectedRow = Grid?.store?.data?.rawData[rowKey];
    const key = ["deployVersionID", "title", "contents"];
    const value = [selectedRow.deploy_version_id, selectedRow.title, selectedRow.contents];
    for (let i = 0; i < key.length; i++) {
      handleReport(key[i], value[i]);
    }
    setIsEdit(true);
  }
  const handleReport = (key, value) => {
    reportDispatch({ type: "UPDATE", key, value });
  };
  async function onApplyBtn(e, rowKey) {
    const Grid = refSingleGrid.current?.gridInst;
    const selectedRow = Grid?.store?.data?.rawData[rowKey];

    const data = [
      {
        deploy_version_id: selectedRow.deploy_version_id,
        apply_fg: !selectedRow.apply_fg,
      },
    ];
    try {
      setIsBackDrop(true);
      const result = await restAPI.put(restURI.buildReport, data);

      setIsEdit(false);
      reportDispatch({ type: "RESET" });
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result?.data?.message,
        severity: "success",
        location: "bottomRight",
      });
      onSearch();
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    } finally {
      setIsBackDrop(false);
    }
  }
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    if (refSingleGrid?.current !== null) {
      refSingleGrid?.current?.gridInst?.refreshLayout();
    }
  }, [isMenuSlide]);
  useEffect(() => {
    onSearch();
  }, []);

  const [isNew, setIsNew] = useState(false);
  const onNew = () => {
    setIsNew(true);
  };
  const reportReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE":
        return { ...state, [action.key]: action.value };
      case "RESET":
        return {};
      default:
        return state;
    }
  };
  const [report, reportDispatch] = useReducer(reportReducer, {});

  const handleInputChange = (key, value) => {
    reportDispatch({ type: "UPDATE", key, value });
  };

  const onSave = async () => {
    const data = [
      {
        version: DateTime().version,
        title: report.title,
        contents: report.contents,
        apply_fg: false,
        remark: "",
      },
    ];

    try {
      setIsBackDrop(true);
      const result = await restAPI.post(restURI.buildReport, data);

      setIsNew(false);
      reportDispatch({ type: "RESET" });

      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result?.data?.message,
        severity: "success",
        location: "bottomRight",
      });

      onSearch();
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    } finally {
      setIsBackDrop(false);
    }
  };
  const onSearch = async () => {
    try {
      setIsBackDrop(true);
      let versionParam,
        titleParam,
        params = "";
      if (inputSearch.version) {
        versionParam = `version=${inputSearch.version}&`;
        params = params + versionParam;
      }
      if (inputSearch.title) {
        titleParam = `title=${inputSearch.title}&`;
        params = params + titleParam;
      }
      if (params) {
        params = params.slice(0, -1);
      }
      const result = await restAPI.get(restURI.buildReport + "?" + params);

      setGridData(result?.data?.data?.rows);

      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result?.data?.message,
        severity: "success",
        location: "bottomRight",
      });
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    } finally {
      setIsBackDrop(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refSingleGrid?.current?.gridInst;
      Grid?.finishEditing();

      const data = Grid?.getCheckedRows()?.map((raw) => GetDeleteParams("BuildReport", raw));

      if (data) {
        const result = await restAPI.delete(restURI.buildReport, { data });
        onSearch();
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: result?.data?.message,
          severity: "success",
          location: "bottomRight",
        });
      }
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    } finally {
      setIsBackDrop(false);
    }
  };
  const [inputSearch, setInputSearch] = useState({});
  const handleInputTextChange = (e) => {
    setInputSearch({ ...inputSearch, [e.target.id]: e.target.value });
  };
  const onEdit = async () => {
    const data = [
      {
        deploy_version_id: report.deployVersionID,
        title: report.title,
        contents: report.contents,
      },
    ];
    try {
      setIsBackDrop(true);
      const result = await restAPI.put(restURI.buildReport, data);

      setIsEdit(false);
      reportDispatch({ type: "RESET" });
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result?.data?.message,
        severity: "success",
        location: "bottomRight",
      });
      onSearch();
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    } finally {
      setIsBackDrop(false);
    }
  };
  const newBuildReport = () => {
    return (
      <ModalWrapMulti width={"50%"} height={"80%"}>
        <S.HeaderBox>
          <S.Title className={"bold"}>{"배포 정보 작성"}</S.Title>
          <S.ButtonClose
            color="primary"
            aria-label="close"
            onClick={() => {
              setIsNew(false);
              reportDispatch({ type: "RESET" });
            }}
          >
            <CloseIcon />
          </S.ButtonClose>
        </S.HeaderBox>
        <S.MainBox>
          <S.TitleWrap>
            <S.TitleGroup>
              <S.Title>{"배포 요약"}</S.Title>
              <BtnComponent btnName={"Save"} onClick={onSave} />
            </S.TitleGroup>
            <InputPaper
              readOnly={false}
              width={"100%"}
              value={report.title || ""}
              onTextChange={(e) => {
                handleInputChange("title", e.target.value);
              }}
            />
          </S.TitleWrap>
          <S.ContentsWrap>
            <S.Title>{"배포 내용"}</S.Title>
            <S.Issue
              rows={4}
              value={report.contents || ""}
              placeholder="배포내용에 대해 작성해주세요."
              onChange={(e) => {
                handleInputChange("contents", e.target.value);
              }}
            />
          </S.ContentsWrap>
        </S.MainBox>
      </ModalWrapMulti>
    );
  };
  const editBuildReport = () => {
    return (
      <ModalWrapMulti width={"50%"} height={"80%"}>
        <S.HeaderBox>
          <S.Title className={"bold"}>{"배포 정보 작성"}</S.Title>
          <S.ButtonClose
            color="primary"
            aria-label="close"
            onClick={() => {
              setIsEdit(false);
              reportDispatch({ type: "RESET" });
            }}
          >
            <CloseIcon />
          </S.ButtonClose>
        </S.HeaderBox>
        <S.MainBox>
          <S.TitleWrap>
            <S.TitleGroup>
              <S.Title>{"배포 요약"}</S.Title>
              <BtnComponent btnName={"Save"} onClick={onEdit} />
            </S.TitleGroup>
            <InputPaper
              readOnly={false}
              width={"100%"}
              value={report.title || ""}
              onTextChange={(e) => {
                handleInputChange("title", e.target.value);
              }}
            />
          </S.TitleWrap>
          <S.ContentsWrap>
            <S.Title>{"배포 내용"}</S.Title>
            <S.Issue
              rows={4}
              value={report.contents || ""}
              placeholder="배포내용에 대해 작성해주세요."
              onChange={(e) => {
                handleInputChange("contents", e.target.value);
              }}
            />
          </S.ContentsWrap>
        </S.MainBox>
      </ModalWrapMulti>
    );
  };

  return (
    <ContentsArea>
      <S.Header>
        <S.HeaderInputWrap>
          <InputSearch
            id={"version"}
            name={"Version"}
            handleInputTextChange={handleInputTextChange}
            // onClickSearch={onClickSearch}
            // onKeyDown={onKeyDown}
          />
          <InputSearch
            id={"title"}
            name={"Title"}
            handleInputTextChange={handleInputTextChange}
            // onClickSearch={onClickSearch}
            // onKeyDown={onKeyDown}
          />
        </S.HeaderInputWrap>
        <BtnComponent btnName={"Search"} onClick={onSearch} />
      </S.Header>
      <S.Main>
        <S.GridButton>
          <BtnComponent btnName={"New"} onClick={onNew} />
          <BtnComponent btnName={"Delete"} onClick={onDelete} />
        </S.GridButton>
        <S.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowNumCheck}
            header={header}
            data={gridData}
            draggable={false}
            refGrid={refSingleGrid}
            isEditMode={false}
          />
        </S.GridWrap>
      </S.Main>
      {isNew && newBuildReport()}
      {isEdit && editBuildReport()}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
