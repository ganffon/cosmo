import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import ModalWrap from "components/modal/ModalWrap";
import GridModal from "components/grid/GridModal";
import * as S from "./ModalNew.styled";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import { LayoutContext } from "components/layout/common/Layout";
import ButtonModule from "components/button/ButtonModule";
import CloseIcon from "@mui/icons-material/Close";
import Chart from "react-apexcharts";
import Grid from "@toast-ui/react-grid";
import GridSingle from "components/grid/GridSingle";
import GridTheme from "components/grid/setting/GridTheme";
import ButtonSearch from "components/button/ButtonSearch";
import BackDrop from "components/backdrop/BackDrop";
import * as col from "custom/GridColumnSet";

const LineChart = (props) => {
  const {
  cOptions = {
    dataLabels: {
      style: {
        colors: ['black'],
      },
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2
    },
  },
  cSeries = []
}= props;

  const cOptionsWithDefaults = {
    ...cOptions,
    series: cSeries,
    options: {
      ...cOptions,
      chart: {
        id: 'line-chart',
      },
      xaxis: {
        tickAmount: 24,
        lines: {
          show: false, // y축 선 표시 여부
          borderColor: '#e5e5e5', // y축 선 색상
          strokeDashArray: 2, // y축 선의 선 스타일 (점선)
          lineWidth: 1, // y축 선의 두께
        },
      }
    },
  };

  return (
    <Chart
      options={cOptionsWithDefaults.options}
      series={cOptionsWithDefaults.series}
      type="line"
      width='1600'
      height='500'
    />
  );
};

function TempRawsModal(props) {
    const {
        onClose = () => {},
        onClickModalGrid = () => {},
        onDblClickModalGrid = () => {},
        onEditingFinishModal = () => {},
        refModalGrid = null,
        columns = [],
        columnOptions = [],
        width = "100%",
        height = "95%",
        title = null,
        isAddOneRow = false,
        data = [],
        columnsDetail = null,
      } = props;
      const [isBackDrop, setIsBackDrop] = useState(false);
      const { currentMenuName } = useContext(LayoutContext);
      const [seriesData, setSeriesData] = useState(null)
      const refSingleGrid = useRef(null);
      useEffect(() => {
        isAddOneRow && refModalGrid?.current?.gridInst?.appendRow();
      }, []);
      const series= data;
      const rowHeaders = ["checkbox"];

      const columnsDownTime = [
        col.text('header', "항목", false)
      ];
      const onClickSearch = () => {
        setIsBackDrop(true);
        setSeriesData([]);
        const isCheckedData = refSingleGrid?.current?.gridInst?.getCheckedRows();
        if (isCheckedData.length !== 0) {
          const itemKey = isCheckedData.map(data => { return data.name });
          
          const seriesArr = series.filter(item => {
            return itemKey.includes(item.unique);
          });
          setSeriesData(seriesArr);
        }
        setIsBackDrop(false);
      };
      
    return (
        <ModalWrap width={width} height={height}>
          <S.HeaderBox>
            <S.TitleBox>{`${currentMenuName}`}</S.TitleBox>
            <S.ButtonClose
              color="primary"
              aria-label="close"
              onClick={onClose}
            >
              <CloseIcon />
            </S.ButtonClose>
          </S.HeaderBox>
          <S.ButtonBox>
            <S.TitleWrap>{title}</S.TitleWrap>
            <S.ButtonWrap>
              <ButtonSearch onClickSearch={onClickSearch} />
            </S.ButtonWrap>
          </S.ButtonBox>
          
          <S.Right>
            {seriesData&&<LineChart cSeries={seriesData}/>}
          </S.Right>

          <S.GridBox>
            <S.GridWrap>
              {columnsDetail&&
                <GridSingle 
                  columns={columnsDownTime} 
                  data={columnsDetail} 
                  refGrid={refSingleGrid}
                  rowHeaders={rowHeaders}/>}
            </S.GridWrap>
          </S.GridBox>
          <BackDrop isBackDrop={isBackDrop} />
        </ModalWrap>
        
      );
    }
    
    export default TempRawsModal;
    