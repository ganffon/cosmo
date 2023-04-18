import styled from "styled-components";
import { APP_BAR_HEIGHT, FIXED_LEFT } from "constant/Layout";

export const ContentsArea = styled("div")`
  width: 100%;
  height: ${(props) =>
    props.isAllScreen ? "100vh" : `calc(100vh - ${APP_BAR_HEIGHT})`};
  overflow: hidden auto;
  background-color: white;
  padding: 0px 10px 0px 10px;
`;
export const ShadowBoxFixed = styled("div")`
  background-color: rgb(255, 255, 255);
  width: ${(props) =>
    props.isMenuSlide ? `calc(100% - 7.5rem)` : `calc(100% - 2rem)`};
  height: auto;
  position: fixed;
  top: ${(props) => (props.isAllScreen ? "0px" : `${APP_BAR_HEIGHT}`)};
  left: ${(props) => (props.isMenuSlide ? `${FIXED_LEFT}` : "10px")};
  z-index: 100;
  border-radius: 3px;
  border-color: rgb(255, 255, 255);
  margin-top: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ShadowBoxButton = styled("div")`
  background-color: rgb(255, 255, 255);
  width: calc(100% - 0.5rem);
  height: auto;
  border-radius: 3px;
  border-color: rgb(255, 255, 255);
  margin-top: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;

// function scrollDetect() {
//   setScrollY(boxRef?.current?.scrollTop);
//   if (boxRef?.current?.scrollTop > 240) {
//     setScrollActive(true);
//   } else {
//     setScrollActive(false);
//   }
// }

// useEffect(() => {
//   function watchScroll() {
//     boxRef?.current?.addEventListener("scroll", scrollDetect);
//   }
//   watchScroll();
//   return () => {
//     boxRef?.current?.removeEventListener("scroll", scrollDetect);
//   };
// }, [scrollY]);
export const ShadowBoxSticky = styled("div")`
  background-color: rgb(255, 255, 255);
  width: ${(props) =>
    props.scrollActive
      ? props.isMenuSlide
        ? `calc(100% - 7.5rem)`
        : `calc(100% - 2rem)`
      : "100%"};
  height: auto;
  position: ${(props) => (props.scrollActive ? "fixed" : "static")};
  top: ${(props) => (props.isAllScreen ? `${APP_BAR_HEIGHT}` : "93px")};
  left: ${(props) => (props.isMenuSlide ? `${FIXED_LEFT}` : "10px")};
  z-index: 100;
  border-radius: 3px;
  border-color: rgb(255, 255, 255);
  margin-top: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const paddingBox = styled("div")`
  padding-top: ${APP_BAR_HEIGHT};
`;
export const ShadowBox = styled("div")`
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: auto;
  border-radius: 3px;
  border-color: rgb(255, 255, 255);
  margin-top: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const SearchWrap = styled("div")`
  display: flex;
  flex-flow: row wrap;
  gap: 0px 10px;
  padding: 5px 5px 5px 10px;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  justify-content: flex-end;
  padding: 5px 5px 5px 0px;
`;
export const GridTopWrap = styled("div")`
  width: 100%;
  height: 300px;
`;
export const GridBottomWrap = styled("div")`
  width: 100%;
  height: 3000px;
`;
