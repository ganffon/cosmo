import * as React from "react";
import * as S from "./Chips.styled";

export default function Chips(props) {
  const { height = null, width = null, isLock } = props;
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
    { key: 5, label: "Vue.js" },
    { key: 6, label: "Vuesdfsdfsdfsd.js" },
    { key: 7, label: "Vue.js" },
    { key: 8, label: "Vue.js" },
    { key: 9, label: "Vue.js" },
    { key: 10, label: "Vue.js" },
    { key: 11, label: "Vuesdfsdfsdfsd.js" },
    { key: 12, label: "Vue.js" },
    { key: 13, label: "Vue.js" },
    { key: 14, label: "Vue.js" },
    { key: 15, label: "Vue.js" },
    { key: 16, label: "Vuesdfsdfsdfsd.js" },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <S.ChipsPaper height={height} width={width}>
      {chipData.map((data) => {
        return (
          <S.ChipWrap key={data.key}>
            <S.ChipItem label={data.label} onDelete={isLock ? undefined : handleDelete(data)} />
          </S.ChipWrap>
        );
      })}
    </S.ChipsPaper>
  );
}
