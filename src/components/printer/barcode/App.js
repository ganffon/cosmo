import logo from "./logo.svg";
import "./App.css";
import Hello from "./Components/Hello";
import ZplTrans from "./ZplTrans";
import PrintButton from "./TestTest";
import ZPLToHTML from "./barcodeHtml";
import Excel from "./ExcelExportTest";
import PrintHTML from "./PrintHTML";
import Label from "./PrintHtmlTest";
// Import the zebra-browser-prit-wrapper package
const ZebraBrowserPrintWrapper = require("zebra-browser-print-wrapper");

const printBarcode = async (serial) => {
  try {
    // Create a new instance of the object
    const browserPrint = new ZebraBrowserPrintWrapper();

    // Select default printer
    const defaultPrinter = await browserPrint.getDefaultPrinter();

    // Set the printer
    browserPrint.setPrinter(defaultPrinter);

    // Check printer status
    const printerStatus = await browserPrint.checkPrinterStatus();

    // Check if the printer is ready
    if (printerStatus.isReadyToPrint) {
      // ZPL script to print a simple barcode
      const zpl = `^XA
                        ^BY2,2,100
                        ^FO20,20^BC^FD${serial}^FS
                        ^XZ`;

      browserPrint.print(zpl);
    } else {
      console.log("Error/s", printerStatus.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const barcodeValue = "NL21A08E2-1";
const itemId = "MLCNE00028";
const productNm = "Lithium Carbonate";
const lotNo = "NL21A08E2-1";
const net = "432KG";
const legDate = "2023-04-28";

function App() {
  return (
    <div>
      {/* <PrintHTML
      itemId={itemId}
      productNm = {productNm}
      lotNo = {lotNo}
      net = {net}
      legDate = {legDate}
      barcodeValue = {barcodeValue}
      >
      </PrintHTML> */}
      {/* <h1>Product Page</h1> */}
      <ZPLToHTML
        productCode={productCode}
        partName={partName}
        lotNo={lotNo}
        weight={weight}
        legDate={legDate}
        barcodeValue={barcodeValue}
      />
    </div>
  );
}

export default App;
