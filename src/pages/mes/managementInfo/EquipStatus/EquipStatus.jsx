import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "../manage.styled";
import Chart from "react-apexcharts";
import { LoginStateChk } from "custom/LoginStateChk";
import DateTime from "components/datetime/DateTime";
import GridSingle from "components/grid/GridSingle";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import ButtonSearch from "components/button/ButtonSearch";

let isFirst = true;
const EquipStatus = () => {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [year, setYear] = useState(new Date().getFullYear());
  const [responseData, setResponseData] = useState(null);
  const [dataIndex, setDataIndex] = useState(0);
  const [sDonutChartData, setSDonutChartData] = useState(null);
  const [barGrid, setBarGrid] = useState(null);
  const [sBarChartData, setSBarChartData] = useState(null);
  const [cOptions, setCOptions] = useState(null);
  const [chartType, setChartType] = useState('line');
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
          end_date: dateText.endDate
        },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직
        setResponseData(response.data);
        setSDonutChartData(response.data.data.rows[0].graph)
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
          end_date: dateText.endDate
        },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직
        setBarGrid(response.data);
        setSBarChartData(response.data.data.rows[0].graph)
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      });
  };
  
  const dataFunctions = [
    GetMonthlyLineCapaData,
  ];  
  useEffect(() => {
    GetMonthlyLineCapaData();
    GetDailyLineCapaData();
  }, [dataIndex]);


  const monthlyColumns = [
    { header: "비가동 유형", name: "downtime_type_nm" },
    { header: "비가동 내용", name: "downtime_nm" },
    { header: "비가동 시간", name: "downtime" },
  ];

  const sysColumns = [
    { header: "라인", name: "line_nm" },
    { header: "비가동 시간", name: "downtime" },
    
  ];

  const BarChart = ({ data }) => {
    const cWithHorizontal = {
      series: [
        {
          name: '비가동',
          data: data[0].data.map((item, index) => ({
            x: item.x,
            y: item.y,
          })),
        },
      ],
      // colors:['#E91E63', '#9C27B0','#F44336', ],
      
      plotOptions: {
        // 차트 시각화 옵션
        bar: {
          horizontal: true,
          barHeight: '40%',
          borderColor: '#FFFFFF', // 테두리 색상
          borderWidth: 30, // 테두리 두께
        },
      },
      dataLabels: {
        style: {
          colors: ["white"],
        },
        enabled: true,
      },
      title: {
        text: "라인별 비가동 ",
        align: "top",
      },
    };
  
    return (
      <div>
        <Chart
          options={cWithHorizontal}
          series={data}
          type="bar"
          height={250}
        />
      </div>
    );
  };

  const DonutChart = ({ data }) => {
    const options = {
      series: data.map((item) => item.y),
      labels: data.map((item) => item.x),
      plotOptions: {
        pie: {
          donut: {
            size: '60%', // 도넛 차트의 크기
          },
        },
      },
      dataLabels: {
        style: {
          colors: ['black'],
        },
        enabled: true,
      },
      title: {
        text: '비가동 유형별',
        align: 'center',
      },
      legend: {
        position: 'bottom',
      },
    };
    return (
      <div>
        <Chart options={options} series={options.series} type="donut" height={350} />
      </div>
    );
  };
  
  return (
    <S.ContentsArea>
      <S.SearchCondition>
        <S.ContentsHeader>
        <S.ContentsHeaderWrap>
          <S.Date
            datePickerSet={"range"}
            dateText={dateText}
            setDateText={setDateText}
          />  
        </S.ContentsHeaderWrap>
        <ButtonSearch onClickSearch={handleSearchButtonClick} />
        </S.ContentsHeader>
      </S.SearchCondition>
      <S.FlexTop>
        <S.Left>
          {sDonutChartData && <DonutChart data={sDonutChartData} />}
        </S.Left>
        <S.Right>
        {responseData && (
          <GridSingle columns={monthlyColumns} data={responseData.data.rows[0].grid} />
        )}
        </S.Right>
      </S.FlexTop>
      <S.FlexBottom>
      <S.LeftBottom>
            {sBarChartData && <BarChart data={sBarChartData} />}
        </S.LeftBottom>
        <S.RightBottom>
        {barGrid && (
          <GridSingle columns={sysColumns} data={barGrid.data.rows[0].grid} />
        )}
        </S.RightBottom>
      </S.FlexBottom>
      
    </S.ContentsArea>
  );
};

export default EquipStatus;
