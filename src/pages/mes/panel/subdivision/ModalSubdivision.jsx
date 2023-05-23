import React, { useContext, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalSubdivision.styled";
import InputPaper from "components/input/InputPaper";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";

function ModalSubdivision(props) {
  const {
    width = "95%",
    height = "95%",
    onClickModalClose = () => {},
    onClickGridModalHeader = () => {},
    onDblClickGridModalHeader = () => {},
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
    setIsSnackOpen = {},
    isSnackOpen = {},
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
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    }
  };
  const GridHeader = useMemo(() => {
    return (
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
    );
  }, [gridDataHeader]);
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

      <S.Content>
        <S.ContentTop>
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
          <S.GridBoxTop>{GridHeader}</S.GridBoxTop>
        </S.ContentTop>
        <S.ContentBottom>
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
        </S.ContentBottom>
      </S.Content>
    </S.ModalWrapBox>
  );
}

export default ModalSubdivision;
