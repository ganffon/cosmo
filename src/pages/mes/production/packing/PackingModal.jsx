import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as S from "./PackingModal.styled";
import { LayoutContext } from "components/layout/common/Layout";
import CloseIcon from "@mui/icons-material/Close";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import cosmoBarcodeLogo from "img/Logo/cosmoBarcodeLogo.png";
import JsBarcode from "jsbarcode";

function PackingModal(props) {
  const componentRef = useRef(null);
  const { onClose = () => {}, refModalGrid = null, isAddOneRow = false, data = [] } = props;
  const [isBackDrop, setIsBackDrop] = useState(false);
  const { currentMenuName } = useContext(LayoutContext);
  const [seriesData, setSeriesData] = useState(null);
  useEffect(() => {
    isAddOneRow && refModalGrid?.current?.gridInst?.appendRow();

    JsBarcode("#barcode", data.barcodeNo, {
      format: "CODE128",
      displayValue: false,
      fontSize: 40,
      height: "100%",
      margin: 5,
    });

    handlePrint();
    onClose();
  }, [data]);

  const series = data;
  const rowHeaders = ["checkbox"];

  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=1200,height=800");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            @media print {
              @page {
                size: A4 landscape;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
              }
              .print-button {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-content">
            ${componentRef.current.outerHTML}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 0);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };
  const renderBlock = (data) => {
    const blocks = [];
    if (!data) {
      return;
    } else {
      for (let i = 0; i < data.cnt; i++) {
        blocks.push(
          <div
            style={{
              display: "flex",
              width: "calc(100% - 20px)",
              height: "calc(100% - 70px)",
              gap: "10px",
              padding: "10px",
            }}
          >
            <div style={{ width: "50%", padding: "5mm", borderRight: "1px solid black", display: "flex" }}>
              <div style={{ width: "100%", height: "calc(100% - 40px)" }}>
                <div style={{ width: "100%", height: "calc(100% - 40px)", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
                    <img
                      src={cosmoBarcodeLogo}
                      alt={"cosmoBarcodeLogo"}
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        width: "60mm",
                        height: "40px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "50%",
                      marginTop: "15px",
                    }}
                  >
                    <div style={{ width: "20%", height: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          height: "100%",
                          borderRight: "1px solid white",
                          fontSize: "26px",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          backgroundColor: "black",
                        }}
                        fWeight={"bold"}
                      >
                        Item
                      </div>
                    </div>
                    <div style={{ width: "80%", height: "100%", backgroundColor: "black" }}>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          height: "100%",
                          borderLeft: "1px solid white",
                          fontSize: "44px",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#FFFFFF",
                          backgroundColor: "#000000",
                        }}
                      >
                        {data.prodNM}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", width: "100%", height: "50%", border: "1px solid black" }}>
                    <div
                      style={{
                        width: "20%",
                        height: "100%",
                        borderRight: "1px solid black",
                        display: "flex",
                        fontSize: "22px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>Product</div>
                    </div>
                    <div style={{ width: "80%", height: "100%", borderLeft: "1px solid black" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          fontSize: "30px",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRight: "1px solid black",
                        }}
                      >
                        {data.prodCD}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", width: "100%", height: "50%", border: "1px solid black" }}>
                    <div
                      style={{
                        width: "20%",
                        height: "100%",
                        borderRight: "1px solid black",
                        display: "flex",
                        fontSize: "22px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>Lot No.</div>
                    </div>
                    <div style={{ width: "70%", height: "100%", borderLeft: "1px solid black" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          fontSize: "42px",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        {data.lot} -
                      </div>
                    </div>
                    <div
                      style={{
                        width: "10%",
                        height: "100%",
                        display: "flex",
                        fontSize: "42px",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <div>{i + 1}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", width: "100%", height: "50%", border: "1px solid black" }}>
                    <div style={{ width: "20%", height: "100%", borderRight: "1px solid black" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          fontSize: "22px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Net
                      </div>
                    </div>
                    <div style={{ width: "80%", height: "100%", borderLeft: "1px solid black" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          fontSize: "30px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {data.qty} Kg
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", width: "100%", height: "50%", border: "1px solid black" }}>
                    <div style={{ width: "20%", height: "100%", borderRight: "1px solid black" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          fontSize: "32px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Date
                      </div>
                    </div>
                    <div style={{ width: "70%", height: "100%", borderLeft: "1px solid black" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          fontSize: "30px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {data.date}
                      </div>
                    </div>
                    {data.gubn !== "X" && (
                      <div style={{ width: "10%", height: "100%", borderLeft: "1px solid black" }}>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            fontSize: "30px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {data.gubn}
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      border: "1px solid black",
                      width: "100%",
                      height: "60%",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    COSMO AM&T Co.,Ltd.<br></br>
                    #315, Mokhang-Dong, Chungju-city, Chungbuk. Korea<br></br>
                    Phone : 82-43-850-1430 / Fax : +82-43-850-1542
                  </div>
                  <div style={{ textAlign: "center", marginTop: "5mm", width: "100%", height: "100%" }}>
                    <svg id="barcode"></svg>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "50%", padding: "5mm", display: "flex" }}>
              <div style={{ width: "100%", height: "calc(100% - 40px)" }}>
                <div style={{ width: "100%", height: "calc(100% - 40px)", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
                    <img
                      src={cosmoBarcodeLogo}
                      alt={"cosmoBarcodeLogo"}
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        width: "60mm",
                        height: "40px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "50%",
                      marginTop: "15px",
                    }}
                  >
                    <div style={{ width: "20%", height: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          height: "100%",
                          borderRight: "1px solid white",
                          fontSize: "26px",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          backgroundColor: "black",
                        }}
                        fWeight={"bold"}
                      >
                        Item
                      </div>
                    </div>
                    <div style={{ width: "80%", height: "100%", backgroundColor: "black" }}>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          height: "100%",
                          borderLeft: "1px solid white",
                          fontSize: "44px",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#FFFFFF",
                          backgroundColor: "#000000",
                        }}
                      >
                        {data.prodNM}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", width: "100%", height: "50%", border: "1px solid black" }}>
                    <div
                      style={{
                        width: "20%",
                        height: "100%",
                        borderRight: "1px solid black",
                        display: "flex",
                        fontSize: "22px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>Product</div>
                    </div>
                    <div style={{ width: "80%", height: "100%", borderLeft: "1px solid black" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          fontSize: "30px",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRight: "1px solid black",
                        }}
                      >
                        {data.prodCD}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", width: "100%", height: "50%", border: "1px solid black" }}>
                    <div
                      style={{
                        width: "20%",
                        height: "100%",
                        borderRight: "1px solid black",
                        display: "flex",
                        fontSize: "22px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div>Lot No.</div>
                    </div>
                    <div style={{ width: "70%", height: "100%", borderLeft: "1px solid black" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          fontSize: "42px",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        {data.lot} -
                      </div>
                    </div>
                    <div
                      style={{
                        width: "10%",
                        height: "100%",
                        display: "flex",
                        fontSize: "42px",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <div>{i + 1}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", width: "100%", height: "50%", border: "1px solid black" }}>
                    <div style={{ width: "20%", height: "100%", borderRight: "1px solid black" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          fontSize: "22px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Net
                      </div>
                    </div>
                    <div style={{ width: "80%", height: "100%", borderLeft: "1px solid black" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          fontSize: "30px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {data.qty} Kg
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", width: "100%", height: "50%", border: "1px solid black" }}>
                    <div style={{ width: "20%", height: "100%", borderRight: "1px solid black" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          fontSize: "32px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Date
                      </div>
                    </div>
                    <div style={{ width: "70%", height: "100%", borderLeft: "1px solid black" }}>
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          fontSize: "30px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {data.date}
                      </div>
                    </div>
                    {data.gubn !== "X" && (
                      <div style={{ width: "10%", height: "100%", borderLeft: "1px solid black" }}>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            fontSize: "30px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {data.gubn}
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      border: "1px solid black",
                      width: "100%",
                      height: "60%",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    COSMO AM&T Co.,Ltd.<br></br>
                    #315, Mokhang-Dong, Chungju-city, Chungbuk. Korea<br></br>
                    Phone : 82-43-850-1430 / Fax : +82-43-850-1542
                  </div>
                  <div style={{ textAlign: "center", marginTop: "5mm", width: "100%", height: "100%" }}>
                    <svg id="barcode"></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return blocks;
  };

  return (
    <ModalWrapMulti width={"0%"} height={"0%"}>
      <S.HeaderBox>
        <S.TitleBox>{`${currentMenuName}`}</S.TitleBox>
        <S.ButtonClose color="primary" aria-label="close" onClick={onClose}>
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.ShadowBoxGrid>
        <S.ButtonWrap>
          <S.BtnComponent height={"34px"} width={"110px"} onClick={handlePrint}>
            <S.SearchTitle>프린트</S.SearchTitle>
          </S.BtnComponent>
        </S.ButtonWrap>
        <div style={{ width: "100%", padding: "10px", overflow: "auto" }} ref={componentRef}>
          {data && renderBlock(data)}
        </div>
      </S.ShadowBoxGrid>
    </ModalWrapMulti>
  );
}

export default PackingModal;
