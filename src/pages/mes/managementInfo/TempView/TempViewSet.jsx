import React, { useEffect, useRef, useState } from "react";
import ApexCharts, { ReactApexChart } from "apexcharts";
import {
  ChartModule,
  Container,
  TextContainer,
  TextWrapper,
  Label,
  Value,
  CntModule,
  CntLabel,
  CntValue,
  CntLocation,
  ChartWrap,
  CntContainer,
  CntTextWrapper,
  CntTextContainer,
} from "./TempView.styled";

const RadialBarChart = ({ data, Line, containerWidth, isTemp, color }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      if (chartInstance?.current?.animations) {
        // 이미 차트 인스턴스가 존재하는 경우에는 업데이트만 수행합니다.
        chartInstance.current.updateSeries(data.series);
        chartInstance.current.updateOptions({
          chart: {
            // width: '100%',
          },
        });
      } else {
        // 차트 인스턴스가 존재하지 않는 경우에만 차트를 생성합니다.
        const options = {
          series: data.series,
          chart: {
            type: "radialBar",
            width: "100%",
            height: "100%",
          },
          labels: isTemp === "온도" ? [Line + " 온도"] : [Line + " 습도"],
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 15,
                size: "75%",
              },
              dataLabels: {
                show: true,
                name: {
                  fontSize: "18px",
                },
                value: {
                  fontSize: "16px",
                  formatter: function (val) {
                    // % 기호를 제거하고 변환된 값을 반환합니다.
                    return isTemp === "온도" ? val + " ℃" : val + " %";
                  },
                },
              },
            },
          },
          colors: [color],
        };

        chartInstance.current = new ApexCharts(chartRef.current, options);
        chartInstance.current.render();
      }
    }
  }, [data, containerWidth]);

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 차트 인스턴스를 정리합니다.
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);
  return <div ref={chartRef} />;
};

export const RadialBarChartModule = ({ data, minText, maxText, Line, containerWidth, isTemp }) => {
  let color = "";
  let width = "";
  if (isTemp === "온도") {
    color = "#00E396";
  } else {
    color = "#008FFB";
  }
  return (
    <ChartModule>
      <Container>
        <ChartWrap>
          <RadialBarChart data={data} Line={Line} containerWidth={containerWidth} isTemp={isTemp} color={color} />
        </ChartWrap>
        <TextContainer>
          <TextWrapper>
            <Label>min:</Label>
            <Value>{minText}</Value>
          </TextWrapper>
          <TextWrapper>
            <Label>max:</Label>
            <Value>{maxText}</Value>
          </TextWrapper>
        </TextContainer>
      </Container>
    </ChartModule>
  );
};

export const CountModule = ({ line, count, reg_date, status }) => {
  let color = "";
  let backColor = "";
  if (status === 1) {
    color = "#9AEBB7";
    backColor = "#F4FFF8";
  } else {
    color = "#FF9494";
    backColor = "#FFF2F2";
  }
  return (
    <CntModule backColor={backColor} borderColor={color}>
      <CntContainer>
        <CntTextWrapper>
          <CntLocation>{line}</CntLocation>
        </CntTextWrapper>
        <CntTextContainer>
          <CntTextWrapper>
            <CntLabel>{count}</CntLabel>
            <CntValue>{reg_date}</CntValue>
          </CntTextWrapper>
        </CntTextContainer>
      </CntContainer>
    </CntModule>
  );
};

export default RadialBarChart;
