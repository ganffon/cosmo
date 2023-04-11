import { useContext, useState, useEffect, useRef } from "react";
import LoginStateChk from "custom/LoginStateChk";
import InputInfo from "components/input/InputInfo";
import ButtonSearch from "components/button/ButtonSearch";
import GridSingle from "components/grid/GridSingle";
import DocumentSet from "pages/mes/standard/document/DocumentSet";
import * as S from "./DocumentBackup.styled";
import CN from "json/ColumnName.json";
import { LayoutContext } from "components/layout/common/Layout";

function Document() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const boxRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);

  const {
    data,
    columnsTop,
    columnsBottom,
    columnsModal,
    columnOptions,
    rowHeadersTop,
    header,
    datePickerSet,
    inputSet,
    uri,
  } = DocumentSet(isEditMode);
  function scrollDetect() {
    setScrollY(boxRef?.current?.scrollTop);
    if (boxRef?.current?.scrollTop > 240) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
  }

  useEffect(() => {
    function watchScroll() {
      boxRef?.current?.addEventListener("scroll", scrollDetect);
    }
    watchScroll();
    return () => {
      boxRef?.current?.removeEventListener("scroll", scrollDetect);
    };
  }, [scrollY]);

  const onClickNew = () => {
    // setIsModalOpen(true);
  };
  const onClickEdit = () => {
    setIsEditMode(true);
    // setDisableRowToggle(!disableRowToggle);
  };
  const onClickDelete = () => {
    // const data = refSingleGrid?.current?.gridInst?.getCheckedRows();
    if (data.length !== 0) {
      // setIsDeleteAlertOpen(true);
    }
  };
  const onClickSearch = () => {
    // setActSearch(!actSearch);
  };

  return (
    <S.ContentsArea ref={boxRef} isAllScreen={isAllScreen}>
      <S.ShadowBoxFixed isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ButtonWrap>
          <ButtonSearch
            onClickNew={onClickNew}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            onClickSearch={onClickSearch}
          />
        </S.ButtonWrap>
      </S.ShadowBoxFixed>
      <S.paddingBox>
        <S.ShadowBox>
          <S.GridTopWrap>
            <GridSingle
              columnOptions={columnOptions}
              columns={columnsTop}
              rowHeaders={rowHeadersTop}
              header={header}
              draggable={false}
            />
          </S.GridTopWrap>
        </S.ShadowBox>
        <S.ShadowBoxSticky
          scrollActive={scrollActive}
          isMenuSlide={isMenuSlide}
          isAllScreen={isAllScreen}
        >
          <S.SearchWrap>
            <InputInfo
              id="insp_document_no"
              name={CN.insp_document_no}
              value="test test"
            />
            <InputInfo id="line_nm" name={CN.line_nm} value="test test" />
            <InputInfo id="prod_no" name={CN.prod_no} value="test test" />
            <InputInfo id="prod_nm" name={CN.prod_nm} value="test test" />
            <InputInfo id="reg_date" name={CN.reg_date} value="test test" />
            <InputInfo id="apply_date" name={CN.apply_date} value="test test" />
            <InputInfo id="apply_fg" name={CN.apply_fg} value="test test" />
            <InputInfo id="contents" name={CN.contents} value="test test" />
            <InputInfo id="remark" name={CN.remark} value="test test" />
          </S.SearchWrap>
        </S.ShadowBoxSticky>
        <S.ShadowBox>
          <S.GridBottomWrap>
            <GridSingle
              columnOptions={columnOptions}
              columns={columnsBottom}
              rowHeaders={rowHeadersTop}
              header={header}
              draggable={false}
            />
          </S.GridBottomWrap>
        </S.ShadowBox>
      </S.paddingBox>
    </S.ContentsArea>
  );
}

export default Document;
