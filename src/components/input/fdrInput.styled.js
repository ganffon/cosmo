import styled from "styled-components";
import TextField from "@mui/material/TextField";

const calculateShrinkSize = (size) => {
  const parsedSize = parseFloat(size); // 숫자 부분을 파싱
  const unit = size.match(/[\d.\-+]*\s*(.*)/)[1] || ""; // 단위 (px, rem, em, etc) 부분을 파싱

  return `${parsedSize * 0.7}${unit}`;
};

export const FdrInput = styled(TextField)`
  width: ${($props) => $props.$width};

  & label.Mui-focused {
    top: 0;
    transform: translate(12px, -50%);
    font-size: ${($props) => calculateShrinkSize($props.$fontSize)};
  }

  & .MuiInputLabel-root {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translate(10px, -50%);
    transition: top 0.2s, transform 0.2s, font-size 0.2s;
    font-size: ${($props) => $props.$fontSize};
  }

  /* Input이 값을 가지고 있을 때 라벨을 위로 올리고 폰트 사이즈 감소 */
  & .MuiInputLabel-root.MuiFormLabel-filled {
    top: 0px;
    transform: translate(12px, -50%);
    font-size: ${($props) => calculateShrinkSize($props.$fontSize)};
  }

  /* Input 필드에 포커스가 있을 때만 라벨이 위로 올라가도록 */
  & .Mui-focused + .MuiInputBase-root .MuiInputLabel-root {
    top: -6px;
    transform: translateY(-100%);
    font-size: ${($props) => calculateShrinkSize($props.$fontSize)};
  }
`;
