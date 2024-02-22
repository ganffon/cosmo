import React, { useState } from "react";
import * as S from "./productionPackingViewModal.styled";
import { FdrModal } from "components/modal/fdrModal";
import BtnComponent from "components/button/BtnComponent";
import DatePicker from "components/datetime/DatePicker";
import DateTime from "components/datetime/DateTime";
import * as Cbo from "custom/useCboSet";
import { TextField } from "@mui/material";
import CN from "json/ColumnName.json";
import restURI from "json/restURI.json";
import restAPI from "api/restAPI";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";

export default function ProductionPackingViewModal(props) {
  const { setModal = () => {} } = props;
  const [lineOpt, lineList] = Cbo.useLineIncludeRework();
  // const [dataList, setDataList] = useState([]);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [comboValue, setComboValue] = useState({
    line_id: null,
    line_nm: null,
  });
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
  });
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const modalProps = {
    open: false,
    height: props.height,
    width: props.width,
    title: "Excel 출력 날짜 설정",
  };

  const actSearchDetail = async () => {
    try {
      let conditionProdID, conditionLineID;
      comboValue.line_id ? (conditionLineID = `&line_id=${comboValue.line_id}`) : (conditionLineID = "");
      let readURI =
        restURI.prdPackingDetail +
        `?start_date=${dateText.startDate}&end_date=${dateText.startDate}&report_fg=true` +
        conditionProdID +
        conditionLineID +
        `&complete_fg=true`;
      // const readURI = `/prd/packing-detail?work_packing_id=${headerRowID.current}`;

      const tmpDataList = await restAPI.get(readURI);

      insertExcelData(tmpDataList);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
    }
  };
  //ExcelData 입력구간
  const insertExcelData = (props) => {
    const datalist = props?.data?.data?.rows;
    if (comboValue.line_id === null || comboValue.line_id === "") {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "라인을 선택해주세요",
        severity: "error",
      });
    } else {
      setIsBackDrop(true);
      downLoadFile(datalist);
    }
  };
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

  const downLoadFile = async (props) => {
    const fileTypeName = "일일포장일지";
    const extension = "xlsx";
    const lineName = props?.[0]?.line_nm;
    const fileName = "FIL-004";
    try {
      const response = await restAPI.get(`/sys/file/download?filename=${fileName}&extension=${extension}`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const file = new File([blob], `${fileName}.xlsx`);
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(file);
      const worksheet = workbook.worksheets[0];
      //라인
      const line = workbook.definedNames.getRanges("라인").ranges[0];
      const lineTarget = line.split("!", 2)[1].replaceAll("$", "");
      worksheet.getCell(`${lineTarget}`).value = comboValue.line_nm;

      const reportDate = workbook.definedNames.getRanges("일자").ranges[0];
      const reportDateTarget = reportDate.split("!", 2)[1].replaceAll("$", "");
      worksheet.getCell(`${reportDateTarget}`).value = dateText.startDate;
      let startRowNumForProdName = 9;
      let endRowNumForProdName = 9;
      let startRowNumForLotNo = 9;
      let endRowNumForLotNo = 9;
      let startRowNumForPacking = 9;
      let endRowNumForPacking = 9;
      //타겟 지정 구간 시작
      for (let i = 0; i < props.length; i++) {
        // debugger;
        const dataListForInsert = props;
        //넘버링관령 사항 처리
        worksheet.getCell(`B${9 + i}`).value = i + 1;
        worksheet.getCell(`B${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell(`B${9 + i}`).border = {
          left: { style: "medium", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        //품목명관련 사항 처리

        if (dataListForInsert[i]?.prod_nm !== dataListForInsert[i + 1]?.prod_nm) {
          endRowNumForProdName = i + 9;
          worksheet.mergeCells(`C${startRowNumForProdName}:D${endRowNumForProdName}`);
          worksheet.getCell(`C${startRowNumForProdName}`).border = {
            top: { style: "thin", color: { argb: "000000" } },
            left: { style: "thin", color: { argb: "000000" } },
            bottom: { style: "thin", color: { argb: "000000" } },
            right: { style: "thin", color: { argb: "000000" } },
          };
          worksheet.getCell(`C${startRowNumForProdName}`).value = dataListForInsert[i]?.prod_nm;
          worksheet.getCell(`C${startRowNumForProdName}`).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          startRowNumForProdName = 10 + i;
        } else {
          endRowNumForProdName = i + 9;
        }
        //lot_no구간
        if (dataListForInsert[i]?.lot_no !== dataListForInsert[i + 1]?.lot_no) {
          endRowNumForLotNo = i + 9;
          worksheet.mergeCells(`E${startRowNumForLotNo}:G${endRowNumForLotNo}`);
          worksheet.getCell(`E${startRowNumForLotNo}`).border = {
            top: { style: "thin", color: { argb: "000000" } },
            left: { style: "thin", color: { argb: "000000" } },
            bottom: { style: "thin", color: { argb: "000000" } },
            right: { style: "thin", color: { argb: "000000" } },
          };
          worksheet.getCell(`E${startRowNumForLotNo}`).value = dataListForInsert[i]?.lot_no;
          worksheet.getCell(`E${startRowNumForLotNo}`).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          startRowNumForLotNo = 10 + i;
        } else {
          endRowNumForLotNo = i + 9;
        }
        //bag번호
        worksheet.mergeCells(`H${9 + i}:I${9 + i}`);
        worksheet.getCell(`H${9 + i}`).value = dataListForInsert[i]?.packing_no;
        worksheet.getCell(`H${9 + i}`).border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        worksheet.getCell(`H${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };

        //포장중량
        worksheet.mergeCells(`J${9 + i}:K${9 + i}`);
        worksheet.getCell(`J${9 + i}`).value = dataListForInsert[i]?.packing_qty;
        worksheet.getCell(`J${9 + i}`).border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        worksheet.getCell(`J${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };

        // 날짜 각각 뿌려주는 버전
        // //포장일자
        // worksheet.mergeCells(`L${9 + i}:M${9 + i}`);
        // worksheet.getCell(`L${9 + i}`).value =
        //   dataListForInsert[i]?.work_packing_date;
        // worksheet.getCell(`L${9 + i}`).border = {
        //   top: { style: "thin", color: { argb: "000000" } },
        //   left: { style: "thin", color: { argb: "000000" } },
        //   bottom: { style: "thin", color: { argb: "000000" } },
        //   right: { style: "thin", color: { argb: "000000" } },
        // };
        // worksheet.getCell(`L${9 + i}`).alignment = {
        //   vertical: "middle",
        //   horizontal: "center",
        // };

        // 날짜 병합버전
        if (dataListForInsert[i]?.work_packing_date !== dataListForInsert[i + 1]?.work_packing_date) {
          endRowNumForPacking = i + 9;
          worksheet.mergeCells(`L${startRowNumForPacking}:M${endRowNumForPacking}`);
          worksheet.getCell(`L${startRowNumForPacking}`).border = {
            top: { style: "thin", color: { argb: "000000" } },
            left: { style: "thin", color: { argb: "000000" } },
            bottom: { style: "thin", color: { argb: "000000" } },
            right: { style: "thin", color: { argb: "000000" } },
          };
          worksheet.getCell(`L${startRowNumForPacking}`).value = dataListForInsert[i]?.work_packing_date;
          worksheet.getCell(`L${startRowNumForPacking}`).alignment = {
            vertical: "middle",
            horizontal: "center",
          };

          startRowNumForPacking = 10 + i;
        } else {
          endRowNumForPacking = i + 9;
        }

        //포장 시간
        worksheet.mergeCells(`N${9 + i}:O${9 + i}`);
        worksheet.getCell(`N${9 + i}`).value = dataListForInsert[i]?.work_packing_time;
        worksheet.getCell(`N${9 + i}`).border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        worksheet.getCell(`N${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        //포장 작업자
        worksheet.mergeCells(`P${9 + i}:R${9 + i}`);
        worksheet.getCell(`P${9 + i}`).value = dataListForInsert[i]?.packing_emp_nm;
        worksheet.getCell(`P${9 + i}`).border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        worksheet.getCell(`P${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        //비고
        worksheet.mergeCells(`S${9 + i}:U${9 + i}`);
        worksheet.getCell(`S${9 + i}`).value = dataListForInsert[i]?.remark;
        worksheet.getCell(`S${9 + i}`).border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        worksheet.getCell(`S${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
      }
      //타겟 지정 구간 종료

      const buffer = await workbook.xlsx.writeBuffer();
      const modifiedBlob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      //파일명용 시간
      let fileNameDate = getDateFunction();
      // Step 5: 변경된 파일 다운로드 (file-saver 라이브러리 사용)

      saveAs(modifiedBlob, `${fileNameDate}_${fileTypeName}.xlsx`);
      setIsBackDrop(false);
      setModal();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  //ExcelData 입력구간 종료

  return (
    <FdrModal modalState={modalProps} setModal={setModal}>
      <S.ContentsWrap>
        <S.DatePickerWrap>
          <DatePicker datePickerSet={"single"} dateText={dateText} setDateText={setDateText} />
        </S.DatePickerWrap>
        <S.LinePickerWrap>
          <S.ComboBox
            disablePortal
            id="lineCbo"
            size="small"
            key={(option) => option?.line_id}
            options={lineOpt || null}
            getOptionLabel={(option) => option?.line_nm || ""}
            onChange={(_, newValue) => {
              setComboValue({
                ...comboValue,
                line_id: newValue?.line_id === undefined ? null : newValue?.line_id,
                line_nm: newValue?.line_nm === undefined ? null : newValue?.line_nm,
              });
            }}
            renderInput={(params) => <TextField {...params} label={CN.line_nm} size="small" />}
          />
        </S.LinePickerWrap>
        <S.buttonWrap>
          <BtnComponent btnName="Ok" onClick={actSearchDetail} />
        </S.buttonWrap>
      </S.ContentsWrap>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </FdrModal>
  );
}
