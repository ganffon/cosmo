import { useContext, useState, useEffect, useRef, useReducer } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import NoticeSnack from "components/alert/NoticeSnack";

import BackDrop from "components/backdrop/BackDrop";
import InventoryViewSet from "pages/mes/managementInfo/inventoryView/inventoryViewSet";
import * as S from "./inventoryView.styled";
import { Contents } from "components/layout/common/contents";
import { FdrDate } from "components/datetime/fdrDate";
import DateTime from "components/datetime/DateTime";
import BtnComponent from "components/button/BtnComponent";
import { FdrChart } from "components/chart/fdrChart";
import GridSingle from "components/grid/GridSingle";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import { palette } from "constant/color";
import _ from "lodash";
import { NumCommaNotGrid } from "custom/RegularExpression";
import Switch from "@mui/material/Switch";

export function InventoryView(props) {
  const { isMenuSlide } = useContext(LayoutContext);
  const refMaterialGrid = useRef(null);
  const refProdGrid = useRef(null);

  const cRefMaterialGrid = refMaterialGrid.current;
  const cRefProdGrid = refProdGrid.current;

  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridMaterialData, setGridMaterialData] = useState(null);
  const [gridProductData, setGridProductData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [convertUnit, setConvertUnit] = useState("kg"); // "kg" | "t"

  const { header, columnsMaterial, columnsProduct, columnOptions } = InventoryViewSet(convertUnit);

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    cRefMaterialGrid?.getInstance()?.refreshLayout();
    cRefProdGrid?.getInstance()?.refreshLayout();
  }, [isMenuSlide]);

  const filterReducer = (filter, action) => {
    switch (action.type) {
      case "update":
        return { ...filter, [action.id]: action.value };
      case "reset":
        return { ...{ chartDate: DateTime().dateMonth } };
      default:
        return filter;
    }
  };

  const [filter, filterDispatch] = useReducer(filterReducer, {
    chartDate: DateTime().dateMonth,
  });

  useEffect(() => {
    onSearch();
  }, [filter.chartDate]);

  const onSearch = async () => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(restURI.KpiProdStockStatusByMonthly, { params: { date: filter.chartDate } });

      const filteredMaterial = result.data.data.rows[0].material.filter((item) => item.month === filter.chartDate);
      const filteredProduct = result.data.data.rows[0].product.filter((item) => item.month === filter.chartDate);

      getChartData(result.data.data.rows[0].material);

      let convertUnitMaterial, convertUnitProduct;

      if (convertUnit === "t") {
        convertUnitMaterial = filteredMaterial.map((item) => ({
          ...item,
          start_qty: Math.round(item.start_qty / 1000),
          income_qty: Math.round(item.income_qty / 1000),
          input_qty: Math.round(item.input_qty / 1000),
          end_qty: Math.round(item.end_qty / 1000),
        }));
        convertUnitProduct = filteredProduct.map((item) => ({
          ...item,
          start_qty: Math.round(item.start_qty / 1000),
          work_qty: Math.round(item.work_qty / 1000),
          input_qty: Math.round(item.input_qty / 1000),
          outgo_qty: Math.round(item.outgo_qty / 1000),
          end_qty: Math.round(item.end_qty / 1000),
        }));
      } else {
        convertUnitMaterial = filteredMaterial;
        convertUnitProduct = filteredProduct;
      }

      setGridMaterialData(convertUnitMaterial);
      setGridProductData(convertUnitProduct);
    } catch (err) {
      setIsSnackOpen({ ...isSnackOpen, open: true, severity: "error", message: "조회 실패" });
    } finally {
      setIsBackDrop(false);
    }
  };

  const [chartLeft, setChartLeft] = useState({});
  const [chartMid, setChartMid] = useState({});
  const [chartRight, setChartRight] = useState({});

  const getChartData = (data) => {
    let xAxisLabel = [];
    for (let month = 1; month <= 12; month++) {
      xAxisLabel.push(`${month.toString()}월`);
    }

    // data 에서 prod_class_nm 을 중복제거하여 대표이름을 구함
    const unique_prod_class_nms = [...new Set(data.map((item) => item.prod_class_nm))];

    const seriesStartQty = unique_prod_class_nms.map((prodClassNm) => {
      let seriesData = data
        .filter((item) => item.prod_class_nm === prodClassNm)
        .map((item) => {
          if (convertUnit === "kg") {
            return item.start_qty ? item.start_qty : 0;
          } else {
            return item.start_qty ? Math.round(item.start_qty / 1000) : 0;
          }
        });
      return {
        name: "기초재고",
        data: seriesData,
      };
    });

    const seriesEndQty = unique_prod_class_nms.map((prodClassNm) => {
      let seriesData = data
        .filter((item) => item.prod_class_nm === prodClassNm)
        .map((item) => {
          if (convertUnit === "kg") {
            return item.end_qty ? item.end_qty : 0;
          } else {
            return item.end_qty ? Math.round(item.end_qty / 1000) : 0;
          }
        });
      return {
        name: "기말재고",
        data: seriesData,
      };
    });
    const seriesLeft = [seriesStartQty[0], seriesEndQty[0]];
    const seriesMid = [seriesStartQty[1], seriesEndQty[1]];
    const seriesRight = [seriesStartQty[2], seriesEndQty[2]];

    const options = {
      chart: {
        height: 300,
        toolbar: {
          show: false,
        },
        zoom: { enabled: false },
      },
      colors: [palette.blue[500], palette.green[500], palette.orange[500], palette.purple[500]],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 1,
          columnWidth: "80%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 5,
        curve: "smooth",
        // colors: ["transparent"],
      },
      xaxis: {
        categories: xAxisLabel,
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return NumCommaNotGrid(Math.round(value)) + ` ${convertUnit}`;
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        offsetY: -10,
        floating: false,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return NumCommaNotGrid(val) + ` ${convertUnit}`;
          },
        },
      },
      title: {
        text: "title",
        floating: false,
        offsetY: 0,
        align: "center",
      },
    };

    let optionsLeft = _.cloneDeep(options);
    let optionsMid = _.cloneDeep(options);
    let optionsRight = _.cloneDeep(options);

    const searchYear = filter.chartDate.split("-")[0];

    optionsLeft.colors = [palette.green[300], palette.green[500]];
    optionsLeft.title.text = `${searchYear}년 전구체 재고 (${convertUnit})`;

    optionsMid.colors = [palette.orange[300], palette.orange[500]];
    optionsMid.title.text = `${searchYear}년 리튬 재고 (${convertUnit})`;

    optionsRight.colors = [palette.purple[300], palette.purple[500]];
    optionsRight.title.text = `${searchYear}년 첨가제 재고 (${convertUnit})`;

    setChartLeft({ ...chartLeft, type: "bar", series: seriesLeft, options: optionsLeft });
    setChartMid({ ...chartMid, type: "bar", series: seriesMid, options: optionsMid });
    setChartRight({ ...chartRight, type: "bar", series: seriesRight, options: optionsRight });
  };

  const onSwitch = () => {
    if (convertUnit === "kg") {
      setConvertUnit("t");
    } else {
      setConvertUnit("kg");
    }
  };

  useEffect(() => {
    onSearch();
  }, [convertUnit]);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = DateTime().dateMonth;
      if (currentDate !== filter.chartDate) {
        filterDispatch({
          type: "update",
          id: "chartDate",
          value: currentDate,
        });
      }
      setTimeout(() => {
        onSearch();
      }, 500);
    }, 3600000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Contents>
      <S.ConditionWrap>
        <S.FilterWrap>
          <FdrDate
            id={"chartDate"}
            value={filter.chartDate}
            dispatch={filterDispatch}
            type={"month"}
            onSearch={onSearch}
          />
          <S.SwitchWrap>
            <S.SwitchName className={convertUnit === "kg" ? "unitOn" : "unitOff"}>kg</S.SwitchName>
            <Switch onClick={onSwitch} />
            <S.SwitchName className={convertUnit === "t" ? "unitOn" : "unitOff"}>ton</S.SwitchName>
          </S.SwitchWrap>
        </S.FilterWrap>
        <BtnComponent btnName={"Search"} onClick={onSearch} />
      </S.ConditionWrap>
      <S.InventoryWrap>
        <S.GridBox>
          <S.TitleWrap>
            <S.Title>{`[ ${filter.chartDate.split("-")[0]}년 ${
              filter.chartDate.split("-")[1]
            }월 ] 원료 재고량`}</S.Title>
          </S.TitleWrap>
          <S.GridWrap>
            <GridSingle
              columnOptions={columnOptions}
              columns={columnsMaterial}
              rowHeaders={["rowNum"]}
              header={header}
              data={gridMaterialData}
              draggable={false}
              refGrid={refMaterialGrid}
            />
          </S.GridWrap>
        </S.GridBox>
        <S.GridBox>
          <S.TitleWrap>
            <S.Title>{`[ ${filter.chartDate.split("-")[0]}년 ${
              filter.chartDate.split("-")[1]
            }월 ] 제품 재고량`}</S.Title>
          </S.TitleWrap>
          <S.GridWrap>
            <GridSingle
              columnOptions={columnOptions}
              columns={columnsProduct}
              rowHeaders={["rowNum"]}
              header={header}
              data={gridProductData}
              draggable={false}
              refGrid={refProdGrid}
            />
          </S.GridWrap>
        </S.GridBox>
      </S.InventoryWrap>
      <S.ChartWrap>
        <S.ChartBox>
          <FdrChart chart={chartLeft} />
        </S.ChartBox>
        <S.ChartBox>
          <FdrChart chart={chartMid} />
        </S.ChartBox>
        <S.ChartBox>
          <FdrChart chart={chartRight} />
        </S.ChartBox>
      </S.ChartWrap>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </Contents>
  );
}
