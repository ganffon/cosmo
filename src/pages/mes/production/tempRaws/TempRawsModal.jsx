import React, { useContext, useEffect, useMemo } from "react";
import ModalWrap from "components/modal/ModalWrap";
import GridModal from "components/grid/GridModal";
import * as S from "./ModalNew.styled";
import { LayoutContext } from "components/layout/common/Layout";
import ButtonModule from "components/button/ButtonModule";
import CloseIcon from "@mui/icons-material/Close";
import Chart from "react-apexcharts";
import Grid from "@toast-ui/react-grid";
import GridTheme from "components/grid/setting/GridTheme";

const LineChart = () => {
  const cOptions = {
    plotOptions: {
      bar: {
        columnWidth: '80%',
      },
    },
    dataLabels: {
      style: {
        colors: ['black'],
      },
      enabled: true,
    },
  };

  const cSeries = [
    {
      name: 'Series 1',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];

  const cOptionsWithDefaults = {
    ...cOptions,
    series: cSeries,
    options: {
      ...cOptions.options,
      chart: {
        id: 'line-chart',
      },
    },
  };

  return (
    <Chart
      options={cOptionsWithDefaults.options}
      series={cOptionsWithDefaults.series}
      type="line"
      width="500"
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
        header = [],
        rowHeaders = [],
        width = "95%",
        height = "95%",
        title = null,
        isAddOneRow = false,
        data = [],
        columnsDetail = null,
      } = props;
      const { currentMenuName } = useContext(LayoutContext);
      
      useEffect(() => {
        isAddOneRow && refModalGrid?.current?.gridInst?.appendRow();
      }, []);
      
      console.log(columnsDetail)
      console.log(data)
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
            
          </S.ButtonBox>

          <S.LeftBottom>
            <S.GridContainer>
            <LineChart/>
            {columnsDetail&&<Grid columns={columnsDetail}/>}
            <LineChart/>
            <LineChart/>
            
            </S.GridContainer>
          </S.LeftBottom>
          
        </ModalWrap>
      );
    }
    
    export default TempRawsModal;
    