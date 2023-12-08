import styled from "styled-components";
import TextField from "@mui/material/TextField";

const calculateShrinkSize = (size: string) => {
  const parsedSize = parseFloat(size); // 숫자 부분을 파싱
  const unit = size.match(/[\d.\-+]*\s*(.*)/)[1] || ""; // 단위 (px, rem, em, etc) 부분을 파싱

  return `${parsedSize * 0.7}${unit}`;
};

export const FdrDate = styled(TextField)`
  width: ${($props) => $props.$width};

  /* Input이 값을 가지고 있을 때 라벨을 위로 올리고 폰트 사이즈 감소 */
  & .MuiInputLabel-root.MuiFormLabel-filled {
    transform: translate(12px, -50%);
    font-size: ${($props) => calculateShrinkSize($props.$fontSize)};

    `;
// .MuiInputBase-root {
//   height: ${(props) => props.$height};
// }
