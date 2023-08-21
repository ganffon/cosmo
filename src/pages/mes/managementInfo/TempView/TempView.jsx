import React, { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";

import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import RadialBarChart, { RadialBarChartModule, CountModule, TempModule } from "./TempViewSet";
import ContentsArea from "components/layout/common/ContentsArea";
import * as S from "./TempView.styled";
import DateTime from "components/datetime/DateTime";
import BackDrop from "components/backdrop/BackDrop";

export const TempView = () => {
  let isFirst = true;

  const [now, setNow] = useState("");

  const [tempResponseData, setTempResponseData] = useState(null);
  const [workResponseData, setWorkResponseData] = useState(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [containerWidth, setContainerWidth] = useState(1446);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth - 90;
      setContainerWidth(width);
    };

    // 초기 렌더링 시 창 크기로 너비 설정
    handleResize();

    // 창 크기 변경 시에도 너비 업데이트
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuSlide]);

  const GetMonthlyLineCapaData = () => {
    restAPI
      .get(restURI.prodSite, {
        params: {},
      })
      .then((response) => {
        setTempResponseData(response.data.data.rows[0].temp);
        setWorkResponseData(response.data.data.rows[0].work);
      })
      .catch((error) => {})
      .finally(() => {
        setIsBackDrop(false);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      GetMonthlyLineCapaData();
    };

    if (isFirst) {
      setIsBackDrop(true);
      fetchData();
      isFirst = false;
    }
    //
    const interval = setInterval(fetchData, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setNow(DateTime().dateFull + " " + DateTime().hour + ":" + DateTime().minute + ":" + DateTime().seconds);
    };
    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ContentsArea isAllScreen={isAllScreen}>
      <S.AllWrap>
        <S.GridContainer isAllScreen={isAllScreen}>
          <S.HeaderWrap isAllScreen={isAllScreen}>
            <S.TwoColGridContainer>
              <S.Title>실시간 현장(라인상태, 온습도) 대시보드</S.Title>
              <S.TimeStamp>{now}</S.TimeStamp>
            </S.TwoColGridContainer>
          </S.HeaderWrap>
          <S.SecondWrap isAllScreen={isAllScreen}>
            <S.EachTitle>라인 상태</S.EachTitle>
            <S.SecondGridWrap>
              {workResponseData && (
                <CountModule
                  line={"E1"}
                  count={workResponseData.E1.count}
                  reg_date={workResponseData.E1.scan_dt}
                  status={workResponseData.E1.status}
                />
              )}
              {workResponseData && (
                <CountModule
                  line={"E2"}
                  count={workResponseData.E2.count}
                  reg_date={workResponseData.E2.scan_dt}
                  status={workResponseData.E2.status}
                />
              )}
              {workResponseData && (
                <CountModule
                  line={"E3"}
                  count={workResponseData.E3.count}
                  reg_date={workResponseData.E3.scan_dt}
                  status={workResponseData.E3.status}
                />
              )}
            </S.SecondGridWrap>
          </S.SecondWrap>
          <S.SecondWrap isAllScreen={isAllScreen}>
            <S.EachTitle>온도 정보</S.EachTitle>
            <S.SecondGridWrap>
              {tempResponseData && (
                <TempModule
                  data={tempResponseData[0]}
                  minText={tempResponseData[0].min}
                  maxText={tempResponseData[0].max}
                  Line={tempResponseData[0].location}
                  isTemp={tempResponseData[0].type}
                />
              )}
              {tempResponseData && (
                <TempModule
                  data={tempResponseData[2]}
                  minText={tempResponseData[2].min}
                  maxText={tempResponseData[2].max}
                  Line={tempResponseData[2].location}
                  isTemp={tempResponseData[2].type}
                />
              )}
              {tempResponseData && (
                <TempModule
                  data={tempResponseData[4]}
                  minText={tempResponseData[4].min}
                  maxText={tempResponseData[4].max}
                  Line={tempResponseData[4].location}
                  isTemp={tempResponseData[4].type}
                />
              )}
              {tempResponseData && (
                <TempModule
                  data={tempResponseData[6]}
                  minText={tempResponseData[6].min}
                  maxText={tempResponseData[6].max}
                  Line={tempResponseData[6].location}
                  isTemp={tempResponseData[6].type}
                />
              )}
              {tempResponseData && (
                <TempModule
                  data={tempResponseData[8]}
                  minText={tempResponseData[8].min}
                  maxText={tempResponseData[8].max}
                  Line={tempResponseData[8].location}
                  isTemp={tempResponseData[8].type}
                />
              )}
            </S.SecondGridWrap>
          </S.SecondWrap>
          <S.SecondWrap isAllScreen={isAllScreen}>
            <S.EachTitle>습도 정보</S.EachTitle>
            <S.SecondGridWrap>
              {tempResponseData && (
                <RadialBarChartModule
                  data={tempResponseData[1]}
                  minText={tempResponseData[1].min}
                  maxText={tempResponseData[1].max}
                  Line={tempResponseData[1].location}
                  isTemp={tempResponseData[1].type}
                />
              )}
              {tempResponseData && (
                <RadialBarChartModule
                  data={tempResponseData[3]}
                  minText={tempResponseData[3].min}
                  maxText={tempResponseData[3].max}
                  Line={tempResponseData[3].location}
                  isTemp={tempResponseData[3].type}
                />
              )}
              {tempResponseData && (
                <RadialBarChartModule
                  data={tempResponseData[5]}
                  minText={tempResponseData[5].min}
                  maxText={tempResponseData[5].max}
                  Line={tempResponseData[5].location}
                  isTemp={tempResponseData[5].type}
                />
              )}
              {tempResponseData && (
                <RadialBarChartModule
                  data={tempResponseData[7]}
                  minText={tempResponseData[7].min}
                  maxText={tempResponseData[7].max}
                  Line={tempResponseData[7].location}
                  isTemp={tempResponseData[7].type}
                />
              )}
              {tempResponseData && (
                <RadialBarChartModule
                  data={tempResponseData[9]}
                  minText={tempResponseData[9].min}
                  maxText={tempResponseData[9].max}
                  Line={tempResponseData[9].location}
                  isTemp={tempResponseData[9].type}
                />
              )}
            </S.SecondGridWrap>
          </S.SecondWrap>
        </S.GridContainer>
      </S.AllWrap>
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
};
