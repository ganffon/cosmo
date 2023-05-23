import styled from "styled-components";

export const Wrap = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const InputWrap = styled("div")`
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
  width: 100%;
  display: flex;
`;
