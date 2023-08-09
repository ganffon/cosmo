import styled from "styled-components";

const SwipeViewsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
`;

const SwipeHeaderView = styled.header`
  min-height: 40px;
  border-bottom: #f0f0f0 4px solid;
  display: flex;
  flex-flow: row nowrap;
`;

const SwipeViewsTabs = styled.div`
  flex: 1;
  min-height: 100%;
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: -4px;
`;

const SwipeViewsTabList = styled.ul`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
`;

const SwipeViewsTab = styled.li`
  display: inline;
  padding-top: 15px;
  flex: 1;
  text-align: center;
  color: ${(props) => (props.isActive ? "#0111cc" : "")};
`;

const SwipeViewsInk = styled.div`
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  height: 4px;
  background-color: #0111cca0;
  border-radius: 5px;
  width: ${(props) => props.pageWidthPerCent + "%"};
  margin-left: ${(props) => props.translations + "%"};
  transition-property: ${(props) => (props.animate ? "all" : "none")};
`;

const SwipeViewsContent = styled.div`
  transition-duration: 0.2s;
  transform: translateX(-${(props) => props.translations}%);
  width: ${(props) => props.totalWidth + "%"};
  transition-property: ${(props) => (props.animate ? "all" : "none")};
`;
const SwipeView = styled.div``;

export { SwipeViewsContainer, SwipeHeaderView, SwipeViewsTabs, SwipeViewsTabList, SwipeViewsTab, SwipeViewsInk, SwipeViewsContent, SwipeView };
