import React, { useState } from "react";
import ExcelJS from "exceljs";
import Grid from "@toast-ui/react-grid";
import "tui-grid/dist/tui-grid.css";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";

const Abcs = () => {
  const [gridData, setGridData] = useState([]);
  const [fileNm, setFileNm] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const workbook = new ExcelJS.Workbook();
    setFileNm(file.name);
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

        // 데이터 추출 및 가공 후 API 호출
        const rows = getDataRows(14, data); // 몇번째 행부터 읽어올지 0부터 시작
        const columns = getDataColumns(1, data); // 몇번째 행이 Column Name인지 0부터 시작
        console.log(columns);
        const rowsArr = await ExportJson(rows, columns, data);
        UploadInsp(JSON.stringify(rowsArr));
      })
      .catch((error) => {
        console.error("Error loading the workbook:", error);
      });
  };

  const getDataRows = (i, gridData) => {
    if (!gridData) {
      return;
    }
    const rows = [];
    const colHeader = getDataColumnsHeaders(1, gridData);
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
      const value = cellValue.richText
        ? cellValue.richText[0].text + cellValue.richText[1].text
        : cellValue;

      const header = columns.some((col) => col.header === value)
        ? `${value}_`
        : value;
      const column = { name: value, renderer: "text", header };
      columns.push(column);
    }
    return columns;
  };

  // const getDataColumnsHeaders = (i) => {
  //   return gridData.length > 0
  //     ? gridData[i].map(
  //         (value, index) => ({ name: `Column ${index}`, renderer: 'text', header: value })
  //       ).map(column => column.header)
  //     : [];

  // };
  const getDataColumnsHeaders = (i, gridData) => {
    if (!gridData) {
      return;
    }
    const headers = gridData.length > 0 ? gridData[i] : [];

    const newHeaders = headers.map((header, index) => {
      if (
        (header === "D5" ||
          header === "D50" ||
          header === "D95" ||
          header === "Dmin" ||
          header === "Dmax") &&
        index !== headers.indexOf(header)
      ) {
        return `${header}_`;
      }
      const value = header.richText
        ? header.richText[0].text + header.richText[1].text
        : header;

      return value;
    });
    return newHeaders;
  };
  // Export With Json With Parsing
  const ExportJson = (rows, columns, gridData) => {
    const colHeader = getDataColumnsHeaders(1, gridData);
    const sL = getDataColumnsHeaders(4, gridData);
    const sU = getDataColumnsHeaders(5, gridData);
    const parsedCells = [];
    let prodNm = fileNm;
    const parsedRows = rows.map((row) => {
      const columnCount = columns.length;

      for (let i = 8; i <= columnCount; i++) {
        const parsedCell = {};
        // if(i===8)
        // {
        parsedCell["prod_id"] = "C6BF0F5E-3EEE-ED11-A1E4-A0D3C1FA18B7"; //fileNm
        // }
        // else
        // {
        //   if (prodNm.includes("_"))
        //   {
        //     prodNm = prodNm.substring(0, prodNm.indexOf("_"));
        //     console.log('aa')
        //   }
        //   else if(prodNm.includes(" "))
        //   {
        //     prodNm = prodNm.substring(0, prodNm.indexOf(" "));
        //     console.log('bb')
        //   }
        //   parsedCell["prod_id"] = prodNm
        // }

        parsedCell["lot_no"] = row[colHeader[2]];
        parsedCell["work_date"] = row[colHeader[3]];
        parsedCell["insp_item"] = colHeader[i];
        parsedCell["insp_min"] = String(sL[i]);
        parsedCell["insp_max"] = String(sU[i]);
        parsedCell["insp_value"] = String(row[colHeader[i]]);
        parsedCell["remark"] = "test";
        parsedCells.push(parsedCell);
      }
    });
    // console.log(JSON.stringify(parsedCells));
    return parsedCells;
  };

  const UploadInsp = (rowsArr) => {
    // const rowsArr = ExportJson();
    // postInspData(JSON.stringify(rowsArr));
    postInspData(rowsArr);
  };

  const postInspData = async (data) => {
    console.log(data);
    try {
      const response = await restAPI.post(restURI.inspResultUpload, data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="excel-import">
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />

      <div className="grid-container">
        {gridData.length > 0 && (
          <>
            {/* <button onClick={ExportJson}>Json으로 내보내기</button>
            <Grid scrollX={true} scrollY={true} data={rows} columns={columns} />
            <button onClick={UploadInsp}>Insp Upload(Post)</button> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Abcs;
