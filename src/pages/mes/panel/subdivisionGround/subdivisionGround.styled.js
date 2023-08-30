import styled from "styled-components";
import { Autocomplete } from "@mui/material";
import InputSearch from "components/input/InputSearch";
import TextField from "@mui/material/TextField";

export const OuterLayout = styled("div")`
  height: 100%;
  background-color: rgb(239, 239, 239);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const TopWrap = styled("div")`
  height: 100px;
  display: flex;
  align-items: center;
  border: solid 1px #cccccc;
  padding: 10px 30px;
  border-radius: 15px;
  gap: 10px;
  background-color: white;
  box-shadow: rgb(17 17 26 / 10%) 0 4px 16px, rgb(17 17 26 / 5%) 0a 8px 32px;
`;
export const BottomWrapGround = styled("div")`
  display: flex;
  flex-direction: row;
  height: calc(100% - 100px);
  gap: 10px;
  border-radius: 10px;
`;

export const BottomWrapWeight = styled("div")`
  display: flex;
  flex-direction: row;
  height: calc(100% - 100px);
  padding: 10px;
  gap: 10px;
`;
export const TopLeftContent = styled("div")`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  height: 100%;
  padding: 5px 10px;
  gap: 10px;
`;
export const TopRightContent = styled("div")`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const BottomLeftGroundContent = styled("div")`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const BottomRightGroundContent = styled("div")`
  width: 50%;
  background-color: white;
  border-radius: 15px;
  box-shadow: rgb(17 17 26 / 10%) 0 4px 16px, rgb(17 17 26 / 5%) 0 8px 32px;
`;

export const BottomLeftWeightContent = styled("div")`
  width: 25%;
  background-color: white;
  border-radius: 15px;
  border: solid 1px #cccccc;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px;
`;

export const BottomMiddleWeightContent = styled("div")`
  width: 25%;
  background-color: white;
  border-radius: 15px;
  border: solid 1px #cccccc;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 10px;
`;
export const BottomRightWeightContent = styled("div")`
  background-color: white;
  border-radius: 15px;
  border: solid 1px #cccccc;
  margin-bottom: 10px;
  width: 50%;

  box-shadow: rgb(17 17 26 / 10%) 0 4px 16px, rgb(17 17 26 / 5%) 0 8px 32px;
`;

export const ComboBoxWrap = styled("div")`
  width: 180px;
`;
export const ComboBox = styled(Autocomplete)`
  width: 180px;
  margin-top: 5px;
`;

export const InputBox = styled(TextField)`
  width: 180px;
  margin-top: 5px;
`;
export const TopRightTitle = styled("div")`
  font-size: 35px;
  color: #797979;
  font-family: "NotoSansKR_B", sans-serif;
`;
export const TopRightGroundButton = styled("button")`
  background: ${(props) => (props.background ? "#1491CE" : "white")};
  color: ${(props) => (props.background ? "white" : "#1491CE")};
  font-size: 25px;
  border: solid 1px #cccccc;
  //background: white;
  min-width: 300px;
  padding: 20px;
  border-radius: 20px;
  cursor: pointer;
  font-family: "NotoSansKR_B", sans-serif;
`;
export const TopRightWeightButton = styled("button")`
  background: ${(props) => (props.background ? "white" : "#1491CE")};
  color: ${(props) => (props.background ? "#1491CE" : "white")};
  font-size: 25px;
  border: solid 1px #cccccc;
  min-width: 300px;
  //background: white;
  padding: 20px;
  border-radius: 20px;
  font-family: "NotoSansKR_B", sans-serif;
  cursor: pointer;
`;

export const GroundLeftContentsWrap = styled("div")`
  border: solid 1px #cccccc;
  border-radius: 15px;
  display: flex;
  height: 400px;
  gap: 10px;
  background-color: white;
  box-shadow: rgb(17 17 26 / 10%) 0 4px 16px, rgb(17 17 26 / 5%) 0 8px 32px;
`;
export const GroundRightContentsWrap = styled("div")`
  border: solid 1px #cccccc;
  border-radius: 15px;
  height: calc(100% - 400px);
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  box-shadow: rgb(17 17 26 / 10%) 0 4px 16px, rgb(17 17 26 / 5%) 0 8px 32px;
`;

export const GroundLeftTopContents = styled("div")`
  width: 500px;
  height: 100%;
  margin: 10px;
`;
export const GroundLeftBottomContents = styled("div")`
  width: calc(100% - 500px);
  height: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  margin-right: 40px;
`;

export const GroundLeftTopContentsTitle = styled("div")`
  font-family: "NotoSansKR_B";
  margin-left: 50px;
  height: 70px;
  font-size: 40px;
`;

export const GroundLeftTopContentsButtons = styled("div")`
  font-size: 40px;
  height: calc(100% - 70px);
  width: 100%;
  padding: 50px;
`;
export const CarryingUpButton = styled("button")`
  font-size: 50px;
  font-family: "NotoSansKR_B";
  height: 100%;
  width: 100%;
  background: #555555;
  border: solid 1px white;
  color: white;
  border-radius: 20px;
  cursor: pointer;
`;
export const CarryingDownButton = styled("button")`
  color: white;
  font-size: 50px;
  font-family: "NotoSansKR_B";
  height: 100%;
  width: 100%;
  background: #1491ce;
  border: solid 1px white;
  border-radius: 20px;
  cursor: pointer;
`;

export const InnerGridWrap = styled("div")`
  height: calc(100% - 70px);
  padding: 0 10px 0 0;
`;
export const ButtonWrap = styled("div")`
  height: 50px;
  margin-top: 5px;
  display: flex;
  width: 100%;
  justify-content: end;
`;

export const InputLot = styled("input")`
  height: 50px;
  width: 320px;
  font-size: 30px;
`;
export const MoveButton = styled("button")`
  height: 200px;
  width: 300px;
  font-size: 50px;
  font-family: "NotoSansKR_B";
  border-radius: 15px;
  background: #1491ce;
  border: solid 1px white;
  color: white;
  cursor: pointer;
`;
export const GroundRightContentsTitle = styled("div")`
  font-size: 50px;
`;
export const GroundRightContentsTitleInputWrap = styled("div")`
  display: flex;
  align-items: center;
  gap: 50px;
`;

export const GroundRightContentsInputBoxWrap = styled("div")`
  display: flex;
  width: 500px;
  align-items: center;
  justify-content: space-between;
`;
export const InputLotTitle = styled("div")`
  font-size: 40px;
  font-family: "NotoSansKR_B", sans-serif;
`;
export const DeleteButton = styled("button")`
  background: #1491ce;
  border: solid 1px white;
  color: white;
  height: 90%;
  width: 100px;
  border-radius: 10px;
  font-family: "NotoSansKR_B";
  cursor: pointer;
`;
export const CommonGridWrap = styled("div")`
  height: 100%;
  border: solid 1px #cccccc;
  padding: 10px;
  border-radius: 10px;
`;
export const TotalWeight = styled("div")`
  height: 30px;
  width: 100%;
  font-family: "NotoSansKR_B";
  text-align: center;
  color: black;
  font-size: 20px;
`;

export const GroundRightContentsInputBoxTitleWrap = styled("div")`
  font-family: "NotoSansKR_B";
  margin-left: 120px;
  height: 70px;
  font-size: 40px;
  width: 100%;
`;
export const GroundRightContentsInputBoxContentsWrap = styled("div")`
  display: flex;
  gap: 10px;
`;
export const ArrowStyle = styled("div")`
  position: absolute;
  top: -60px;
  left: 45%;
  font-size: 80px;
`;

export const BottomLeftWeightContentTitleWrap = styled("div")`
  font-family: "NotoSansKR_B";
  margin-left: 50px;
  height: 70px;
  font-size: 40px;
`;

export const BottomLeftWeightContentWeightButtonWrap = styled("div")`
  height: 170px;
  width: 100%;
  //padding: 10px;
`;

export const BottomLeftWeightContentWeightLotWrap = styled("div")`
  font-family: "NotoSansKR_B";
  width: 100%;
  height: 70px;
  font-size: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const BottomLeftWeightContentWeightMeasureWrap = styled("div")`
  font-family: "NotoSansKR_B";
  width: 100%;
  height: 70px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const BottomLeftWeightContentWeightMoveWrap = styled("div")`
  margin-bottom: 10px;
`;

export const MoveButtonWeight = styled("button")`
  height: 200px;
  font-size: 50px;
  font-family: "NotoSansKR_B";
  border-radius: 15px;
  background: #1491ce;
  border: solid 1px white;
  color: white;
  cursor: pointer;
  align-items: center;
`;

export const InputWeightLeftLot = styled("input")`
  height: 50px;
  font-size: 30px;
`;
export const InputWeightLeft = styled("input")`
  height: 100px;
  width: 150px;
  font-size: 30px;
`;

export const BottomMiddleWeightTitle = styled("div")`
  font-family: "NotoSansKR_B";
  margin-left: 50px;
  height: 70px;
  font-size: 40px;
`;

export const BottomMiddleWeightContentWeightButtonWrap = styled("div")`
  height: 170px;
  margin-top: 20px;
  padding: 0 20px;
`;

export const BottomMiddleWeightContentWeightGridWrap = styled("div")`
  height: 430px;
  padding: 10px 30px 10px 50px;
`;

export const WeightButton = styled("button")`
  background: #1491ce;
  border: solid 1px white;
  color: white;
  height: 100%;
  width: 200px;
  border-radius: 10px;
  font-family: "NotoSansKR_B";
  cursor: pointer;
  font-size: 30px;
`;
