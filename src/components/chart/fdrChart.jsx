import ApexChart from "react-apexcharts";
import * as S from "./fdrChart.styled";

export const FdrChart = (props) => {
  const { height = "100%", width = "100%", chart } = props;
  const { type, series, options } = chart;

  if (!series) {
    return null;
  }

  return (
    <S.ChartWrap>
      <ApexChart type={type} series={series} options={options} width={width} height={height} />
    </S.ChartWrap>
  );
};
