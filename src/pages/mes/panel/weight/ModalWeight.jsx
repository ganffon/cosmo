import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalWeight.styled";
import InputPaper from "components/input/InputPaper";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";

function ModalWeight(props) {
  const {
    width = "95%",
    height = "95%",
    onClickModalClose = () => {},
    onClickGridModalHeader = () => {},
    onDblClickGridModalHeader = () => {},
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

      {/* <S.ContentTop>
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
                color={"#2986cc"}
                hoverColor={"#1f5e8e"}
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
            size={"30px"}
          />
          <InputPaper
            width={"200px"}
            height={"45px"}
            name={"소분일자"}
            nameSize={"20px"}
            namePosition={"-25px"}
            nameColor={"white"}
            value={require.date || ""}
            size={"30px"}
          />
          <InputPaper
            width={"200px"}
            height={"45px"}
            name={"Lot No"}
            nameSize={"20px"}
            namePosition={"-25px"}
            nameColor={"white"}
            value={require.lot || ""}
            size={"30px"}
          />
          <InputPaper
            width={"200px"}
            height={"45px"}
            name={"소분총량"}
            nameSize={"20px"}
            namePosition={"-25px"}
            nameColor={"white"}
            value={require.totalQty || ""}
            size={"30px"}
          />
          <S.ButtonSet
            width={"200px"}
            color={"#e5a711"}
            hoverColor={"#b2820d"}
            onClick={onClickPick}
          >
            Data Select
          </S.ButtonSet>
        </S.ItemInfoBox>
      </S.ContentTop> */}
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

export default ModalWeight;
