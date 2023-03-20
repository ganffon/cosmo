import { useContext, useState, useEffect, useRef } from "react";
import InputInfo from "components/input/InputInfo";
import ButtonSearch from "components/button/ButtonSearch";
import GridModule from "components/grid/GridModule";
import InspectionStandardManagementSet from "pages/gridSetting/InspectionStandardManagementSet";
import * as S from "./InspectionStandardManagement.styled";
import { LayoutEvent } from "components/layout/common/Layout";

function InspectionStandardManagement() {
  const { isAllScreen, isMenuSlide } = useContext(LayoutEvent);
  const boxRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);

  function scrollDetect() {
    setScrollY(boxRef?.current?.scrollTop);
    if (boxRef?.current?.scrollTop > 240) {
      console.log("true");
      setScrollActive(true);
    } else {
      console.log("false");
      setScrollActive(false);
    }
  }

  useEffect(() => {
    function watchScroll() {
      boxRef?.current?.addEventListener("scroll", scrollDetect);
    }
    watchScroll();
    return () => {
      boxRef?.current?.removeEventListener("scroll", scrollDetect);
    };
  });

  return (
    <S.ContentsArea ref={boxRef} isAllScreen={isAllScreen}>
      <S.ShadowBoxFixed isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ButtonWrap>
          <ButtonSearch />
        </S.ButtonWrap>
      </S.ShadowBoxFixed>
      <S.paddingBox>
        {/* <S.paddingBox> */}
        <S.ShadowBox>
          <S.GridTopWrap>
            <GridModule
              columnOptions={InspectionStandardManagementSet().columnOptions}
              columns={InspectionStandardManagementSet().columns}
              rowHeaders={InspectionStandardManagementSet().rowHeaders}
              header={InspectionStandardManagementSet().header}
              draggable={false}
            />
          </S.GridTopWrap>
        </S.ShadowBox>
        <S.ShadowBoxSticky
          scrollActive={scrollActive}
          isMenuSlide={isMenuSlide}
          isAllScreen={isAllScreen}
        >
          {/* <S.ShadowBoxSticky> */}
          <S.InputWrap>
            <InputInfo
              id="standardNo"
              name="검사기준서번호"
              value="test test"
            />
            <InputInfo id="1" name="라인" value="test test" />
            <InputInfo id="2" name="품번" value="test test" />
            <InputInfo id="3" name="품목명" value="test test" />
            <InputInfo id="4" name="개정일시" value="test test" />
            <InputInfo id="5" name="적용일시" value="test test" />
            <InputInfo id="6" name="적용여부" value="test test" />
            <InputInfo id="7" name="개정내역" value="test test" />
            <InputInfo id="8" name="비고" value="test test" />
          </S.InputWrap>
        </S.ShadowBoxSticky>
        <S.ShadowBox>
          <S.GridBottomWrap>
            <GridModule
              columnOptions={InspectionStandardManagementSet().columnOptions}
              columns={InspectionStandardManagementSet().columns}
              rowHeaders={InspectionStandardManagementSet().rowHeaders}
              header={InspectionStandardManagementSet().header}
              draggable={false}
            />
          </S.GridBottomWrap>
        </S.ShadowBox>
      </S.paddingBox>
    </S.ContentsArea>
  );
}

export default InspectionStandardManagement;
