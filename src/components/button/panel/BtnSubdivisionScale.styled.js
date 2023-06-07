import styled from "styled-components";

export const ButtonSet = styled("button")`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin-top: 80px;
  width: 120px;
  height: 200px;
  padding: 0.5rem 1rem;

  font-family: "NotoSansKR_B", sans-serif;
  font-size: 1.5rem;
  color: white;
  text-align: center;
  text-decoration: none;

  display: inline-block;

  border: none;
  border-radius: 10px;
  cursor: pointer;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  transition: 0.5s;

  background: ${(props) => props.color};

  &:hover {
    background: ${(props) => props.hoverColor};
  }
`;
