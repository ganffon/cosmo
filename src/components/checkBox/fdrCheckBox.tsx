import { useEffect, useState } from "react";
import * as S from "./fdrCheckBox.styled";
import { TDispatchAction } from "types";

interface OwnProps {
  id: string;
  label: string;
  value?: Object;
  disabled?: boolean;
  defaultCheckedIndex?: number[];
  dispatchType?: string;
  dispatch: React.Dispatch<TDispatchAction>;
  onSearch: (usingTheSnackBar: boolean) => void;
}

export const FdrCheckBox = (props: OwnProps) => {
  const { id, label, dispatch, dispatchType, disabled, defaultCheckedIndex, value, onSearch } = props;

  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      onSearch(true);
    }
  };

  const valueKeys = Object.keys(value ?? {});
  const valueValues = Object.values(value ?? {});

  const [checkedItems, setCheckedItems] = useState<any[]>([]);

  const handleCheckboxChange = (e: any) => {
    const value = e.target.value;

    if (e.target.checked) {
      setCheckedItems((prev) => [...prev, value]);
    } else {
      setCheckedItems((prev) => prev.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    dispatch({ type: dispatchType ?? "update", id: id, value: checkedItems });
  }, [checkedItems, dispatch, dispatchType, id]);

  return (
    <S.FdrCheckBox>
      <S.CheckBoxLabel>{label}</S.CheckBoxLabel>
      {valueKeys.map((value, index) => {
        return (
          <S.CheckBoxWrap key={`${id}${index}`}>
            <S.CheckBox
              type={"checkbox"}
              id={`${id}${index}`}
              name={id}
              value={valueKeys[index]}
              defaultChecked={defaultCheckedIndex && defaultCheckedIndex.includes(index)} // 초기 선택 값
              disabled={disabled ?? false}
              onChange={handleCheckboxChange}
              onKeyDown={onKeyDown}
            />
            <S.CheckBoxText htmlFor={`${id}${index}`}>{valueValues[index]}</S.CheckBoxText>
          </S.CheckBoxWrap>
        );
      })}
    </S.FdrCheckBox>
  );
};
