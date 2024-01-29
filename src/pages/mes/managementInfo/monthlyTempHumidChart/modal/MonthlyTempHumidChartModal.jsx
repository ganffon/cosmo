import ModalWrap from "components/modal/ModalWrap";
import * as S from "./MonthlyTempHumidChartModal.styled";
import { CloseIcon } from "components/modal/fdrModal.styled";
import { FdrModal } from "components/modal/fdrModal";
import { useEffect, useMemo, useRef, useState } from "react";
import GridModal from "components/grid/GridModal";
import MonthlyTempHumidChartModalSet from "./MonthlyTempHumidChartModalSet";
import GridSingle from "components/grid/GridSingle";
import CN from "json/ColumnName.json";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";
import Chart from "react-apexcharts";

export function MonthlyTempHumidChartModal(props) {
  const { searchDate = "2024-01", dataList = {}, tmpUSL = 0, tmpLSL = 0, huUSL = 0, huLSL = 0 } = props;

  const { columnOptions, rowHeaders } = MonthlyTempHumidChartModalSet();

  const refModalGrid = useRef(null);
  const [modalCol, setModalCol] = useState([]);
  const [modalGridData, setModalGridData] = useState([]);

  // console.log("모달 데이터리스트");
  // console.log(dataList);
  const splitDate = searchDate.split("-");
  const yearString = splitDate[0].slice(2);
  const monthString = splitDate[1];

  //Grid용 Col 설정
  useEffect(() => {
    makeModalCol();
    setDataFunc();
  }, []);

  const makeModalCol = () => {
    let tmpArr = [
      col.text("division", "구분", false, false, C.WIDTH_SUPER_SHORT, "center", C.U, C.U, C.U, true),
      col.text("Type", "유형", false, false, C.WIDTH_SUPER_SHORT, "center"),
    ];
    for (let i = 0; i < dataList[0]?.data.length; i++) {
      tmpArr.push(col.text(dataList[0]?.data[i].x, dataList[0]?.data[i].x, false, false, C.WIDTH_SUPER_SHORT, "right"));
    }
    setModalCol(tmpArr);
  };
  const data = [
    { division: "온도", Type: "최고" },
    { division: "온도", Type: "최저" },
    { division: "온도", Type: "평균" },
    { division: "습도", Type: "최고" },
    { division: "습도", Type: "최저" },
    { division: "습도", Type: "평균" },
  ];
  const setDataFunc = () => {
    console.log(dataList);
    for (let i = 0; i < dataList[0]?.data.length; i++) {
      let date = dataList[0]?.data[i].x;
      data[0][date] = dataList[0]?.data[i].y[1]; //온도 최고
      data[1][date] = dataList[0]?.data[i].y[0]; //온도 최저
      data[2][date] = dataList[1]?.data[i].y; //온도 값
      data[3][date] = dataList[4]?.data[i].y[1]; //습도 최고
      data[4][date] = dataList[4]?.data[i].y[0]; //습도 최저
      data[5][date] = dataList[5]?.data[i].y; //습도 값
    }

    setModalGridData(data);
    console.log(modalProps.chart);
  };

  const modalProps = {
    open: false,
    height: props.height,
    width: props.width,
    title: `${yearString}년 ${monthString}월 ${props.title} 온습도 현황`,
    chart: props.chart,
  };

  // const chartModal = useMemo(() => {
  //   return <S.ChartLayout>{props.chart}</S.ChartLayout>;
  // }, [props.chart]);

  // useMemo를 사용하여 responseData 값을 고정시킴
  const chartOptions = {
    chart: {
      type: "rangeArea",
      width: "100%",
      height: "100%",
    },
    xaxis: {
      tickAmount: 15,
      lines: {
        show: false, // y축 선 표시 여부
        borderColor: "#e5e5e5", // y축 선 색상
        strokeDashArray: 2, // y축 선의 선 스타일 (점선)
        lineWidth: 1, // y축 선의 두께
      },
    },
    colors: ["#4d33df", "#4d33df", "#2962FF", "#2962FF", "#db6666", "#db6666", "#C51162", "#C51162"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: [0.24, 1, 1, 1, 0.24, 1, 1, 1],
    },
    forecastDataPoints: {
      count: 0,
    },
    stroke: {
      curve: "straight",
      width: [0, 2, 2, 2, 0, 2, 2, 2],
      dashArray: [0, 0, 5, 5, 0, 0, 5, 5],
    },
    markers: {
      hover: {
        sizeOffset: 5,
      },
    },
    yaxis: {
      tickAmount: 3,
    },
    grid: {
      yaxis: {
        lines: {
          show: false, // y축 선 표시 여부
          lineWidth: 30,
        },
      },
    },
  };

  const chartModal = useMemo(() => {
    return (
      <S.ChartLayout>
        {" "}
        {dataList && <Chart options={chartOptions} series={dataList} type="rangeArea" height={"100%"} />}
      </S.ChartLayout>
    );
  }, [props.chart]);

  return (
    <FdrModal modalState={modalProps} setModal={props.setModal}>
      <S.ContentsWrap>
        <S.TitleWrap>
          <S.TitleHeaderLayout>{props.title}</S.TitleHeaderLayout>
          <S.SpecValues>
            <S.SpecTr colspan="2" style={{ color: "red" }}>
              <S.SpecTd rowspan="2">온도</S.SpecTd>
              <S.SpecTr>{`상한 : ${tmpUSL}°C`}</S.SpecTr>
              <S.SpecTr>{`하한 : ${tmpLSL}°C`}</S.SpecTr>
            </S.SpecTr>
          </S.SpecValues>
          <S.SpecValues>
            <S.SpecTr colspan="2" style={{ color: "blue" }}>
              <S.SpecTd rowspan="2">습도</S.SpecTd>
              <S.SpecTr>{`상한 : ${huUSL}%`}</S.SpecTr>
              <S.SpecTr>{`하한 : ${huLSL}%`}</S.SpecTr>
            </S.SpecTr>
          </S.SpecValues>
        </S.TitleWrap>
        {chartModal}
        <S.GridWrap>
          <GridModal
            columnOptions={columnOptions}
            columns={modalCol}
            refGrid={refModalGrid}
            rowHeaders={rowHeaders}
            data={modalGridData}
          />
        </S.GridWrap>
      </S.ContentsWrap>
    </FdrModal>
  );
}
