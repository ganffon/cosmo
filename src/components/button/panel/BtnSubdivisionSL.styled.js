import styled from "styled-components";

export const ButtonSet = styled("button")`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: 150px;
  height: 60px;
  padding: 0rem 1rem;
  margin-right: 2%;

  font-family: "NotoSansKR_B", sans-serif;
  font-size: 1.5rem;
  color: white;
  text-align: center;
  text-decoration: none;

  border: none;
  border-radius: 10px;
  cursor: pointer;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  transition: 0.5s;

  background: ${(props) => (props.disabled ? "#dddddd" : props.color)};

  &:hover {
    background: ${(props) => (props.disabled ? "#dddddd" : props.hoverColor)};
  }
`;
