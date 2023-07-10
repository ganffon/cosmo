import React, { useContext, useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { LayoutContext } from "components/layout/common/Layout";
import GridModal from "components/grid/GridModal";
import ExcelJS from "exceljs";
import ModalWrap from "components/modal/ModalWrap";
import * as LS from "./ModalExcelUpload.styled";
import InputPaper from "components/input/InputPaper";
import BtnComponent from "components/button/BtnComponent";
import * as S from "pages/mes/style/oneGrid.styled";
import BackDrop from "components/backdrop/BackDrop.jsx";
import xlsx from "xlsx"; // xlsx 라이브러리 import
import restURI from "json/restURI.json";
import restAPI from "api/restAPI.js";
import NoticeSnack from "components/alert/NoticeSnack";

function ModalExcelUpload(props) {
  const {
    onClickModalUpload = () => {},
    onClickModalClose = () => {},
    onClickProdSelect = () => {},
    excelProdID = "",
    excelProdCD = "",
    excelProdNM = "",
  } = props;

  const [errMsg, setErrMsg] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null); // 업로드한 파일명 상태
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [gridData, setGridData] = useState([]);
  const [jsonData, setJsonData] = useState("");
  let jsonVal = "";
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

  const getOneRowData = (i, gridData) => {
    if (!gridData) {
      return;
    }
    const headers = gridData.length > 0 ? gridData[i] : [];
    const newHeaders = headers.map((header, index) => {
      if ((header === "D5" || header === "D50" || header === "D95" || header === "Dmin" || header === "Dmax") && index !== headers.indexOf(header)) {
        return `${header}_`;
      }
      if (header.richText) {
        // console.log(header.richText);
      }
      const value = header.richText ? header?.richText[0]?.text + header?.richText[1]?.text : header;

      return value;
    });
    return newHeaders;
  };

  const getDataColumns = (i, gridData) => {
    const columns = [];
    if (!gridData) {
      return;
    }
    for (let index = 2; index < gridData.length; index++) {
      if (gridData[i][index] === "담당") {
        break;
      }
      const cellValue = gridData[i][index];
      const value = cellValue.richText ? cellValue?.richText[0]?.text + cellValue?.richText[1]?.text : cellValue;

      const header = columns.some((col) => col.header === value) ? `${value}_` : value;
      const column = { name: value, renderer: "text", header };
      columns.push(column);
    }
    return columns;
  };
  const getDataRows = (i, gridData) => {
    if (!gridData) {
      return;
    }
    const rows = [];
    const colHeader = getOneRowData(1, gridData);
    for (let j = i; j < gridData.length; j++) {
      const rowData = gridData[j];
      if (!rowData[2]) {
        // 1번째 셀의 값이 없으면 반복문 종료
        break;
      }
      const row = {};
      for (let k = 0; k < rowData.length; k++) {
        row[colHeader[k]] = rowData[k];
      }
      rows.push(row);
    }
    return rows;
  };

  const ExportJson = (rows, columns, gridData) => {
    const colHeader = getOneRowData(1, gridData);
    const sL = getOneRowData(4, gridData);
    const sU = getOneRowData(5, gridData);
    const parsedCells = [];
    // let prodNm = fileNm;
    const parsedRows = rows.map((row) => {
      const columnCount = columns.length;

      for (let i = 8; i <= columnCount; i++) {
        const parsedCell = {};
        parsedCell["prod_id"] = prodID;

        parsedCell["lot_no"] = row[colHeader[2]];
        parsedCell["work_date"] = row[colHeader[3]];
        parsedCell["insp_item"] = colHeader[i];
        parsedCell["insp_min"] = String(sL[i] || ""); //String(sL[i]);
        parsedCell["insp_max"] = String(sU[i] || ""); //String(sU[i]);
        const inspValue = String(row[colHeader[i]]);
        if (inspValue === "undefined") {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: row[colHeader[2]] + " " + colHeader[i] + "의 값을 확인해주세요.",
            severity: "error",
          });
          setErrMsg(row[colHeader[2]] + " " + colHeader[i] + "의 값을 확인해주세요.");
        }
        parsedCell["insp_value"] = inspValue; //String(row[colHeader[i]]);
        parsedCell["remark"] = "";
        parsedCells.push(parsedCell);
      }
    });
    // console.log(JSON.stringify(parsedCells));
    return parsedCells;
  };

  const handleDrop = (e) => {
    setErrMsg("");
    setIsDragging(false);
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const fileExtension = file.name.split(".").pop();
      setIsBackDrop(true);
      if (fileExtension === "xlsx") {
        setUploadedFileName(file.name);
        const reader = new FileReader();

        reader.onload = (e) => {
          // 엑셀시트 데이터 범위 지정
          // 범위 지정
          const range = { s: { c: 1, r: 2 }, e: { c: 6, r: 18 } };

          const data = new Uint8Array(e.target.result);
          // const workbook = xlsx.read(data, { type: "array" });
          const workbook = new ExcelJS.Workbook();
          // const sheetName = workbook.SheetNames[0];
          // const worksheet = workbook.Sheets[sheetName];
          // const jsonData = xlsx.utils.sheet_to_json(worksheet, { range });
          // setJasonData(jsonData);
          // 엑셀 파일 데이터 사용

          // BKHUR
          workbook.xlsx
            .load(file)
            .then(async (workbook) => {
              const worksheet = workbook.worksheets[0];
              const data = [];
              worksheet.eachRow((row, rowNumber) => {
                const rowData = row.values;
                data.push(rowData);
              });
              setGridData(data);

              // 데이터 추출 및 가공
              const rows = getDataRows(14, data); // 몇번째 행부터 읽어올지 0부터 시작
              const columns = getDataColumns(1, data); // 몇번째 행이 Column Name인지 0부터 시작
              const rowsArr = await ExportJson(rows, columns, data); // 문서 포맷에 맞게 세팅된 상태
              // UploadInsp(JSON.stringify(rowsArr));
              await setJsonData(JSON.stringify(rowsArr));
              jsonVal = JSON.stringify(rowsArr);

              console.log("test");
              setIsBackDrop(false);
            })
            .catch((error) => {
              console.error("Error loading the workbook:", error);
            });
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
  const [prodID, setProdID] = useState("");
  const [prodCD, setProdCD] = useState("");
  const [prodNM, setProdNM] = useState("");
  //   const prodCD = ("품목코드");
  //   const prodNM = useRef("품목");

  const resetProd = () => {
    setProdCD("품목코드");
    setProdNM("품목");
  };

  const inputProd = () => {
    setProdID(excelProdID);
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
    } else if (errMsg !== "") {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: errMsg,
        severity: "error",
      });
    } else {
      const handleAsync = async () => {
        setIsBackDrop(true);
        await UploadInsp();
        await resetProd();
        setIsBackDrop(false);
        onClickModalClose();
      };

      handleAsync();
    }
  };
  const UploadInsp = async () => {
    try {
      console.log(jsonVal);
      const response = await restAPI.post(restURI.inspResultUploadExcel, jsonData);
      console.log(response);
    } catch (error) {
      console.error(error);
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
          <InputPaper width={"240px"} value={prodNM || ""} btn={true} onClickSelect={onClickProdSelect} onClickRemove={resetProd} />
        </LS.InputPaperWrap>
        <S.ButtonWrap>
          <BtnComponent btnName={"Save"} onClick={onClickSave} />
        </S.ButtonWrap>
      </LS.ToolWrap>
      {prodCD !== "품목코드" && (
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
      )}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ModalWrap>
  );
}

export default ModalExcelUpload;
