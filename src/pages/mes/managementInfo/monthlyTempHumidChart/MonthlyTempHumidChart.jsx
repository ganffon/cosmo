import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GetTestValAndCreateAt, {
  GetTestValAndCreateAtDay,
  GetTestValAndCreateAtString,
  GetDateDay,
  GetDateMonth,
} from "pages/mes/dashboard/asdb";
import * as S from "../manage.styled";
import Chart from "react-apexcharts";
import { LoginStateChk } from "custom/LoginStateChk";
import DateTime from "components/datetime/DateTime";
import GridSingle from "components/grid/GridSingle";
import ButtonSearch from "components/button/ButtonSearch";
import "react-splitter-layout/lib/index.css";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import InputSearch from "components/input/InputSearch";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from "@mui/material";
import BtnComponent from "components/button/BtnComponent";
import ContentsArea from "components/layout/common/ContentsArea";

const MonthlyTempHumidChart = () => {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime().year+ '-'+DateTime().month,
  });
  const [textInput, setTextInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  useEffect(() => {
    handleSearchButtonClick();
  }, []);

  const handleSearchButtonClick = () => {
    // setSearchButtonClicked();
    console.log(dateText.startDate)
    GetMonthlyLineCapaData();
  };


  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };
  const GetMonthlyLineCapaData = () => {
    restAPI
      .get(restURI.monthlyChangeChart, {
        params: { 
          reg_date: dateText.startDate
        },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직
        setResponseData(response.data.data.rows);
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      });
  };
  
  const getChartOptions = (title) => {
    return {
      chart: {
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
  const datePickerChange = (e) => {
    setDateText({ ...dateText, [e.target.id]: e.target.value });
  };

  return (
    <ContentsArea>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
            <S.SearchWrap>
              <S.InputText
                id="startDate"
                type="month"
                format="yyyy-MM" 
                defaultValue={dateText.startDate}
                InputProps={{ sx: { height: 40 } }}
                onChange={datePickerChange}
                height='40px'
                label='날짜'
                />
            </S.SearchWrap> 
            <S.ButtonWrap>
              <BtnComponent btnName={"Search"} onClick={handleSearchButtonClick} />
            </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
        <S.HumidFlexTop>
          <S.HumidLeft>
          <S.ChartWrap>
            {responseData&& <Chart options={getChartOptions('자재창고')} series={responseData[0]} type="rangeArea" height={200}/>}
            </S.ChartWrap>
          </S.HumidLeft>
          <S.HumidRight>
          <S.ChartWrap>
            {responseData&& <Chart options={getChartOptions('제품창고')} series={responseData[1]} type="rangeArea" height={200}/>}    
            </S.ChartWrap>
          </S.HumidRight>
        </S.HumidFlexTop>
        <S.HumidFlexTop>
          <S.HumidLeft>
            <S.ChartWrap>
              {responseData&& <Chart options={getChartOptions('투입실')} series={responseData[2]} type="rangeArea" height={200}/>}
            </S.ChartWrap>
          </S.HumidLeft>
          <S.HumidRight>
          <S.ChartWrap>
            {responseData&& <Chart options={getChartOptions('첨가제 계량실')} series={responseData[3]} type="rangeArea" height={200}/>}
            </S.ChartWrap>
          </S.HumidRight>
        </S.HumidFlexTop>
        <S.HumidFlexLast>
          <S.ChartWrap>
            {responseData&& <Chart options={getChartOptions('통제실')} series={responseData[4]} type="rangeArea" height={200}/>}
          </S.ChartWrap>
        </S.HumidFlexLast>
       
    </ContentsArea>
  );
};

export default MonthlyTempHumidChart;
