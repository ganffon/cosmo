import React, { useContext, useState } from "react";
import Input from "components/input/Input";
import ButtonSearch from "components/button/ButtonSearch";
import GridModule from "components/grid/GridModule";
import InspectionStandardManagementSet from "pages/gridSetting/InspectionStandardManagementSet";
import * as S from "./InspectionStandardManagement.styled";
import { LayoutEvent } from "components/layout/common/Layout";

function InspectionStandardManagement() {
  const { isAllScreen, isMenuSlide } = useContext(LayoutEvent);
  const [test, setTest] = useState(true);
  // console.log(test);
  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ShadowBoxFixed isMenuSlide={isMenuSlide}>
        <S.ButtonWrap>
          <ButtonSearch />
        </S.ButtonWrap>
      </S.ShadowBoxFixed>
      <S.paddingBox>
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
        <S.ShadowBox>
          <S.InputWrap>
            <Input id="standardNo" name="검사기준서번호" value="test test" />
            <Input id="1" name="라인" value="test test" />
            <Input id="2" name="품번" value="test test" />
            <Input id="3" name="품목명" value="test test" />
            <Input id="4" name="개정일시" value="test test" />
            <Input id="5" name="적용일시" value="test test" />
            <Input id="6" name="적용여부" value="test test" />
            <Input id="7" name="개정내역" value="test test" />
            <Input id="8" name="비고" value="test test" />
          </S.InputWrap>
        </S.ShadowBox>
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
