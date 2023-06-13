import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "../manage.styled";
import Chart from "react-apexcharts";
import { LoginStateChk } from "custom/LoginStateChk";
import DateTime from "components/datetime/DateTime";
import GridSingle from "components/grid/GridSingle";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import ButtonSearch from "components/button/ButtonSearch";
import RadialBarChart, {RadialBarChartModule, CountModule} from "./TempViewSet";



const TempView = () => {
  let isFirst = true;
  LoginStateChk();
  const[now, setNow] = useState('')
  
  const [tempResponseData, setTempResponseData] = useState(null);
  const [workResponseData, setWorkResponseData] = useState(null);

  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [containerWidth, setContainerWidth] = useState(1446);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth - 90;
      setContainerWidth(width);
    };

    // 초기 렌더링 시 창 크기로 너비 설정
    handleResize();

    // 창 크기 변경 시에도 너비 업데이트
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const GetMonthlyLineCapaData = () => {
    restAPI
      .get(restURI.prodSite, {
        params: { 
        },
      })
      .then((response) => {
        setTempResponseData(response.data.data.rows[0].temp);
        setWorkResponseData(response.data.data.rows[0].work);
        
      })
      .catch((error) => {
      });
  };
  
  useEffect(() => {
    const fetchData = async () => {
      GetMonthlyLineCapaData()
    };
    
    if (isFirst) {
      fetchData();
      isFirst = false
    }
    // 
    const interval = setInterval(fetchData, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  
  
  return (
    <S.ContentsArea>
      <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center', fontSize: '30px', fontWeight:'bold', marginTop:'20px'}} >
        실시간 현장(라인상태, 온습도) 대시보드
        <div style={{display: 'flex', justifyContent: 'right', textAlign: 'right', fontSize: '30px', fontWeight:'bold', marginTop:'20px'}} >
          {now}
          </div>
      </div>
      <div style={{ display: 'flex', width: containerWidth, marginTop: '50px'}}>
        {workResponseData && <CountModule line = {"E1"} count={workResponseData.E1.count} reg_date={workResponseData.E1.scan_dt} status={workResponseData.E1.status}/>}
        {workResponseData && <CountModule line = {"E2"} count={workResponseData.E2.count} reg_date={workResponseData.E2.scan_dt} status={workResponseData.E2.status}/>}
        {workResponseData && <CountModule line = {"E3"} count={workResponseData.E3.count} reg_date={workResponseData.E3.scan_dt} status={workResponseData.E3.status}/>}
      </div>
      <div style={{ display: 'flex', width: containerWidth, marginTop: '50px'}}>
        {tempResponseData&&<RadialBarChartModule data={tempResponseData[0]} minText={tempResponseData[0].max} maxText={tempResponseData[0].min} Line={tempResponseData[0].location} containerWidth={containerWidth} isTemp={tempResponseData[0].type}/>}
        {tempResponseData&&<RadialBarChartModule data={tempResponseData[2]} minText={tempResponseData[2].max} maxText={tempResponseData[2].min} Line={tempResponseData[2].location} containerWidth={containerWidth} isTemp={tempResponseData[2].type}/>}
        {tempResponseData&&<RadialBarChartModule data={tempResponseData[4]} minText={tempResponseData[4].max} maxText={tempResponseData[4].min} Line={tempResponseData[4].location} containerWidth={containerWidth} isTemp={tempResponseData[4].type}/>}
        {tempResponseData&&<RadialBarChartModule data={tempResponseData[6]} minText={tempResponseData[6].max} maxText={tempResponseData[6].min} Line={tempResponseData[6].location} containerWidth={containerWidth} isTemp={tempResponseData[6].type}/>}
        {tempResponseData&&<RadialBarChartModule data={tempResponseData[8]} minText={tempResponseData[8].max} maxText={tempResponseData[8].min} Line={tempResponseData[8].location} containerWidth={containerWidth} isTemp={tempResponseData[8].type}/>}
      </div>
      <div style={{ display: 'flex', width: containerWidth, marginTop: '20px'}}>
        {tempResponseData&&<RadialBarChartModule data={tempResponseData[1]} minText={tempResponseData[1].max} maxText={tempResponseData[1].min} Line={tempResponseData[1].location} containerWidth={containerWidth} isTemp={tempResponseData[1].type}/>}
        {tempResponseData&&<RadialBarChartModule data={tempResponseData[3]} minText={tempResponseData[3].max} maxText={tempResponseData[3].min} Line={tempResponseData[3].location} containerWidth={containerWidth} isTemp={tempResponseData[3].type}/>}
        {tempResponseData&&<RadialBarChartModule data={tempResponseData[5]} minText={tempResponseData[5].max} maxText={tempResponseData[5].min} Line={tempResponseData[5].location} containerWidth={containerWidth} isTemp={tempResponseData[5].type}/>}
        {tempResponseData&&<RadialBarChartModule data={tempResponseData[7]} minText={tempResponseData[7].max} maxText={tempResponseData[7].min} Line={tempResponseData[7].location} containerWidth={containerWidth} isTemp={tempResponseData[7].type}/>}
        {tempResponseData&&<RadialBarChartModule data={tempResponseData[9]} minText={tempResponseData[9].max} maxText={tempResponseData[9].min} Line={tempResponseData[9].location} containerWidth={containerWidth} isTemp={tempResponseData[9].type}/>}
      </div>
    </S.ContentsArea>
  );
};

export default TempView;
