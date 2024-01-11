import styled from "styled-components";
import Close from "@mui/icons-material/Close";

export const Overlay = styled("div")`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(0, 0, 0, 0.6);
  z-index: 10000;
`;
export const Inner = styled("div")`
  width: ${($props) => $props.$width};
  min-width: ${($props) => $props.$width};
  height: ${($props) => $props.$height};
  position: absolute;
  top: ${($props) => ($props.$position === "top" ? "20%" : "50%")};
  left: 50%;
  transform: translate(-50%, ${($props) => ($props.$position === "top" ? "-20%" : "-50%")});
  z-index: 1000;

  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const Header = styled("div")`
  width: 100%;
  height: 40px;
  background: rgb(200, 200, 200);
  border-radius: 10px 10px 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
`;

export const Title = styled("div")`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 900;
  cursor: default;
`;

export const CloseIcon = styled(Close)`
  cursor: pointer;
`;

export const Main = styled("div")`
  height: calc(100% - 40px);
  width: 100%;
`;
