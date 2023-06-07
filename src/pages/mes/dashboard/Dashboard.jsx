import React, { useContext, useState, useEffect } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import { Bottom, Top, ToolWrap } from "./Dashboard.styled";
import doriRedImg from "../../../img/Menu/dori_red.svg";
import doriGreenImg from "../../../img/Menu/dori_green.svg";
import Grid from "@toast-ui/react-grid";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import GridSingle from "components/grid/GridSingle";
import Chart from "react-apexcharts";

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

  useEffect(() => {
    GetDashboardData();
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
        let index = 0;
        const modifiedData = response.data.data.rows[0].downtime.map((item) => ({
          ...item,
          start_dt: `${item.start_date} ${item.start_time}`,
          end_dt: `${item.end_date} ${item.end_time}`,
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
    <div
      style={{
        position: "absolute",
        top: "40%",
        left: `${20 + index * 25}%`,
        transform: "translate(-50%, -50%)",
        height: "50px",
      }}
    >
      E{index + 1} Line
    </div>
  );

  const renderImage = (index) =>
    equipState && equipState[index] ? (
      <img
        src={equipState[index].eq_state ? doriGreenImg : doriRedImg}
        alt={equipState[index].eq_state ? "Dori Green" : "Dori Red"}
        style={{
          position: "absolute",
          top: "60%",
          left: `${20 + index * 25}%`,
          transform: "translate(-50%, -50%)",
          width: "50px",
          height: "50px",
        }}
      />
    ) : null;

  const complexColumns = getTimeHeader();
  // setResult(GetTestValAndCreateAt(strJson));
  return (
    <SplitterLayout customClassName="my-splitter-layout" percentage={true} secondaryInitialSize={70}>
      <SplitterLayout customClassName="my-splitter-layout" vertical={true} percentage={true} secondaryInitialSize={70}>
        <div>
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "45%",
              transform: "translate(-50%, -50%)",
              height: "50px",
            }}
          >
            라인 가동 상태
          </div>
          {equipState && (
            <div>
              {renderLine(0)}
              {renderImage(0)}

              {renderLine(1)}
              {renderImage(1)}

              {renderLine(2)}
              {renderImage(2)}
            </div>
          )}
        </div>
        <Bottom>{responseData && <Grid columns={columnsEmp} data={responseData.data.rows[0].worker} />}</Bottom>
      </SplitterLayout>
      <SplitterLayout vertical percentage={true} secondaryInitialSize={60}>
        <Top>
          <ToolWrap>
            <div style={{ position: "absolute", left: "40%" }}>최근 라인 비가동 정보</div>
          </ToolWrap>
          {/* {responseData && <Grid columns={columnsDownTime} data={responseData.data.rows[0].downtime}/>} */}
          {downtime && <Grid columns={columnsDownTime} data={downtime} />}
        </Top>
        <Bottom>
          <ToolWrap>
            <div style={{ position: "absolute", left: "30%", fontSize: "1.2em" }}>
              EV 라인 금일 생산량 / 목표량 (KG) <span style={{ fontSize: "0.8em" }}>[기준 06:00 ~ 05:59]</span>
            </div>
          </ToolWrap>
          {responseData && (
            <Chart
              options={cOptions}
              type="bar"
              height={200}
              series={responseData.data.rows[0].line_work_status.graph}
            />
          )}
          {responseData && (
            <GridSingle
              header={complexColumns}
              columns={columnsGoal}
              data={responseData.data.rows[0].line_work_status.grid}
              isEditMode={true}
            />
          )}
        </Bottom>
      </SplitterLayout>
    </SplitterLayout>
  );
};

export default Dashboard;
