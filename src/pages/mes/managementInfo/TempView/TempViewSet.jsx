import React, { useEffect, useRef, useState } from 'react';
import ApexCharts, {ReactApexChart} from 'apexcharts';
import {ChartModule, Container, TextContainer, TextWrapper, Label, Value} from './TempView.styled'

const RadialBarChart = ({ data, Line, containerWidth, isTemp, color }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
       
    if (chartRef.current && data) {
      if (chartInstance.current) {
        // 이미 차트 인스턴스가 존재하는 경우에는 업데이트만 수행합니다.
        chartInstance.current.updateSeries(data.series);
        chartInstance.current.updateOptions({
          colors: [color],
        });
      } else {
        // 차트 인스턴스가 존재하지 않는 경우에만 차트를 생성합니다.
        const options = {
          series: data.series,
          chart: {
            type: 'radialBar',
            width: {containerWidth}/6,
            height: 200
          },
          labels: isTemp==='temp' ? [Line +' 온도'] : [Line +' 습도'] ,
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 15,
                size: '70%'
              },
              dataLabels: {
                show: true,
                name: {
                  fontSize: '18px'
                },
                value: {
                  fontSize: '16px',
                  formatter: function (val) {
                    // % 기호를 제거하고 변환된 값을 반환합니다.
                    return  isTemp==='temp' ? val + ' ℃' : val + ' %';
                  }
                },
              },            
            }
          },
          colors: [color],
        };
        
        chartInstance.current = new ApexCharts(chartRef.current, options);
        chartInstance.current.render();
      }
    }
  }, [data, color]);
  
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
  let color = ''
  if(data.series < 30){
    color = '#00E396'
  }
  else if(data.series<61){
    color = '#008FFB'
  }
  else{
    color = '#FF4560'
  }
    return (
        <ChartModule>
          <Container>
            <RadialBarChart data={data} Line={Line} containerWidth={containerWidth} isTemp={isTemp} color={color}  />
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

export default RadialBarChart;
