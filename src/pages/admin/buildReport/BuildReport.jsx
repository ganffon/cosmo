import { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";

import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import BuildReportSet from "./BuildReportSet";
import CloseIcon from "@mui/icons-material/Close";
import * as S from "./BuildReport.styled";
import URI from "api/URI";
import restAPI from "api/restAPI";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import InputPaper from "components/input/InputPaper";

function BuildReport(props) {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const refModalGrid = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [searchToggle, setSearchToggle] = useState(false);

  const { rowNumCheck, rowNum, header, columns, columnOptions } = BuildReportSet(isEditMode);

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    if (refSingleGrid?.current !== null) {
      refSingleGrid?.current?.gridInst?.refreshLayout();
    }
  }, [isMenuSlide]);

  const [isNew, setIsNew] = useState(false);
  const onNew = () => {
    setIsNew(true);
  };

  const newBuildReport = () => {
    return (
      <ModalWrapMulti width={"50%"} height={"80%"}>
        <S.HeaderBox>
          <S.Title className={"bold"}>{"배포 정보 작성"}</S.Title>
          <S.ButtonClose color="primary" aria-label="close" onClick={() => setIsNew(false)}>
            <CloseIcon />
          </S.ButtonClose>
        </S.HeaderBox>
        <S.MainBox>
          <S.TitleWrap>
            <S.Title>{"배포 요약"}</S.Title>
            <InputPaper readOnly={false} width={"100%"} />
            {/* <S.Issue
                disabled
                rows={4}
                value={mainContents.remark || ""}
                placeholder="작업이슈에 대해 작성해주세요."
              /> */}
          </S.TitleWrap>
          <S.ContentsWrap>
            <S.Title>{"배포 내용"}</S.Title>
            <InputPaper readOnly={false} width={"100%"} height={"calc(100% - 25px)"} />
          </S.ContentsWrap>
        </S.MainBox>
      </ModalWrapMulti>
    );
  };

  return (
    <ContentsArea>
      <S.Header>
        <InputSearch
          name={"Version"}
          // handleInputTextChange={handleInputTextChange}
          // onClickSearch={onClickSearch}
          // onKeyDown={onKeyDown}
        />
        <InputSearch
          name={"Title"}
          // handleInputTextChange={handleInputTextChange}
          // onClickSearch={onClickSearch}
          // onKeyDown={onKeyDown}
        />
      </S.Header>
      <S.Main>
        <S.GridButton>
          <BtnComponent btnName={"New"} onClick={onNew} />
          <BtnComponent btnName={"Delete"} />
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
            isEditMode={isEditMode}
          />
        </S.GridWrap>
      </S.Main>
      {isNew && newBuildReport()}
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default BuildReport;
