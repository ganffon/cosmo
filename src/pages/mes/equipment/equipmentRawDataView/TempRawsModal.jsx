// import React, { useContext, useEffect, useMemo } from "react";
// import ModalWrap from "components/modal/ModalWrap";
// import GridModal from "components/grid/GridModal";
// import * as S from "./ModalNew.styled";
// import * as CustomGrid from "components/grid/setting/CustomGrid";
// import { LayoutContext } from "components/layout/common/Layout";
// import ButtonModule from "components/button/ButtonModule";
// import CloseIcon from "@mui/icons-material/Close";
// import Chart from "react-apexcharts";
// import Grid from "@toast-ui/react-grid";
// import GridSingle from "components/grid/GridSingle";
// import GridTheme from "components/grid/setting/GridTheme";
// import CN from 'json/ColumnName.json';
// import 'components/grid/setting/GridStyle.css';
// import * as C from 'constant/Grid.js';
// import * as col from 'custom/GridColumnSet';
// import { GridWrap } from "../equipmentDetail/EquipmentDetail.styled";

// const LineChart = () => {
  // const cOptions = {
    // plotOptions: {
      // bar: {
        // columnWidth: '80%',
      // },
    // },
    // dataLabels: {
      // style: {
        // colors: ['black'],
      // },
      // enabled: true,
    // },
  // };

  // const cSeries = [
    // {
      // name: 'Series 1',
      // data: [30, 40, 45, 50, 49, 60, 70, 91],
    // },
    // {
      // name: 'Series 2',
      // data: [39, 49, 45, 59, 49, 69, 79, 91],
    // },
  // ];

  // const cOptionsWithDefaults = {
    // ...cOptions,
    // series: cSeries,
    // options: {
      // ...cOptions.options,
      // chart: {
        // id: 'line-chart',
      // },
    // },
  // };

  // return (
    // <Chart
      // options={cOptionsWithDefaults.options}
      // series={cOptionsWithDefaults.series}
      // type="line"
      // width="500"
    // />
  // );
// };

// function TempRawsModal(props) {
    // const {
        // onClose = () => {},
        // onClickModalGrid = () => {},
        // onDblClickModalGrid = () => {},
        // onEditingFinishModal = () => {},
        // refModalGrid = null,
        // columns = [],
        // columnOptions = [],
        // header = [],
        // rowHeaders = [],
        // width = "95%",
        // height = "95%",
        // title = null,
        // isAddOneRow = false,
        // data = [],
        // columnsDetail = null,
      // } = props;
      // const { currentMenuName } = useContext(LayoutContext);
      
      // useEffect(() => {
        // isAddOneRow && refModalGrid?.current?.gridInst?.appendRow();
      // }, []);
      
      // const columnsDownTime = [
        // { header: "header", name: "header",},
        // col.check('editor', 'editor', true),
       
      // ]
      // console.log(columnsDetail)
      // console.log(data)
      // console.log(columnsDownTime)
    // return (
        // <ModalWrap width={width} height={height}>
          // <S.HeaderBox>
            // <S.TitleBox>{`${currentMenuName}`}</S.TitleBox>
            // <S.ButtonClose
              // color="primary"
              // aria-label="close"
              // onClick={onClose}
            // >
              // <CloseIcon />
            // </S.ButtonClose>
          // </S.HeaderBox>
          // <S.ButtonBox>
            // <S.TitleWrap>{title}</S.TitleWrap>
            
          // </S.ButtonBox>

          // <S.LeftBottom>
            // <S.GridContainer>
            // <GridWrap>
              // <LineChart/>
            // </GridWrap>
              // <GridWrap>
                // {columnsDetail&&<GridSingle columns={columnsDownTime} data={columnsDetail}/>}
              // </GridWrap>
              // <LineChart/>
              // <LineChart/>
            // </S.GridContainer>
          // </S.LeftBottom>
          
        // </ModalWrap>
      // );
    // }
    
    // export default TempRawsModal;
    