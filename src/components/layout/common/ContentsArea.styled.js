import styled from "styled-components";

export const ContentsArea = styled("div")`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #efefef;
  padding: 20px;

  display: flex;
  ${(props) => (!props.hidden && props.flexColumn ? "flex-direction: column;" : "")}

  gap: 10px;

  & .redText {
    color: red;
  }

  & .selectedBack {
    background-color: #fdf0f6;
  }
`;
