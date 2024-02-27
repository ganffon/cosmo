import React, { useRef, useState } from "react";
import * as S from "./WeightReportExcelModal.styled";
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

export default function WeightReportExcelModal(props) {
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
      let conditionLineID;
      comboValue.line_id ? (conditionLineID = `&line_id=${comboValue.line_id}`) : (conditionLineID = "");
      let readURI =
        restURI.prdWeightDetail +
        `?input_start_date=${dateText.startDate}&input_end_date=${dateText.startDate}` +
        conditionLineID;
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
      const sortDataList = datalist.sort((a, b) =>
        (a.work_input_date + a.work_input_time).localeCompare(a.work_input_date + a.work_input_time)
      );

      console.log(sortDataList);
      //   setIsBackDrop(true);
      downLoadFile(sortDataList);
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
    const fileTypeName = "일일계량일지";
    const extension = "xlsx";

    const fileName = "FIL-003";
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
      let startRowNum = 9;
      let endRowNum = 9;
      let rowNum = 1;
      //타겟 지정 구간 시작
      for (let i = 0; i < props.length; i++) {
        // debugger;
        const dataListForInsert = props;

        //넘버링관령 사항 처리
        // worksheet.getCell(`B${9 + i}`).value = i + 1;
        // worksheet.getCell(`B${9 + i}`).alignment = {
        //   vertical: "middle",
        //   horizontal: "center",
        // };
        // worksheet.getCell(`B${9 + i}`).border = {
        //   left: { style: "medium", color: { argb: "000000" } },
        //   bottom: { style: "thin", color: { argb: "000000" } },
        //   right: { style: "thin", color: { argb: "000000" } },
        // };
        if (dataListForInsert[i]?.work_weigh_id !== dataListForInsert[i + 1]?.work_weigh_id) {
          endRowNum = i + 9;
          worksheet.mergeCells(`B${startRowNum}:B${endRowNum}`);

          worksheet.getCell(`B${startRowNum}`).value = rowNum;
          worksheet.getCell(`B${startRowNum}`).alignment = {
            vertical: "middle",
            horizontal: "center",
          };
          worksheet.getCell(`B${startRowNum}`).border = {
            left: { style: "medium", color: { argb: "000000" } },
            bottom: { style: "thin", color: { argb: "000000" } },
            right: { style: "thin", color: { argb: "000000" } },
          };
          rowNum++;

          startRowNum = 10 + i;
        } else {
          endRowNum = i + 9;
        }

        //제품분류 사항 처리

        if (dataListForInsert[i]?.prod_class_nm !== dataListForInsert[i + 1]?.prod_class_nm) {
          endRowNumForProdName = i + 9;
          worksheet.mergeCells(`C${startRowNumForProdName}:D${endRowNumForProdName}`);

          worksheet.getCell(`C${startRowNumForProdName}`).border = {
            top: { style: "thin", color: { argb: "000000" } },
            left: { style: "thin", color: { argb: "000000" } },
            bottom: { style: "thin", color: { argb: "000000" } },
            right: { style: "thin", color: { argb: "000000" } },
          };
          worksheet.getCell(`C${startRowNumForProdName}`).value = dataListForInsert[i]?.prod_class_nm;
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
          if (dataListForInsert[i]?.prod_class_nm !== dataListForInsert[i + 1]?.prod_class_nm) {
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
        }

        //총중량
        worksheet.mergeCells(`H${9 + i}:I${9 + i}`);
        worksheet.getCell(`H${9 + i}`).value = dataListForInsert[i]?.total_qty;
        worksheet.getCell(`H${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell(`H${9 + i}`).border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        //bag중량
        worksheet.mergeCells(`J${9 + i}:K${9 + i}`);
        worksheet.getCell(`J${9 + i}`).value = dataListForInsert[i]?.bag_qty;
        worksheet.getCell(`J${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell(`J${9 + i}`).border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        //투입중량
        worksheet.mergeCells(`R${9 + i}:S${9 + i}`);
        worksheet.getCell(`R${9 + i}`).value = dataListForInsert[i]?.input_qty;
        worksheet.getCell(`R${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };

        worksheet.getCell(`R${9 + i}`).border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        //투입 일자

        worksheet.mergeCells(`T${9 + i}:U${9 + i}`);
        worksheet.getCell(`T${9 + i}`).value = dataListForInsert[i]?.work_input_date;
        worksheet.getCell(`T${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell(`T${9 + i}`).border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        //투입시간
        worksheet.mergeCells(`V${9 + i}:W${9 + i}`);
        worksheet.getCell(`V${9 + i}`).value = dataListForInsert[i]?.work_input_time;
        worksheet.getCell(`V${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell(`V${9 + i}`).border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        //투입작업자
        worksheet.mergeCells(`X${9 + i}:Y${9 + i}`);
        worksheet.getCell(`X${9 + i}`).value = dataListForInsert[i]?.input_emp_nm;
        worksheet.getCell(`X${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell(`X${9 + i}`).border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        //비고
        worksheet.mergeCells(`Z${9 + i}:AC${9 + i}`);
        worksheet.getCell(`Z${9 + i}`).value = dataListForInsert[i]?.remark;
        worksheet.getCell(`Z${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell(`Z${9 + i}`).border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        //계량일
        worksheet.mergeCells(`L${9 + i}:M${9 + i}`);
        worksheet.getCell(`L${9 + i}`).value = dataListForInsert[i]?.work_weigh_date;
        worksheet.getCell(`L${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell(`L${9 + i}`).border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        //계량 시간
        worksheet.mergeCells(`N${9 + i}:O${9 + i}`);
        worksheet.getCell(`N${9 + i}`).value = dataListForInsert[i]?.work_weigh_time;
        worksheet.getCell(`N${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell(`N${9 + i}`).border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        //계량 작업자
        worksheet.mergeCells(`P${9 + i}:Q${9 + i}`);
        worksheet.getCell(`P${9 + i}`).value = dataListForInsert[i]?.weigh_emp_nm;
        worksheet.getCell(`P${9 + i}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell(`P${9 + i}`).border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
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
