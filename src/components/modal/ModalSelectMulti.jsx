import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import ButtonACS from "components/button/ButtonACS";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalSelectMulti.styled";
import InputPaper from "components/input/InputPaper";
import InputText from "components/input/InputText";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";

function ModalSelectMulti(props) {
  const {
    width = "95%",
    height = "95%",
    onClickModalAddRow = () => {},
    onClickModalCancelRow = () => {},
    onClickModalSave = () => {},
    onClickModalClose = () => {},
    onClickEditModalSave = () => {},
    onClickGridModalDetail = () => {},
    onClickGridModalHeader = () => {},
    onDblClickGridModalHeader = () => {},
    onDblClickGridModalDetail = () => {},
    onEditingFinishGridModalHeader = () => {},
    onEditingFinishGridModalDetail = () => {},
    onClickPick = () => {},
    onKeyDownModalMulti = () => {},
    setGridDataHeader = () => {},
    refGridModalHeader = null,
    refGridModalDetail = null,
    columnsModalHeader = [],
    columnsModalDetail = [],
    columnOptions = [],
    header = [],
    rowHeadersHeader = [],
    rowHeadersDetail = [],
    gridDataHeader = [],
    gridDataDetail = [],
    require = {},
  } = props;
  const { currentMenuName } = useContext(LayoutContext);
  const [inputChange, setInputChange] = useState();

  const handleInputChange = (e) => {
    setInputChange(e.target.value);
  };
  const onClickSearch = async () => {
    let uri;
    try {
      if (inputChange === undefined) {
        uri = restURI.subdivision + `?complete_fg=INCOMPLETE`;
      } else {
        if (inputChange.length === 0) {
          uri = restURI.subdivision + `?complete_fg=INCOMPLETE`;
        } else {
          uri =
            restURI.subdivision +
            `?complete_fg=INCOMPLETE&prod_cd=${inputChange}`;
        }
      }
      const result = await restAPI.get(uri);
      setGridDataHeader(result?.data?.data?.rows);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <S.ModalWrapBox width={width} height={height}>
      <S.HeaderBox>
        <S.TitleBox>${currentMenuName}</S.TitleBox>
        <S.ButtonClose
          color="primary"
          aria-label="close"
          onClick={onClickModalClose}
        >
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>

      <S.ContentTop>
        <S.ContentTopLeft>
          <S.ButtonBox>
            <div>✳️ 소분정보</div>
            <S.SearchBox>
              <S.Input
                id={"prod_cd"}
                name={"품번"}
                handleInputTextChange={handleInputChange}
                onKeyDown={onKeyDownModalMulti}
                onClickSearch={onClickSearch}
              />
              <S.ButtonSet
                width={"120px"}
                color={"#212529"}
                hoverColor={"#ffc107"}
                onClick={onClickSearch}
              >
                Search
              </S.ButtonSet>
            </S.SearchBox>
          </S.ButtonBox>
          <S.GridBoxTop>
            <GridModal
              data={gridDataHeader}
              columns={columnsModalHeader}
              columnOptions={columnOptions}
              header={header}
              rowHeaders={rowHeadersHeader}
              refGrid={refGridModalHeader}
              draggable={false}
              onClick={onClickGridModalHeader}
              onDblClick={onDblClickGridModalHeader}
            />
          </S.GridBoxTop>
        </S.ContentTopLeft>
        <S.ItemInfoBox>
          <InputPaper
            width={"200px"}
            height={"45px"}
            name={"품번"}
            nameSize={"20px"}
            namePosition={"-25px"}
            nameColor={"white"}
            value={require.prod_cd || ""}
            // valueSize={"22px"}
          />
          <InputPaper
            width={"200px"}
            height={"45px"}
            name={"소분일자"}
            nameSize={"20px"}
            namePosition={"-25px"}
            nameColor={"white"}
            value={require.date || ""}
            // valueSize={"22px"}
          />
          <InputPaper
            width={"200px"}
            height={"45px"}
            name={"Lot No"}
            nameSize={"20px"}
            namePosition={"-25px"}
            nameColor={"white"}
            value={require.lot || ""}
            // valueSize={"22px"}
          />
          <InputPaper
            width={"200px"}
            height={"45px"}
            name={"소분총량"}
            nameSize={"20px"}
            namePosition={"-25px"}
            nameColor={"white"}
            value={require.totalQty || ""}
            // valueSize={"22px"}
          />
          <S.ButtonSet
            width={"200px"}
            color={"#212529"}
            hoverColor={"#ffc107"}
            onClick={onClickPick}
          >
            Data Select
          </S.ButtonSet>
        </S.ItemInfoBox>
      </S.ContentTop>
      <S.GridBottomTitleBox>✳️ 세부소분정보</S.GridBottomTitleBox>
      <S.GridBoxBottom>
        <GridModal
          data={gridDataDetail}
          columns={columnsModalDetail}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersDetail}
          refGrid={refGridModalDetail}
          draggable={false}
        />
      </S.GridBoxBottom>
    </S.ModalWrapBox>
  );
}

export default ModalSelectMulti;
