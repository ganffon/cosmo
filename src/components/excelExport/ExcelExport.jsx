import ExcelJS from "exceljs";
import restAPI from "api/restAPI";
import { saveAs } from "file-saver";
import BtnComponent from "components/button/BtnComponent";
import * as S from "./ExcelExport.styles.js";
import DateTime from "components/datetime/DateTime.js";

function ExcelExport(props) {
  const {
    fileName = null,
    headerData = [],
    detailData = [],
    workerList = [],
  } = props;
  const getDateFunction = () => {
    const date = new Date();
    const Time = new DateTime();

    let year = date.getFullYear().toString();
    let month = date.getMonth().toString();
    let day = date.getDay().toString();
    //파일명에 시간 추가
    let timeString = Time.hour + Time.minute + Time.seconds;
    if (month.length === 1) {
      month = "0" + month;
    }
    if (day.length === 1) {
      day = "0" + day;
    }

    let fullDate = year + month + day + timeString;
    return fullDate;
  };
  const downLoadFile = async () => {
    //파일명

    //확장자 설정
    const extension = "xlsx";

    //데이터 임시 생성 추후에 지우거나 수정해야함
    if (fileName !== null) {
      let fileTypeName = "";
      try {
        // Step 1: 다운로드 - 엑셀 파일을 백엔드 API로부터 다운로드 받기
        //일일운전점검일지.xlsx
        //?filename=FIL-001&extension=xlsx
        const response = await restAPI.get(
          `/sys/file/download?filename=${fileName}&extension=${extension}`,
          {
            responseType: "blob",
          }
        );
        // Step 2: Blob을 File 객체로 변환 (file-saver 라이브러리 사용)
        const file = new File([response.data], `${fileName}.xlsx`, {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        // Step 3: 엑셀 파일 내용 변경
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file);
        const worksheet =
          fileName === "FIL-002"
            ? workbook.worksheets[1]
            : workbook.worksheets[0];
        //헤더데이터 삽입

        if (fileName === "FIL-001") {
          //파일명 정의
          fileTypeName = "일일운전점검일지";

          //검사일자
          const inspectionDate =
            workbook.definedNames.getRanges("점검일자").ranges[0];
          const inspectionDateTarget = inspectionDate
            .split("!", 2)[1]
            .replaceAll("$", "");
          worksheet.getCell(`${inspectionDateTarget}`).value =
            headerData.inspResultDate;
          //라인
          const line = workbook.definedNames.getRanges("라인").ranges[0];
          const lineTarget = line.split("!", 2)[1].replaceAll("$", "");
          worksheet.getCell(`${lineTarget}`).value = headerData.lineNm;
          //품목코드
          const productCode =
            workbook.definedNames.getRanges("품목코드").ranges[0];
          const productCodeTarget = productCode
            .split("!", 2)[1]
            .replaceAll("$", "");
          worksheet.getCell(`${productCodeTarget}`).value = headerData.prodCd;
          //품목명
          const productName =
            workbook.definedNames.getRanges("품목명").ranges[0];
          const productNameTarget = productName
            .split("!", 2)[1]
            .replaceAll("$", "");
          worksheet.getCell(`${productNameTarget}`).value = headerData.prodNm;

          if (Array.isArray(workerList)) {
            const morEmpNm =
              workbook.definedNames.getRanges("오전점검자").ranges[0];
            const morEmpNmTarget = morEmpNm
              .split("!", 2)[1]
              .replaceAll("$", "");
            worksheet.getCell(`${morEmpNmTarget}`).value =
              workerList[0].mngEmpNm;
            const aftEmpNm =
              workbook.definedNames.getRanges("오후점검자").ranges[0];
            const aftEmpNmTarget = aftEmpNm
              .split("!", 2)[1]
              .replaceAll("$", "");
            worksheet.getCell(`${aftEmpNmTarget}`).value =
              workerList[0].aftEmpNm;
            const nigEmpNm =
              workbook.definedNames.getRanges("야간점검자").ranges[0];
            const nigEmpNmTarget = nigEmpNm
              .split("!", 2)[1]
              .replaceAll("$", "");
            worksheet.getCell(`${nigEmpNmTarget}`).value =
              workerList[0].nigEmpNm;
          } else {
            const morEmpNm =
              workbook.definedNames.getRanges("오전점검자").ranges[0];
            const morEmpNmTarget = morEmpNm
              .split("!", 2)[1]
              .replaceAll("$", "");
            worksheet.getCell(`${morEmpNmTarget}`).value = workerList.mngEmpNm;
            const aftEmpNm =
              workbook.definedNames.getRanges("오후점검자").ranges[0];
            const aftEmpNmTarget = aftEmpNm
              .split("!", 2)[1]
              .replaceAll("$", "");
            worksheet.getCell(`${aftEmpNmTarget}`).value = workerList.aftEmpNm;
            const nigEmpNm =
              workbook.definedNames.getRanges("야간점검자").ranges[0];
            const nigEmpNmTarget = nigEmpNm
              .split("!", 2)[1]
              .replaceAll("$", "");
            worksheet.getCell(`${nigEmpNmTarget}`).value = workerList.nigEmpNm;
          }
          //헤더데이터 삽입 끝

          //디테일 데이터 입력
          //각 데이터별 시작점 입력
          const procName = workbook.definedNames.getRanges("공정").ranges[0];
          const procNameCol = procName
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[0];
          const procNameRow = procName
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[1];

          const inspectionItem =
            workbook.definedNames.getRanges("점검항목").ranges[0];
          const inspectionItemCol = inspectionItem
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[0];
          const inspectionItemRow = inspectionItem
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[1];

          const spec = workbook.definedNames.getRanges("상세내용").ranges[0];
          const specCol = spec
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[0];
          const specRow = spec
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[1];

          const cycle = workbook.definedNames.getRanges("점검주기").ranges[0];
          const cycleCol = cycle
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[0];
          const cycleRow = cycle
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[1];
          const getSheetNameMor =
            workbook.definedNames.getRanges("오전조").ranges[0];
          const getSheetNameAft =
            workbook.definedNames.getRanges("오후조").ranges[0];
          const getSheetNameNig =
            workbook.definedNames.getRanges("야간조").ranges[0];
          const morStartCol = getSheetNameMor
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[0];
          const morStartRow = getSheetNameMor
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[1];

          const aftStartCol = getSheetNameAft
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[0];
          const aftStartRow = getSheetNameAft
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[1];

          const nigStartCol = getSheetNameNig
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[0];
          const nigStartRow = getSheetNameNig
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[1];

          const remark = workbook.definedNames.getRanges("비고").ranges[0];
          const remarkCol = remark
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[0];
          const remarkRow = remark
            .split("!", 2)[1]
            .replace("$", "")
            .split("$", 2)[1];

          const splitDataList = detailData.filter(
            (value) => value.insp_filing_cd === fileName
          );
          for (let i = 0; i < splitDataList.length; i++) {
            worksheet.getCell(
              `${procNameCol}${Number(procNameRow) + i}`
            ).value = splitDataList[i].proc_nm;
            worksheet.getCell(
              `${inspectionItemCol}${Number(inspectionItemRow) + i}`
            ).value = splitDataList[i].insp_item_nm;
            worksheet.getCell(`${specCol}${Number(specRow) + i}`).value =
              splitDataList[i].insp_item_desc;
            worksheet.getCell(
              `${morStartCol}${Number(morStartRow) + i}`
            ).value = splitDataList[i].mng_insp_value;
            worksheet.getCell(
              `${aftStartCol}${Number(aftStartRow) + i}`
            ).value = splitDataList[i].aft_insp_value;
            worksheet.getCell(
              `${nigStartCol}${Number(nigStartRow) + i}`
            ).value = splitDataList[i].nig_insp_value;
            worksheet.getCell(`${remarkCol}${Number(remarkRow) + i}`).value =
              splitDataList[i].remark;
            worksheet.getCell(`${cycleCol}${Number(cycleRow) + i}`).value =
              splitDataList[i].insp_cycle;
          }
        } else if (fileName === "FIL-002") {
          const splitDataList = detailData.filter(
            (value) => value.insp_filing_cd === fileName
          );
          fileTypeName = "소성운전점검일지";
          //기본 데이터 입력 구간 시작
          //점검일자 입력
          const inspectionDate =
            workbook.definedNames.getRanges("점검일자").ranges[0];
          const inspectionDateTarget = inspectionDate
            .split("!", 2)[1]
            .replaceAll("$", "");
          worksheet.getCell(`${inspectionDateTarget}`).value =
            headerData.inspResultDate;
          //라인
          const line = workbook.definedNames.getRanges("라인").ranges[0];
          const lineTarget = line.split("!", 2)[1].replaceAll("$", "");
          worksheet.getCell(`${lineTarget}`).value = headerData.lineNm;

          //품목코드 입력
          const productCode =
            workbook.definedNames.getRanges("품목코드").ranges[0];
          const productCodeTarget = productCode
            .split("!", 2)[1]
            .replaceAll("$", "");
          worksheet.getCell(`${productCodeTarget}`).value = headerData.prodCd;
          //기본데이터 입력 종료

          //실제 데이터 입력
          //타겟 범위 찾기
          for (let i = 0; i < splitDataList.length; i++) {
            let targetCell = null;
            let targetCellMor = null;
            let targetCellAft = null;
            let targetCellNig = null;
            const targetValue = splitDataList[i].insp_item_cd + "_SV";
            const targetValueMor = splitDataList[i].insp_item_cd + "_오전조";
            const targetValueAft = splitDataList[i].insp_item_cd + "_오후조";
            const targetValueNig = splitDataList[i].insp_item_cd + "_야간조";
            //표준값 입력

            //표준값 타겟 설정
            worksheet.eachRow((row, rowNumber) => {
              row.eachCell((cell, colNumber) => {
                if (cell.value === targetValue) {
                  // 원하는 값이 발견된 경우 데이터 입력 타겟의 위치를 +6으로 수정
                  targetCell = { row: rowNumber, col: colNumber + 6 };
                }
                if (cell.value === targetValueMor) {
                  // 오전조 값이 발견된 경우 데이터 입력 타겟의 위치를 +6으로 수정
                  targetCellMor = { row: rowNumber, col: colNumber + 6 };
                }
                if (cell.value === targetValueAft) {
                  // 오후조 값이 발견된 경우 데이터 입력 타겟의 위치를 +6으로 수정
                  targetCellAft = { row: rowNumber, col: colNumber + 6 };
                }
                if (cell.value === targetValueNig) {
                  // 야간조 값이 발견된 경우 데이터 입력 타겟의 위치를 +6으로 수정
                  targetCellNig = { row: rowNumber, col: colNumber + 6 };
                }
              });
            });
            if (targetCell !== null) {
              if (
                splitDataList[i].spec_std !== null &&
                splitDataList[i].spec_std !== "" &&
                splitDataList[i].spec_std !== undefined
              ) {
                worksheet.getCell(targetCell.row, targetCell.col).value =
                  splitDataList[i].spec_std;
              }
            }
            if (targetCellMor !== null) {
              if (
                splitDataList[i].mng_insp_value !== null &&
                splitDataList[i].mng_insp_value !== "" &&
                splitDataList[i].mng_insp_value !== undefined
              ) {
                worksheet.getCell(targetCellMor.row, targetCellMor.col).value =
                  splitDataList[i].mng_insp_value;
              }
            }
            if (targetCellAft !== null) {
              if (
                splitDataList[i].aft_insp_value !== null &&
                splitDataList[i].aft_insp_value !== "" &&
                splitDataList[i].aft_insp_value !== undefined
              ) {
                worksheet.getCell(targetCellAft.row, targetCellAft.col).value =
                  splitDataList[i].aft_insp_value;
              }
            }
            if (targetCellNig !== null) {
              if (
                splitDataList[i].nig_insp_value !== null &&
                splitDataList[i].nig_insp_value !== "" &&
                splitDataList[i].nig_insp_value !== undefined
              ) {
                worksheet.getCell(targetCellNig.row, targetCellNig.col).value =
                  splitDataList[i].nig_insp_value;
              }
            }
          }
        }
        //데이터 삽입구간 종료

        // Step 4: 변경된 엑셀 파일을 Blob으로 변환
        const buffer = await workbook.xlsx.writeBuffer();
        const modifiedBlob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        //파일명용 시간
        let fileNameDate = getDateFunction();
        // Step 5: 변경된 파일 다운로드 (file-saver 라이브러리 사용)

        saveAs(modifiedBlob, `${fileNameDate}_${fileTypeName}.xlsx`);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    }
  };

  return (
    <S.ButtonWrap>
      <BtnComponent btnName={"ExcelDownload"} onClick={downLoadFile} />
    </S.ButtonWrap>
  );
}

export default ExcelExport;
