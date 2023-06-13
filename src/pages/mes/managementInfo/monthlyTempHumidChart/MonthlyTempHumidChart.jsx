import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GetTestValAndCreateAt, {
  GetTestValAndCreateAtDay,
  GetTestValAndCreateAtString,
  GetDateDay,
  GetDateMonth,
} from "pages/mes/dashboard/asdb";
import * as S from "./MonthlyChangeChart.styled";
import Chart from "react-apexcharts";
import { LoginStateChk } from "custom/LoginStateChk";
import DateTime from "components/datetime/DateTime";
import GridSingle from "components/grid/GridSingle";
import ButtonSearch from "components/button/ButtonSearch";
import "react-splitter-layout/lib/index.css";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import InputSearch from "components/input/InputSearch";

const MonthlyTempHumidChart = () => {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
    endDate: DateTime().dateFull,
  });
  const [textInput, setTextInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  useEffect(() => {
    handleSearchButtonClick();
  }, []);

  const handleSearchButtonClick = () => {
    // setSearchButtonClicked();
    GetMonthlyLineCapaData();
  };


  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };
  const GetMonthlyLineCapaData = () => {
    restAPI
      .get(restURI.monthlyChangeChart, {
        params: { 
          reg_date: dateText.startDate.substring(0, 7)
        },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직
        setResponseData(response.data.data.rows);
        console.log(response.data.data.rows[0])
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      });
  };
  
  const getChartOptions = (title) => {
    return {
      chart: {
        height: 350,
        type: 'rangeArea',
      },
      xaxis: {
        tickAmount: 15,
        lines: {
          show: false, // y축 선 표시 여부
          borderColor: '#e5e5e5', // y축 선 색상
          strokeDashArray: 2, // y축 선의 선 스타일 (점선)
          lineWidth: 1, // y축 선의 두께
        },
      },
      colors: ['#4d33df', '#4d33df', '#db6666', '#db6666'],
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: [0.24, 1, 0.24, 1]
      },
      forecastDataPoints: {
        count: 2
      },
      stroke: {
        curve: 'straight',
        width: [0, 2, 0, 2]
      },
      title: {
        text: title,
        align: 'left', // 제목을 가운데 정렬합니다.
        style: {
          fontSize: '20px', // 폰트 크기를 20px로 설정합니다.
          fontWeight: 'bold', // 폰트 굵기를 bold로 설정합니다.
          fontFamily: 'Arial, sans-serif', // 폰트 패밀리를 Arial로 설정합니다.
          color: '#333' // 폰트 색상을 #333으로 설정합니다.
        }
      },
      markers: {
        hover: {
          sizeOffset: 5
        }
      },
      yaxis: {
        tickAmount: 3,
      },
      grid: {
        yaxis: {
          lines: {
            show: false, // y축 선 표시 여부
            lineWidth:30,
          }
        }
      }
    }
  };
  

  return (
    <S.ContentsArea>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.ContentsHeader>
            <S.ContentsHeaderWrap>
              <S.Date
                datePickerSet={"single"}
                dateText={dateText}
                setDateText={setDateText}
              />
            </S.ContentsHeaderWrap> 
            <ButtonSearch onClickSearch={handleSearchButtonClick} />
          </S.ContentsHeader>
        </S.ToolWrap>
      </S.ShadowBoxButton>
        <S.FlexTop>
          <S.Left>
            {responseData&& <Chart options={getChartOptions('자재창고')} series={responseData[0]} type="rangeArea" height={280}/>}
          </S.Left>
          <S.Right>
            {responseData&& <Chart options={getChartOptions('제품창고')} series={responseData[1]} type="rangeArea" height={280}/>}    
          </S.Right>
        </S.FlexTop>
        <S.FlexTop>
          <S.Left>
            {responseData&& <Chart options={getChartOptions('투입실')} series={responseData[2]} type="rangeArea" height={280}/>}
          </S.Left>
          <S.Right>
            {responseData&& <Chart options={getChartOptions('첨가제 계량실')} series={responseData[3]} type="rangeArea" height={280}/>}
          </S.Right>
        </S.FlexTop>
        
          {responseData&& <Chart options={getChartOptions('통제실')} series={responseData[4]} type="rangeArea" height={280}/>}
        
       
    </S.ContentsArea>
  );
};

export default MonthlyTempHumidChart;
