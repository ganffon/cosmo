import ExcelJS from "exceljs";
import CN from "json/ColumnName.json";
import { Button } from "@mui/material";
import restAPI from "api/restAPI";
import { saveAs } from "file-saver";
import { getDate } from "date-fns";
import { now } from "moment/moment";
import BtnComponent from "components/button/BtnComponent";

function ExcelExport(props) {
  const {
    fileName = null,
    headerData = [],
    detailData = [],
    workerList = [],
  } = props;
  const getDateFunction = () => {
    const date = new Date();

    let year = date.getFullYear().toString();
    let month = date.getMonth().toString();
    let day = date.getDay().toString();

    if (month.length === 1) {
      month = "0" + month;
    }
    if (day.length === 1) {
      day = "0" + day;
    }

    let fullDate = year + month + day;
    return fullDate;
  };
  const downLoadFile = async () => {
    //데이터 임시 생성 추후에 지우거나 수정해야함

    let setData = [];

    for (let i = 0; i < 43; i++) {
      setData.push({
        오전조: i,
        오후조: i + 2,
        야간조: i + 3,
      });
    }
    if (fileName !== null) {
      try {
        // Step 1: 다운로드 - 엑셀 파일을 백엔드 API로부터 다운로드 받기
        //일일운전점검일지.xlsx

        const response = await restAPI.get(`/ftp/${fileName}.xlsx`, {
          responseType: "blob",
        });
        // Step 2: Blob을 File 객체로 변환 (file-saver 라이브러리 사용)
        const file = new File([response.data], `${fileName}.xlsx`, {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        // Step 3: 엑셀 파일 내용 변경
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file);
        const worksheet = workbook.worksheets[0];

        //헤더데이터 삽입
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
        const productName = workbook.definedNames.getRanges("품목명").ranges[0];
        const productNameTarget = productName
          .split("!", 2)[1]
          .replaceAll("$", "");
        worksheet.getCell(`${productNameTarget}`).value = headerData.prodNm;

        if (Array.isArray(workerList)) {
          const morEmpNm =
            workbook.definedNames.getRanges("오전점검자").ranges[0];
          const morEmpNmTarget = morEmpNm.split("!", 2)[1].replaceAll("$", "");
          worksheet.getCell(`${morEmpNmTarget}`).value = workerList[0].mngEmpNm;
          const aftEmpNm =
            workbook.definedNames.getRanges("오후점검자").ranges[0];
          const aftEmpNmTarget = aftEmpNm.split("!", 2)[1].replaceAll("$", "");
          worksheet.getCell(`${aftEmpNmTarget}`).value = workerList[0].aftEmpNm;
          const nigEmpNm =
            workbook.definedNames.getRanges("야간점검자").ranges[0];
          const nigEmpNmTarget = nigEmpNm.split("!", 2)[1].replaceAll("$", "");
          worksheet.getCell(`${nigEmpNmTarget}`).value = workerList[0].nigEmpNm;
        } else {
          const morEmpNm =
            workbook.definedNames.getRanges("오전점검자").ranges[0];
          const morEmpNmTarget = morEmpNm.split("!", 2)[1].replaceAll("$", "");
          worksheet.getCell(`${morEmpNmTarget}`).value = workerList.mngEmpNm;
          const aftEmpNm =
            workbook.definedNames.getRanges("오후점검자").ranges[0];
          const aftEmpNmTarget = aftEmpNm.split("!", 2)[1].replaceAll("$", "");
          worksheet.getCell(`${aftEmpNmTarget}`).value = workerList.aftEmpNm;
          const nigEmpNm =
            workbook.definedNames.getRanges("야간점검자").ranges[0];
          const nigEmpNmTarget = nigEmpNm.split("!", 2)[1].replaceAll("$", "");
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
        const specCol = spec.split("!", 2)[1].replace("$", "").split("$", 2)[0];
        const specRow = spec.split("!", 2)[1].replace("$", "").split("$", 2)[1];

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

        for (let i = 0; i < detailData.length; i++) {
          worksheet.getCell(`${procNameCol}${Number(procNameRow) + i}`).value =
            detailData[i].proc_nm;
          worksheet.getCell(
            `${inspectionItemCol}${Number(inspectionItemRow) + i}`
          ).value = detailData[i].insp_item_nm;
          worksheet.getCell(`${specCol}${Number(specRow) + i}`).value =
            detailData[i].insp_item_desc;
          worksheet.getCell(`${morStartCol}${Number(morStartRow) + i}`).value =
            detailData[i].mng_insp_value;
          worksheet.getCell(`${aftStartCol}${Number(aftStartRow) + i}`).value =
            detailData[i].aft_insp_value;
          worksheet.getCell(`${nigStartCol}${Number(nigStartRow) + i}`).value =
            detailData[i].nig_insp_value;
          worksheet.getCell(`${remarkCol}${Number(remarkRow) + i}`).value =
            detailData[i].remark;
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
        saveAs(modifiedBlob, `${fileNameDate}점검서.xlsx`);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    }
  };
  return (
    <>
      <BtnComponent btnName={"ExcelDownload"} onClick={downLoadFile}>
        테스트 버튼
      </BtnComponent>
    </>
  );
}

export default ExcelExport;
