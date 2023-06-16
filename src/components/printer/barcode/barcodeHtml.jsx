import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

const ZPLToHTML = (props) => {
  const componentRef = useRef(null);
  const barcodeValue = props.barcodeValue;
  const productCode = props.productCode;
  const partName = props.partName;
  const lotNo = props.lotNo;
  const weight = props.weight;
  const legDate = props.legDate;

  useEffect(() => {
    JsBarcode("#barcode", barcodeValue, {
      format: "CODE128",
      displayValue: false,
      fontSize: 40,
      width: 1,
      height: 40,
      margin: 5,
    });
  }, [barcodeValue]);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            .print-button {
              display: none;
            }
          </style>
        </head>
        <body onload="window.print(); window.close()">
          ${componentRef.current.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div>
      <div
        ref={componentRef}
        style={{
          width: "80mm",
          height: "50mm",
          padding: "5mm",
          fontFamily: "Arial, sans-serif",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ textAlign: "center", fontSize: "16px", fontWeight: "bold" }}
        >
          Lithium thqns tlrqufvy
        </div>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                fontSize: "10px",
                fontWeight: "bold",
              }}
            >
              품목코드
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                fontSize: "10px",
              }}
            >
              {productCode}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                fontWeight: "bold",
                fontSize: "10px",
              }}
            >
              품목명
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                fontSize: "10px",
              }}
            >
              {partName}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                fontWeight: "bold",
                fontSize: "10px",
              }}
            >
              LOT
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                fontSize: "10px",
              }}
            >
              {lotNo}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                fontWeight: "bold",
                fontSize: "10px",
              }}
            >
              중량
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                fontSize: "10px",
              }}
            >
              {weight}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                fontWeight: "bold",
                fontSize: "10px",
              }}
            >
              소분일자
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                fontSize: "10px",
              }}
            >
              {legDate}
            </td>
          </tr>
        </table>
        <div style={{ textAlign: "center" }}>
          <svg id="barcode"></svg>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "left", marginTop: "1rem" }}
      >
        <button className="print-button" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
};

export default ZPLToHTML;
