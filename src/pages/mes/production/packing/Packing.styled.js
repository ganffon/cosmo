import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "components/datetime/DatePicker";
import InputSearch from "components/input/InputSearch";
import * as C from "constant/Layout";

const RadioButtonWrapper = styled.div`
  width: 180px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 0px 10px;
  margin-right: 10px;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 5px;
`;

const RadioButtonInput = styled.input`
  margin-right: 3px;
`;

export const RadioButton = ({ options, selectedOption, onChange }) => {
  return (
    <RadioButtonWrapper>
      {options.map((option) => (
        <RadioButtonLabel key={option.value}>
          <RadioButtonInput
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </RadioButtonLabel>
      ))}
    </RadioButtonWrapper>
  );
};

export const RadioTitle = styled("div")`
  margin-right: 10px;
`;

export const ContentsArea = styled("div")`
  height: ${(props) => (props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`)};
  width: 100%;
  background-color: rgb(255, 255, 255);
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
`;
export const TopWrap = styled("div")`
  height: 450px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const BottomWrap = styled("div")`
  height: calc(100% - 460px);
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: #ffffff;
  margin-top: 5px;

  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ContentsLeft = styled("div")`
  height: 100%;
  width: 43%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-right: 2.5px;
  padding: 10px 5px 10px 10px;
`;
export const ContentsRight = styled("div")`
  height: 100%;
  width: 57%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-left: 2.5px;
  padding: 10px 10px 10px 5px;
`;
export const SearchWrap = styled("div")`
  background: #ffffff;
  height: 60px;
  width: 100%;
  display: flex;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5px 5px 5px 10px;
  gap: 10px;
`;
export const ContentsHeader = styled("div")`
  height: calc(100% - 60px);
  width: 100%;

  margin-top: 5px;
  background: #ffffff;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const GridHeaderWrap = styled("div")`
  height: calc(100% - 40px);
  width: 100%;

  padding: 10px 10px 10px 10px;
`;
export const SearchInfoWrap = styled("div")`
  height: 115px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const SearchRightWrap = styled("div")`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const GridDetailWrap = styled("div")`
  height: calc(100% - 45px);
  width: 100%;

  padding: 10px 10px 10px 10px;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  padding-left: 5px;
  padding-top: 10px;
  justify-content: end;
  align-items: center;
`;

export const SearchButtonWrap = styled("div")`
  display: flex;
  width: 100%;
  padding-right: 5px;
  justify-content: end;
  align-items: center;
`;

export const SearchRightTopWrap = styled("div")`
  height: 50%;
  display: flex;
  flex-flow: row wrap;
  gap: 5px 5px;
  padding: 10px 10px 10px 10px;
`;
export const SearchRightBottomWrap = styled("div")`
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px 10px 10px 10px;
`;
export const Date = styled(DatePicker)`
  height: 40px;
`;
export const InputS = styled(InputSearch)`
  height: 40px;
`;
export const InputBox = styled("div")`
  width: 250px;
  display: flex;
  margin-right: 5px;
  margin-top: 5px;
`;
export const Title = styled(Typography)`
  width: 50px;
`;

export const Input = styled(TextField)`
  width: 150px;
`;
export const TitleMid = styled("div")`
  display: flex;
  align-items: center;
  font-family: NotoSansKR_B;
  padding-left: 20px;
`;

export const TitleBottom = styled("div")`
  display: flex;
  align-items: center;
  font-family: NotoSansKR_B;
  padding-left: 20px;
`;

export const InputPaperWrap = styled("div")`
  padding-top: 5px;
`;

export const TitleButtonWrap = styled("div")`
  height: 40px;
  display: flex;
  justify-content: space-between;
`;
export const InnerButtonWrap = styled("div")`
  padding-right: 10px;
`;

export const CntGridContainer = styled("div")`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: ${(props) => props.rowTemplate || "50% 50%"};
  border-radius: 10px;
`;
export const TwoColGridContainer = styled("div")`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: ${(props) => props.rowTemplate || "50% 50%"};
  border-radius: 10px;
`;

export const ComboBox = styled(Autocomplete)`
  width: 350px;
  margin-top: 5px;
`;
