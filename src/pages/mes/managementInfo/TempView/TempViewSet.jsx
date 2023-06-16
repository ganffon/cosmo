import React, { useEffect, useRef, useState } from 'react';
import ApexCharts, {ReactApexChart} from 'apexcharts';
import * as S from './TempView.styled'
import doriRedImg from "../../../../img/Menu/bad.svg";
import doriGreenImg from "../../../../img/Menu/good.svg";

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
      } 
      else {
        // 차트 인스턴스가 존재하지 않는 경우에만 차트를 생성합니다.
        const options = {
          series: data.series,
          chart: {
            type: 'radialBar',
            width: '100%',
            height: '100%',
          },
          labels: isTemp==="온도" ? [Line +' 온도'] : [Line +' 습도'] ,
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 15,
                size: '75%'
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
                    return  isTemp==='온도' ? val + ' ℃' : val + ' %';
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
  let color = ''
  let width = '';
  if(isTemp==='온도'){
    color = '#00E396'
  }
  else{
    color = '#008FFB'
  }
    return (
        <S.ChartModule>
          <S.Container>
            <S.TwoRowsGridContainer rowTemplate={'20% 80%'}>
            <S.TwoColGridContainer rowTemplate={'60% 30%'}>
              <S.TextContainer>
                <S.ChartTitle>
                  {Line}
                </S.ChartTitle>
              </S.TextContainer>
              <S.TextWrapper align={'center'}>
                  <S.Label fontColor={'#1491CE'}>min {minText}</S.Label>
                  <S.Label fontColor={'#9F9F9F'}>&nbsp;/&nbsp;</S.Label>
                  <S.Label fontColor={'#DD3640'}>&nbsp;max {maxText}</S.Label>
                </S.TextWrapper>
              </S.TwoColGridContainer>
            <S.ChartWrap>
              <RadialBarChart data={data} Line={''} containerWidth={containerWidth} isTemp={isTemp} color={color}  />
            </S.ChartWrap>
            
            </S.TwoRowsGridContainer>
          </S.Container>
        </S.ChartModule>
      );
    };

export default RadialBarChart;

export const CountModule = ({ line, count, reg_date, status}) => {
  let color = ''
  let backColor = ''
  let fontColor = ''
  if(status===1){
    color = '#9AEBB7'
    backColor = '#F4FFF8'
    fontColor = '#009B3E'
  }
  else{
    color = '#FF9494'
    backColor = '#FFF2F2'
    fontColor = '#C81D1D'
  }
    return (
      <S.CntModule backColor={backColor} borderColor={color}>
        <S.StatusGridContainer>
          <S.CntLocation fontColor={fontColor}>{line}</S.CntLocation>
          <S.ImgWrap>
            <img
              src={status ? doriGreenImg : doriRedImg}
              alt={status ? "Dori Green" : "Dori Red"}
              style={{
                flex: 'none',
                width: '75px',
                height: '75px',
              }}/>
            </S.ImgWrap>
            <S.CntGridContainer>
              <S.CntLabel>{count}</S.CntLabel>  
              <S.CntValue>{reg_date}</S.CntValue>
            </S.CntGridContainer>
        </S.StatusGridContainer>
      </S.CntModule>
      );
    };

    

export const TempModule = ({ data, minText, maxText, Line, containerWidth, isTemp }) => {
      let color = ''
      let width = '';
      if(isTemp==='온도'){
        color = '#00E396'
      }
      else{
        color = '#008FFB'
      }
        return (
            <S.ChartModule>
              <S.Container>
                <S.TwoRowsGridContainer>
                <S.ChartTitle>
                  {Line}
                </S.ChartTitle>
                <S.CntGridContainer>
                  <S.CntLabel>{data.series[0]}℃</S.CntLabel>  
                  <S.TextWrapper>
                    <S.Label fontColor={'#1491CE'}>min {minText}℃</S.Label>
                    <S.Label fontColor={'#9F9F9F'}>&nbsp;/&nbsp;</S.Label>
                    <S.Label fontColor={'#DD3640'}>&nbsp;max {maxText}℃</S.Label>
                  </S.TextWrapper>
                </S.CntGridContainer>
                </S.TwoRowsGridContainer>
              </S.Container>
            </S.ChartModule>
          );
        };    