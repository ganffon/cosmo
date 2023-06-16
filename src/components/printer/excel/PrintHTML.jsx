import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const ZPLToHTML = (props) => {
    const componentRef = useRef(null);
    const itemId = props.itemId
    const productNm =  props.productNm
    const lotNo =  props.lotNo
    const net =  props.net
    const legDate =  props.legDate
    const barcodeValue = props.barcodeValue

  useEffect(() => {
    JsBarcode('#barcode', barcodeValue, {
      format: 'CODE128',
      displayValue: false,
      fontSize: 20,
      width: 2,
      height: 100,
      // margin: 10,
      textMargin:0,
    });
  }, [  itemId,
        productNm,
        lotNo,
        net,
        legDate,
        barcodeValue
    ]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    
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
        <style>@page { size: landscape; }</style>
          ${componentRef.current.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div ref={componentRef}
    style={{
      width: '296mm',
      height: '200mm',
      
      }}>
      <div
        style={{
          width: '138mm',
          height: '190mm',
          padding: '3mm',
          fontFamily: 'Arial, sans-serif',
          borderRight: '1px solid black',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          float: 'left' ,
          
        }}
      >
        <table style={{ borderCollapse: 'collapse', width: '130mm', height: '200mm', float:'left' }}>
          <tr>
            <td style={{ border: '1px solid black', padding: '10px', fontSize: '16px', fontWeight: 'bold' }}>Item</td>
            <td style={{ border: '1px solid black', padding: '10px', fontSize: '16px' }}>{itemId}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold', fontSize: '16px' }}>Product</td>
            <td style={{ border: '1px solid black', padding: '10px', fontSize: '16px' }}>{productNm}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold', fontSize: '16px' }}>LOT No</td>
            <td style={{ border: '1px solid black', padding: '10px', fontSize: '16px' }}>{lotNo}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold', fontSize: '16px' }}>Net</td>
            <td style={{ border: '1px solid black', padding: '10px', fontSize: '16px' }}>{net}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold', fontSize: '10px' }}>Date</td>
            <td style={{ border: '1px solid black', padding: '10px', fontSize: '10px' }}>{legDate}</td>
          </tr>
          <tr>
            <td colspan='2' style={{textAlign: 'center', border: '1px solid black', padding: '10px', fontWeight: 'bold', fontSize: '10px' }}>
              <svg id="barcode"></svg>
            </td>
          </tr>
          <tr>
              <td colspan='2' style={{textAlign: 'center', border: '1px solid black', padding: '10px', fontWeight: 'bold', fontSize: '16px' }}>
                COSMO AM&T Co.,Ltd.<br></br>
                #315, Mokhang-Dong, Chungju-city, Chungbuk. Korea<br></br>
                Phone : 82-43-850-1430 / Fax : +82-43-850-1542</td>
          </tr>
        </table>
        
      </div>
      <div
        style={{
          width: '138mm',
          height: '190mm',
          padding: '3mm',
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'left',
          float: 'right' ,
        }}
      >
<       table style={{ borderCollapse: 'collapse', width: '130mm', height: '200mm', float:'right'}}>
          <tr>
            <td style={{ border: '1px solid black', padding: '10px', fontSize: '16px', fontWeight: 'bold' }}>Item</td>
            <td style={{ border: '1px solid black', padding: '10px', fontSize: '16px' }}>{itemId}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold', fontSize: '16px' }}>Product</td>
            <td style={{ border: '1px solid black', padding: '10px', fontSize: '16px' }}>{productNm}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold', fontSize: '16px' }}>LOT No</td>
            <td style={{ border: '1px solid black', padding: '10px', fontSize: '16px' }}>{lotNo}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold', fontSize: '16px' }}>Net</td>
            <td style={{ border: '1px solid black', padding: '10px', fontSize: '16px' }}>{net}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold', fontSize: '10px' }}>Date</td>
            <td style={{ border: '1px solid black', padding: '10px', fontSize: '10px' }}>{legDate}</td>
          </tr>
          <tr>
            <td colspan='2' style={{textAlign: 'center', border: '1px solid black', padding: '10px', fontWeight: 'bold', fontSize: '10px' }}>
              <svg id="barcode"></svg>
            </td>
          </tr>
          <tr>
              <td colspan='2' style={{textAlign: 'center', border: '1px solid black', padding: '10px', fontWeight: 'bold', fontSize: '16px' }}>
                COSMO AM&T Co.,Ltd.<br></br>
                #315, Mokhang-Dong, Chungju-city, Chungbuk. Korea<br></br>
                Phone : 82-43-850-1430 / Fax : +82-43-850-1542</td>
          </tr>
        </table>
      </div>
      
        
      <div style={{ display: 'flex', justifyContent: 'left', marginTop: '1rem' }}>
        <button className="print-button" onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default ZPLToHTML;
