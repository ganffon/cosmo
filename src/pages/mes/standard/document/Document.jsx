import { useContext, useState, useEffect, useRef } from "react";
import InputInfo from "components/input/InputInfo";
import ButtonSearch from "components/button/ButtonSearch";
import GridModule from "components/grid/GridModule";
import DocumentSet from "pages/mes/standard/document/DocumentSet";
import * as S from "./Document.styled";
import { LayoutEvent } from "components/layout/common/Layout";

function Document() {
  const { isAllScreen, isMenuSlide } = useContext(LayoutEvent);
  const boxRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);

  function scrollDetect() {
    setScrollY(boxRef?.current?.scrollTop);
    if (boxRef?.current?.scrollTop > 240) {
      setScrollActive(true);
    } else {
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
              columnOptions={DocumentSet().columnOptions}
              columns={DocumentSet().columns}
              rowHeaders={DocumentSet().rowHeaders}
              header={DocumentSet().header}
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
              columnOptions={DocumentSet().columnOptions}
              columns={DocumentSet().columns}
              rowHeaders={DocumentSet().rowHeaders}
              header={DocumentSet().header}
              draggable={false}
            />
          </S.GridBottomWrap>
        </S.ShadowBox>
      </S.paddingBox>
    </S.ContentsArea>
  );
}

export default Document;
