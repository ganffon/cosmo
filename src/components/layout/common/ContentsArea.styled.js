import styled from "styled-components";

export const ContentsArea = styled("div")`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #efefef;
  padding: 10px 30px 10px 10px;
  font-family: NotoSansKR;

  display: flex;
  ${(props) => (!props.hidden && props.flexColumn ? "flex-direction: column;" : "")}

  gap: 10px;

  & .redText {
    color: red;
  }

  & .blueText {
    color: blue;
  }

  & .boldText {
    font-weight: 900;
  }

  & .selectedBack {
    background-color: #fdf0f6;
  }

  & .subtotalBack {
    background-color: #eaf4ea;
  }
`;
