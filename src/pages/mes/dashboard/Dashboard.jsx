import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import "react-splitter-layout/lib/index.css";
import * as S from "./Dashboard.styled";
import doriRedImg from "../../../img/Menu/bad.svg";
import doriGreenImg from "../../../img/Menu/good.svg";
import doriFace from "../../../img/Menu/doriFace.svg";
import badFont from "../../../img/Menu/BadFont.svg";
import goodFont from "../../../img/Menu/GoodFont.svg";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import GridSingle from "components/grid/GridSingle";
import Grid from "@toast-ui/react-grid";
import GridTheme from "components/grid/setting/GridTheme";
import BackDrop from "components/backdrop/BackDrop";
import Chart from "react-apexcharts";
import ContentsArea from "components/layout/common/ContentsArea";
import * as CustomGrid from "components/grid/setting/CustomGrid";

const Dashboard = () => {
  const { isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [result, setResult] = useState([]);
  const [leftWidth, setLeftWidth] = useState("30%");
  const [firstPanelSize, setFirstPanelSize] = useState("30%");
  const handleResize = (newSizes) => {
    const [newFirstPanelSize] = newSizes;
    setFirstPanelSize(newFirstPanelSize); // 패널 크기 변경 시 상태 업데이트
  };
  const onResize = (event, { size }) => {
    setLeftWidth(size.width); // 왼쪽 패널의 너비 업데이트
  };
  const [lineState, setLineState] = useState([]);
  const [downtime, setDowntime] = useState([]);
  const [equipState, setState] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [workerData, setWorkerData] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const refSingleGrid = useRef(null);
  const refSecondGrid = useRef(null);

  const [isBackDrop, setIsBackDrop] = useState(false);
  useEffect(() => {
    GetDashboardData();
    setIsClicked(!isClicked);
    GridTheme();
  }, []);
  const columnsEmp = [
    { header: "실시간 생산 담당자", name: "emp_nm", align: "center" },
    // { header: '직급', name: 'total'}
  ];
  const columnsDownTime = [
    { header: "No. ", name: "no", width: 30 },
    { header: "라인종류", name: "line_cd" },
    // { header: '발생일자', name: 'start_date', width:'100'},
    // { header: '발생시간', name: 'start_time', width:'70'},
    { header: "발생일시", name: "start_dt" },
    // { header: '해결일자', name: 'end_date', width:'100'},
    // { header: '해결시간', name: 'end_time', width:'70'},
    { header: "해결일시", name: "end_dt" },
    { header: "비가동명", name: "downtime_nm" },
    { header: "비가동유형", name: "downtime_type_nm" },
  ];
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
    refSecondGrid?.current?.gridInst?.refreshLayout();
    // addDivToHeader();
  }, [isMenuSlide]);
  const getTimeHeader = () => ({
    height: 80,
    complexColumns: [
      {
        header: "E1 라인",
        name: "E1",
        childNames: ["e1_performance", "e1_target"],
        // renderer: CustomGrid.ColumnHeaderMultiLine,
      },
      {
        header: "E2 라인",
        name: "E2",
        childNames: ["e2_performance", "e2_target"],
      },
      {
        header: "E3 라인",
        name: "E3",
        childNames: ["e3_performance", "e3_target"],
      },
    ],
  });

  const GetDashboardData = async () => {
    restAPI
      .get(restURI.dashboard, {
        params: {},
      })
      .then((response) => {
        // API 응답 데이터 처리 로직
        setResponseData(response.data);
        setWorkerData(response?.data?.data?.rows[0].worker);
        let index = 0;
        const modifiedData = response.data.data.rows[0].downtime.map((item) => ({
          ...item,
          start_dt: `${item.start_date} ${item.start_time}`,
          end_dt: item.end_date && item.end_time ? `${item.end_date} ${item.end_time}` : "",
          no: ++index,
        }));
        const stateData = response.data.data.rows[0].line_state.map((item) => ({
          ...item,
          eq_state: item.state === 1 ? true : false,
        }));

        setDowntime(modifiedData);
        setState(stateData);
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      });
  };
  const cOptions = {
    colors: ["rgb(107, 232, 168)", "rgb(80, 151, 244)"],
    plotOptions: {
      // 차트 시각화 옵션
      bar: {
        // 막대그래프 옵션
        columnWidth: "50%", // 막대 너비
        // horizontal: true,
      },
    },
    dataLabels: {
      style: {
        colors: ["black"],
      },
      enabled: true,
    },
  };
  const stackedOptions = {
    colors: ["rgb(107, 232, 168)", "rgb(80, 151, 244)", "rgb(233, 204, 71)", "rgb(225, 73, 124)"],
    // colors: [function({ value, seriesIndex, w }) {
    //   if (value < 55) {
    //       return '#7E36AF'
    //   } else {
    //       return '#D9534F'
    //   }
    // }, function({ value, seriesIndex, w }) {
    //   if (value < 111) {
    //       return '#7E36AF'
    //   } else {
    //       return '#D9534F'
    //   }
    // }]
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        columnWidth: "60%", // 막대 너비
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    dataLabels: {
      style: {
        colors: ["black"],
      },
      enabled: true,
    },
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
  };
  const renderLine = (index) => <S.LineStateHeader>E{index + 1} Line</S.LineStateHeader>;
  const handleImgClick = () => {
    setIsClicked(!isClicked);
  };
  const RenderImage = (index) => {
    return equipState && equipState[index] ? (
      <S.LineStateBorder
        backgroundColor={equipState[index].eq_state ? "#F4FFF8" : "#FFF2F2"}
        borderColor={equipState[index].eq_state ? "#9AEBB7" : "#FF9494"}
      >
        {renderLine(index)}
        <img
          src={equipState[index].eq_state ? doriGreenImg : doriRedImg}
          alt={equipState[index].eq_state ? "Dori Green" : "Dori Red"}
          style={{
            // display: 'flex',
            display: "block",
            alignItems: "center",
            justifyContent: "center",
            flex: "none",
            margin: "0 auto",
            width: "75px",
            height: "75px",
          }}
          onClick={handleImgClick}
        />
        <img
          src={equipState[index].eq_state ? goodFont : badFont}
          alt={equipState[index].eq_state ? "goodFont" : "badFont"}
          style={{
            // display: 'flex',
            display: "block",
            justifyContent: "center",
            margin: "0 auto",
            marginTop: "10px",
            width: "75px",
            height: "25px",
          }}
        />
        {/* <LineState>
            {equipState[index].eq_state ? 'GOOD!' : 'BAD!'}
          </LineState> */}
        {/* </> */}
      </S.LineStateBorder>
    ) : null;
  };
  const RenderWorker = (name) => {
    return (
      <S.WorkerBorder backgroundColor={"#FCFCFC"} borderColor={"#D9D9D9"}>
        <img
          src={doriFace}
          alt={"doriFace"}
          style={{
            display: "flex",
            justifyContent: "center",
            flex: "none",
            margin: "0 auto",
            width: "80px",
            height: "100px",
          }}
        />
        <S.LineState>{name}</S.LineState>
      </S.WorkerBorder>
    );
  };

  // console.log(responseData.data.rows[0].line_work_status.graph);
  const stackedTmpData = [
    {
      name: "반제품",
      data: [
        {
          x: "E1",
          y: 1753,
        },
        {
          x: "E2",
          y: 0,
        },
        {
          x: "E3",
          y: 0,
        },
      ],
    },
    {
      name: "전구체",
      data: [
        {
          x: "E1",
          y: 1753,
        },
        {
          x: "E2",
          y: 1356,
        },
        {
          x: "E3",
          y: 1234,
        },
      ],
    },
    {
      name: "리튬",
      data: [
        {
          x: "E1",
          y: 3987,
        },
        {
          x: "E2",
          y: 3022,
        },
        {
          x: "E3",
          y: 3012,
        },
      ],
    },
    {
      name: "첨가제",
      data: [
        {
          x: "2023-07-15",
          y: 700,
        },
        {
          x: "2023-07-16",
          y: 654,
        },
        {
          x: "2023-07-17",
          y: 606,
        },
      ],
    },
  ];
  const gridOptions = {
    theme: "default",
  };

  const complexColumns = getTimeHeader();
  // setResult(GetTestValAndCreateAt(strJson));
  return (
    <ContentsArea>
      <S.AllWrap>
        <S.Left>
          <S.LeftTop>
            <S.Title>라인 가동 상태</S.Title>
            {equipState && (
              <S.ImgWrap>
                {RenderImage(0)}
                {RenderImage(1)}
                {RenderImage(2)}
              </S.ImgWrap>
            )}
          </S.LeftTop>
          <S.EmpStatusWrap>
            <S.Title>실시간 생산 담당자</S.Title>
            <S.LeftBottom>
              <S.GridContainer>
                {workerData && workerData.map((worker, index) => <React.Fragment key={index}>{RenderWorker(worker.emp_nm)}</React.Fragment>)}
              </S.GridContainer>
            </S.LeftBottom>
          </S.EmpStatusWrap>
        </S.Left>
        <S.Right>
          <S.RightTop>
            <S.Title>최근 라인 비가동 정보</S.Title>
            <S.GridWrap>
              {downtime && <GridSingle columns={columnsDownTime} data={downtime} options={gridOptions} refGrid={refSingleGrid} />}
            </S.GridWrap>
          </S.RightTop>
          <S.RightBottom>
            <S.GridContainer2>
              <S.ChartWrap>
                <S.Title>
                  EV 라인 투입량 (KG) <span style={{ fontSize: "0.8em" }}>[기준 06:00 ~ 05:59]</span>
                </S.Title>
                {responseData && <Chart options={stackedOptions} type="bar" height={"85%"} series={stackedTmpData} />}
              </S.ChartWrap>
              <S.ChartWrap>
                <S.Title>
                  EV 라인 금일 생산량 / 목표량 (KG) <span style={{ fontSize: "0.8em" }}>[기준 06:00 ~ 05:59]</span>
                </S.Title>
                {responseData && <Chart options={cOptions} type="bar" height={"85%"} series={responseData.data.rows[0].line_work_status.graph} />}
              </S.ChartWrap>
            </S.GridContainer2>
            {/* <S.RBGridWrap>
              {responseData && (
                <GridSingle
                  header={complexColumns}
                  columns={columnsGoal}
                  data={responseData.data.rows[0].line_work_status.grid}
                  refGrid={refSecondGrid}
                />
              )}
            </S.RBGridWrap> */}
          </S.RightBottom>
        </S.Right>
        <BackDrop isBackDrop={isBackDrop} />
      </S.AllWrap>
    </ContentsArea>
  );
};

export default Dashboard;
