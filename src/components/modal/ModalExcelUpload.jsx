import React, { useContext, useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { LayoutContext } from "components/layout/common/Layout";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import * as LS from "./ModalExcelUpload.styled";
import InputPaper from "components/input/InputPaper";
import BtnComponent from "components/button/BtnComponent";
import * as S from "pages/mes/style/oneGrid.styled";
import xlsx from "xlsx"; // xlsx 라이브러리 import
import NoticeSnack from "components/alert/NoticeSnack";

function ModalExcelUpload(props) {
  const {
    onClickModalUpload = () => {},
    onClickModalClose = () => {},
    onClickProdSelect = () => {},
    excelProdCD = "",
    excelProdNM = "",
  } = props;

  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null); // 업로드한 파일명 상태
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const handleDragEnter = (e) => {
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    setIsDragging(false);
  };

  const modalClose = () => {
    resetProd();
    onClickModalClose();
  };

  const handleDrop = (e) => {
    setIsDragging(false);
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const fileExtension = file.name.split(".").pop();

      if (fileExtension === "xlsx") {
        setUploadedFileName(file.name);
        const reader = new FileReader();

        reader.onload = (e) => {
          // 엑셀시트 데이터 범위 지정
          // 범위 지정
          const range = { s: { c: 1, r: 2 }, e: { c: 6, r: 18 } };

          const data = new Uint8Array(e.target.result);
          const workbook = xlsx.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = xlsx.utils.sheet_to_json(worksheet, { range });

          // 엑셀 파일 데이터 사용
        };
        reader.readAsArrayBuffer(file);
      } else {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: "업로드 할 수 없는 파일입니다.",
          severity: "error",
        });
      }
    }
  };
  const [prodCD, setProdCD] = useState("");
  const [prodNM, setProdNM] = useState("");
  //   const prodCD = ("품목코드");
  //   const prodNM = useRef("품목");

  const resetProd = () => {
    setProdCD("품목코드");
    setProdNM("품목");
  };

  const inputProd = () => {
    setProdCD(excelProdCD);
    setProdNM(excelProdNM);
  };

  useEffect(() => {
    inputProd();
  }, [excelProdCD]);

  const onClickSave = () => {
    if (prodCD === "품목코드" || prodNM === "품목") {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "품목을 선택해주세요",
        severity: "error",
      });
    } else if (uploadedFileName === null) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "업로드할 파일을 입력해주세요",
        severity: "error",
      });
    }
  };

  const removeFile = () => {
    setUploadedFileName(null);
  };

  const { currentMenuName } = useContext(LayoutContext);
  return (
    <ModalWrap height={"250px"} width={"700px"}>
      <LS.HeaderBox>
        <LS.Title>Excel Upload</LS.Title>
        <LS.ButtonClose color="primary" aria-label="close" onClick={modalClose}>
          <CloseIcon />
        </LS.ButtonClose>
      </LS.HeaderBox>
      <LS.ToolWrap>
        <LS.InputPaperWrap>
          <InputPaper width={"180px"} value={prodCD || ""} btn={false} />
        </LS.InputPaperWrap>
        <LS.InputPaperWrap>
          <InputPaper
            width={"240px"}
            value={prodNM || ""}
            btn={true}
            onClickSelect={onClickProdSelect}
            onClickRemove={resetProd}
          />
        </LS.InputPaperWrap>
        <S.ButtonWrap>
          <BtnComponent btnName={"Save"} onClick={onClickSave} />
        </S.ButtonWrap>
      </LS.ToolWrap>
      <LS.DragAndDropFileWrap
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={isDragging ? "dragging" : ""}
      >
        {uploadedFileName ? (
          <>
            <LS.DragAndDropFile>{uploadedFileName}</LS.DragAndDropFile>
            <LS.IconWrap onClick={removeFile}>
              <CloseIcon />
            </LS.IconWrap>
          </>
        ) : (
          <LS.DragAndDropFile>첨부할 파일을 드래그해주세요</LS.DragAndDropFile>
        )}
      </LS.DragAndDropFileWrap>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
    </ModalWrap>
  );
}

export default ModalExcelUpload;
