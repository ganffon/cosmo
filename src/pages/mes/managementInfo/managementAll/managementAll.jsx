import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "../manage.styled";
import Chart from "react-apexcharts";

import DateTime from "components/datetime/DateTime";
import GridSingle from "components/grid/GridSingle";
import ButtonSearch from "components/button/ButtonSearch";
import "react-splitter-layout/lib/index.css";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputSearch from "components/input/InputSearch";
import ContentsArea from "components/layout/common/ContentsArea";

let isFirst = true;
const ManagementAll = () => {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    endDate: DateTime().dateFull,
  });
  const [year, setYear] = useState(new Date().getFullYear());
  const [responseData, setResponseData] = useState(null);
  const [columns, setColumns] = useState(null);
  const [dataIndex, setDataIndex] = useState(0);
  const [cOptions, setCOptions] = useState(null);
  const [chartType, setChartType] = useState("line");
  const handleChange = (event) => {
    setYear(event.target.value);
  };
  const GetMonthlyLineCapaData = () => {
    restAPI
      .get(restURI.monthlyLine, {
        params: {
          reg_date: year, //endDate.slice(0, 4)
          line_nm: "",
        },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직
        setResponseData(response.data);

        const monthlyColumns = [
          { header: "라인", name: "line_cd" },
          ...monthlyDateHeaders.map((date, index) => {
            return { header: date, name: `M${index + 1}` };
          }),
          { header: "합계", name: "total" },
        ];
        const mCOptions = {
          plotOptions: {
            // 차트 시각화 옵션
            bar: {
              // 막대그래프 옵션
              columnWidth: "80%", // 막대 너비
              // horizontal: true,
            },
          },
          dataLabels: {
            style: {
              colors: ["black"],
            },
            enabled: false,
          },
          title: {
            text: "생산포장 라인 별 생산량(월)",
            floating: true,
            offsetY: 0,
            align: "top",
            style: {
              color: "#444",
            },
          },
        };
        setColumns(monthlyColumns);
        setCOptions(mCOptions);
        setChartType("line");
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      });
  };
  const GetDailyLineCapaData = () => {
    restAPI
      .get(restURI.dailyLine, {
        params: { reg_date: DateTime().dateFull, line_nm: "" },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직
        setResponseData(response.data);

        const dailyColumns = [
          { header: "라인", name: "line_cd" },
          ...dailyDateHeaders.map((date, index) => {
            return { header: date, name: `D${index + 1}` };
          }),
          { header: "합계", name: "total" },
        ];

        const dCOptions = {
          plotOptions: {
            // 차트 시각화 옵션
            bar: {
              // 막대그래프 옵션
              columnWidth: "80%", // 막대 너비
              // horizontal: true,
            },
          },
          dataLabels: {
            style: {
              colors: ["black"],
            },
            enabled: false,
          },
          title: {
            text: "생산포장 라인 별 생산량(일)",
            floating: true,
            offsetY: 0,
            align: "top",
            style: {
              color: "#444",
            },
          },
        };
        setCOptions(dCOptions);
        setColumns(dailyColumns);
        setChartType("line");
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      });
  };

  const dataFunctions = [GetMonthlyLineCapaData, GetDailyLineCapaData];
  useEffect(() => {
    const fetchData = async () => {
      await dataFunctions[dataIndex]();
      setDataIndex((dataIndex + 1) % dataFunctions.length);
    };

    if (isFirst) {
      fetchData();
      isFirst = false;
    }
    //
    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [dataIndex]);

  // GetMonthlyLineCapaData(dateText.endDate, textInput);
  const monthlyDateHeaders = [];
  for (let i = 0; i < 12; i++) {
    monthlyDateHeaders.push(i + 1 + "월");
  }

  const tmpDate = new Date(dateText.endDate);
  tmpDate.setDate(tmpDate.getDate() - 12);
  const dailyDateHeaders = [];
  for (let i = 0; i < 12; i++) {
    tmpDate.setDate(tmpDate.getDate() + 1);
    const year = tmpDate.getFullYear();
    const month = (tmpDate.getMonth() + 1).toString().padStart(2, "0");
    const day = tmpDate.getDate().toString().padStart(2, "0");
    const dateString = year + "-" + month + "-" + day; // 년-월-일
    dailyDateHeaders.push(dateString);
  }

  // console.log(responseData.data.rows[0].grid[0].M1)
  return (
    <ContentsArea>
      <S.Top>
        {responseData && (
          <Chart
            id={"chart"}
            options={cOptions}
            series={responseData.data.rows[0].graph}
            type={chartType}
            height={350}
          />
        )}
      </S.Top>
      <S.Bottom>{responseData && <GridSingle columns={columns} data={responseData.data.rows[0].grid} />}</S.Bottom>
      {/* <SplitterLayout vertical></SplitterLayout> */}
    </ContentsArea>
  );
};

export default ManagementAll;
