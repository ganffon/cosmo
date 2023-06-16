import React, { useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default function Excel() {
  const [worksheet, setWorksheet] = useState(null);
  const [workbook, setWorkBook] = useState(null);
  // 워크시트 생성 함수
  function createWorksheet() {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("MySheet");
    ws.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Age", key: "age", width: 10 },
      { header: "Gender", key: "gender", width: 10 },
    ];
    ws.addRow({ name: "John Doe", age: 30, gender: "Male" });
    setWorksheet(ws);
    setWorkBook(wb);
  }
  
  // 다운로드
  async function DownLoadWorksheet() {
    const mimeType = { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], mimeType);
    
    saveAs(blob, new Date() + ".xlsx");
  }


  // 인쇄 함수
  async function printWorksheet() {
    if (!worksheet) return;
    // const wb = new ExcelJS.Workbook();
    // wb.addWorksheet(worksheet);

    const mimeType = { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], mimeType);
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url);
    printWindow.onload = function () {
    printWindow.print();
  };
    // wb.xlsx.writeBuffer().then((buffer) => {
    //     const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    //     const url = URL.createObjectURL(blob);
    //     const printWindow = window.open(url);
    //     printWindow.onload = function () {
    //     printWindow.print();
    //   };
    // });
  }

  return (
    <div>
      <button onClick={createWorksheet}>Create Worksheet</button>
      <button onClick={printWorksheet}>Print Worksheet</button>
      <button onClick={DownLoadWorksheet}>Download Worksheet</button>
    </div>
  );
}
