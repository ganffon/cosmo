import React, { useContext, useState, useEffect } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import "react-splitter-layout/lib/index.css";
import { Bottom, Top, ToolWrap, Left, Right, LeftTop, RightTop, LeftBottom, RightBottom, LineState } from "./Dashboard.styled";
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
import Chart from "react-apexcharts";
// import { useSpring, animated, config  } from 'react-spring';

const Dashboard = () => {
  const [result, setResult] = useState([]);
  const { isAllScreen } = useContext(LayoutContext);
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
  const columnsGoal = [
    { header: "생산량", name: "e1_performance" },
    { header: "목표량", name: "e1_target" },
    { header: "생산량", name: "e2_performance" },
    { header: "목표량", name: "e2_target" },
    { header: "생산량", name: "e3_performance" },
    { header: "목표량", name: "e3_target" },
  ];

  const getTimeHeader = () => ({
    height: 80,
    complexColumns: [
      {
        header: "E1 라인",
        name: "E1",
        childNames: ["e1_performance", "e1_target"],
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
        const modifiedData = response.data.data.rows[0].downtime.map(
          (item) => ({
            ...item,
            start_dt: `${item.start_date} ${item.start_time}`,
            end_dt: `${item.end_date} ${item.end_time}`,
            no: ++index,
          })
        );
        const stateData = response.data.data.rows[0].line_state.map(
          (item) => ({
            ...item,
            eq_state: (item.state===1) ? true : false 
          })
        );
        
        
        setDowntime(modifiedData);
        setState(stateData)
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      });
  };
  const cOptions = {
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

  const renderLine = (index) => (
    <S.LineStateHeader>
      E{index + 1} Line
    </S.LineStateHeader>
  );
  const handleImgClick = () => {
    setIsClicked(!isClicked);
  };
  const RenderImage = (index) => {  
    return (
      equipState && equipState[index] ? (
        <S.LineStateBorder backgroundColor={equipState[index].eq_state ? '#F4FFF8' : "#FFF2F2"} borderColor={equipState[index].eq_state ? '#9AEBB7' : "#FF9494"}>
          {renderLine(index)}
            <img
            src={equipState[index].eq_state ? doriGreenImg : doriRedImg}
            alt={equipState[index].eq_state ? "Dori Green" : "Dori Red"}
            style={{
              // display: 'flex',
              display: 'block',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 'none',
              margin: '0 auto',
              width: '75px',
              height: '75px',
            }}
            onClick={handleImgClick} />
            <img
            src={equipState[index].eq_state ? goodFont : badFont}
            alt={equipState[index].eq_state ? "goodFont" : "badFont"}
            style={{
              // display: 'flex',
              display: 'block',
              justifyContent: 'center',
              margin: '0 auto',
              marginTop: '20px',
              width: '75px',
              height: '25px',
            }}
            />
          {/* <LineState>
            {equipState[index].eq_state ? 'GOOD!' : 'BAD!'}
          </LineState> */}
          {/* </> */}
          </S.LineStateBorder>
      ) : null
    );
  };

  const RadialBarChart = ({ data }) => {
    const options = {
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          },
        },
      },
    };
  
    return (
      <div>
        <Chart
          options={options}
          series={data}
          type="radialBar"
          height={350}
        />
      </div>
    );
  };

  const RenderWorker = (name) => {
    return (
      <S.WorkerBorder backgroundColor={"#FCFCFC"} borderColor={"#D9D9D9"}>
        <img
          src={doriFace}
          alt={"doriFace"}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flex: 'none',
            margin: '0 auto',
            width: '80px',
            height: '80px',
          }}
        />
        <LineState>
          {name}
        </LineState>
      </S.WorkerBorder>
    );
  };

  const gridOptions = {
    theme: "default",
  };

  const complexColumns = getTimeHeader();
  // setResult(GetTestValAndCreateAt(strJson));
  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor:'#EFEFEF'}}>
      <Left>
        <LeftTop> 
          <S.Title>라인 가동 상태</S.Title>
          {equipState && (
            <div style={{ flex: '1', display: 'flex',  margin: 10}}>
                  {RenderImage(0)}
                  {RenderImage(1)}
                  {RenderImage(2)}
            </div>
          )}
        </LeftTop>
        <LeftBottom>
          <S.BottomTitle>
            실시간 생산 담당자
          </S.BottomTitle>
          <S.GridContainer>
            {workerData &&
              workerData.map((worker, index) => (
                <React.Fragment key={index}>
                  {RenderWorker(worker.emp_nm)}
                </React.Fragment>
              ))}
          </S.GridContainer>
        </LeftBottom>
      </Left>
      <Right>
        <RightTop>
          <S.Title>최근 라인 비가동 정보</S.Title>
          <S.GridWrap>
            {downtime && <Grid columns={columnsDownTime} data={downtime} options={gridOptions}/>}
          </S.GridWrap>
        </RightTop>
        <RightBottom> 
          <S.Title>
            EV 라인 금일 생산량 / 목표량 (KG) <span style={{ fontSize: '0.8em' }}>[기준 06:00 ~ 05:59]</span>
          </S.Title>
          <S.GridWrap>
          {responseData && (
            <Chart options={cOptions} type="bar" height={200} series={responseData.data.rows[0].line_work_status.graph} />
          )}
            {responseData && (
              <Grid
                header={complexColumns}
                columns={columnsGoal}
                data={responseData.data.rows[0].line_work_status.grid}
              />
            )}
          </S.GridWrap>
        </RightBottom>
      </Right>
    </div>
  );
};

export default Dashboard;
