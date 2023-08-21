import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "../manage.styled";
import Chart from "react-apexcharts";
import DateTime from "components/datetime/DateTime";
import GridSingle from "components/grid/GridSingle";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";

export const EquipStatus = ({ toggle }) => {
  let isFirst = true;
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [year, setYear] = useState(new Date().getFullYear());
  const [responseData, setResponseData] = useState(null);
  const refSingleGrid = useRef(null);
  const refSecondGrid = useRef(null);
  const [sDonutChartData, setSDonutChartData] = useState(null);
  const [barGrid, setBarGrid] = useState(null);
  const [sBarChartData, setSBarChartData] = useState(null);
  const [isAuto, setIsAuto] = useState(true);
  const handleChange = (event) => {
    setYear(event.target.value);
  };
  const handleSearchButtonClick = () => {
    // setSearchButtonClicked();

    GetMonthlyLineCapaData();
    GetDailyLineCapaData();
  };
  const GetMonthlyLineCapaData = () => {
    restAPI
      .get(restURI.downtimeShare, {
        params: {
          start_date: dateText.startDate,
          end_date: dateText.endDate,
        },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직
        setResponseData(response.data);
        setSDonutChartData(response.data.data.rows[0].graph);
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      });
  };
  const GetDailyLineCapaData = () => {
    restAPI
      .get(restURI.sysDowntimeShare, {
        params: {
          start_date: dateText.startDate,
          end_date: dateText.endDate,
        },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직
        setBarGrid(response.data);
        setSBarChartData(response.data.data.rows[0].graph);
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      });
  };

  useEffect(() => {
    handleSearchButtonClick();
    if (toggle !== undefined && isAuto !== toggle) {
      setIsAuto(toggle);
    }
  }, [toggle, isAuto]);

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
    refSecondGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);
  const monthlyColumns = [
    { header: "비가동 유형", name: "downtime_type_nm" },
    { header: "비가동 내용", name: "downtime_nm" },
    { header: "비가동 시간", name: "downtime" },
  ];

  const sysColumns = [
    { header: "라인", name: "line_nm" },
    { header: "비가동 시간", name: "downtime" },
  ];
  const cWithHorizontal = {
    plotOptions: {
      // 차트 시각화 옵션
      bar: {
        horizontal: true,
        barHeight: "40%",
        borderColor: "#FFFFFF", // 테두리 색상
        borderWidth: 30, // 테두리 두께
      },
    },
    dataLabels: {
      style: {
        colors: ["white"],
      },
      enabled: true,
    },
  };
  const BarChart = ({ data }) => {
    const cWithHorizontal = {
      // series: [
      //   {
      //     name: "비가동",
      //     data: data[0].data.map((item, index) => ({
      //       x: item.x,
      //       y: item.y,
      //     })),
      //   },
      // ],
      // colors:['#E91E63', '#9C27B0','#F44336', ],

      plotOptions: {
        // 차트 시각화 옵션
        bar: {
          horizontal: true,
          barHeight: "40%",
          borderColor: "#FFFFFF", // 테두리 색상
          borderWidth: 30, // 테두리 두께
        },
      },
      dataLabels: {
        style: {
          colors: ["white"],
        },
        enabled: true,
      },
    };

    return (
      <div>
        <Chart options={cWithHorizontal} series={data} type="bar" height={300} />
      </div>
    );
  };

  const DonutChart = ({ data }) => {
    const options = {
      series: data?.map((item) => item.y),
      labels: data?.map((item) => item.x),
      plotOptions: {
        pie: {
          donut: {
            size: "60%", // 도넛 차트의 크기
          },
        },
      },
      dataLabels: {
        style: {
          colors: ["black"],
        },
        enabled: true,
      },
      legend: {
        position: "bottom",
      },
    };
    return (
      <div>
        <Chart options={options} series={options.series} type="donut" height={350} />
      </div>
    );
  };

  const donutOptions = {
    // series: data.map((item) => item.y),
    labels: sDonutChartData?.map((item) => item.x),
    plotOptions: {
      pie: {
        donut: {
          size: "60%", // 도넛 차트의 크기
        },
      },
    },
    dataLabels: {
      style: {
        colors: ["black"],
      },
      enabled: true,
    },
    legend: {
      position: "bottom",
    },
  };
  return (
    <ContentsArea>
      {isAuto === true && (
        <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
          <S.ToolWrap>
            <S.SearchWrap>
              <S.Date datePickerSet={"range"} dateText={dateText} setDateText={setDateText} />
            </S.SearchWrap>
            <S.ButtonWrap>
              <BtnComponent btnName={"Search"} onClick={handleSearchButtonClick} />
            </S.ButtonWrap>
          </S.ToolWrap>
        </S.ShadowBoxButton>
      )}
      <S.AllWrap>
        <S.Left>
          <S.Title>비가동(현장등록) 유형 별</S.Title>
          {/* <S.EquipStatusChartWrap>{sDonutChartData && <DonutChart data={sDonutChartData} />}</S.EquipStatusChartWrap> */}
          <S.EquipStatusChartWrap>
            {sDonutChartData && (
              <Chart
                options={donutOptions}
                series={sDonutChartData.map((item) => item.y)}
                type="donut"
                height={"100%"}
              />
            )}
          </S.EquipStatusChartWrap>
          <S.GridWrap3>
            {responseData && (
              <GridSingle columns={monthlyColumns} data={responseData.data.rows[0].grid} refGrid={refSingleGrid} />
            )}
          </S.GridWrap3>
        </S.Left>
        <S.Right>
          <S.Title>비가동(자동등록-충진) 라인 별</S.Title>
          {/* <S.EquipStatusChartWrap>{sBarChartData && <BarChart data={sBarChartData} />}</S.EquipStatusChartWrap> */}
          {sBarChartData && (
            <S.EquipStatusChartWrap>
              <Chart options={cWithHorizontal} series={sBarChartData} type="bar" height={300} />
            </S.EquipStatusChartWrap>
          )}
          <S.GridWrap3>
            {barGrid && <GridSingle columns={sysColumns} data={barGrid.data.rows[0].grid} refGrid={refSecondGrid} />}
          </S.GridWrap3>
        </S.Right>
      </S.AllWrap>
    </ContentsArea>
  );
};
