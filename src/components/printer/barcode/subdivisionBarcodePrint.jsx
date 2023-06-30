import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

const SubdivisionBarcodePrint = (props) => {
  const { barcodeValue, productCode, partName, lotNo, weight, legDate, componentRef } = props;

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

  return (
    <div
      ref={componentRef}
      style={{
        width: "75mm",
        height: "45mm",
        marginTop: "5px",
        fontFamily: "Arial, sans-serif",
        // border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        zIndex: "-100000",
      }}
    >
      <div style={{ textAlign: "center", fontSize: "16px", fontWeight: "bold" }}>Lithium 소분 식별표</div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        {/* <tr>
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
        </tr> */}
        <tr>
          <td
            style={{
              border: "1px solid black",
              padding: "5px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            LOT
          </td>
          <td
            style={{
              border: "1px solid black",
              padding: "5px",
              fontSize: "20px",
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
              fontSize: "20px",
            }}
          >
            중량
          </td>
          <td
            style={{
              border: "1px solid black",
              padding: "5px",
              fontSize: "20px",
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
              fontSize: "20px",
            }}
          >
            소분일자
          </td>
          <td
            style={{
              border: "1px solid black",
              padding: "5px",
              fontSize: "20px",
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
  );
};

export default SubdivisionBarcodePrint;
