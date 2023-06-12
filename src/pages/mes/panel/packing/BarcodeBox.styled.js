import styled from "styled-components";

export const Wrap = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
`;
export const InputWrap = styled("div")`
  margin-top: 10px;
  display: flex;
`;
export const InfoTitle = styled("div")`
  width: ${(props) => props.width};
  font-size: 30px;
  font-weight: 700;
  margin-left: 30px;
  margin-top: 5px;
`;
export const InfoTitleBarcode = styled("div")`
  width: 200px;
  font-size: 30px;
  font-weight: 700;
  margin-left: 30px;
  margin-top: 10px;
`;
export const InputWrapDivide = styled("div")`
  padding-bottom: 40px;
  padding-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const InputWrapDivideBottom = styled("div")`
  padding-bottom: 40px;
  padding-top: 10px;
  margin-left: 10px;
  width: 99%;
  display: flex;
  justify-content: space-around;
`;
