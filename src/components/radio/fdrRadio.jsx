import { useEffect } from "react";

import * as S from "./fdrRadio.styled";

export const FdrRadio = (props) => {
  const { id, label, dispatch, dispatchType, disabled, defaultCheckedIndex, value, onSearch } = props;

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(true);
    }
  };

  const valueKeys = Object.keys(value ?? {});
  const valueValues = Object.values(value ?? {});

  useEffect(() => {
    dispatch({
      type: dispatchType ?? "update",
      id: id,
      value: valueKeys[defaultCheckedIndex ?? 0],
    });
  }, []);

  return (
    <S.FdrRadio>
      <S.RadioLabel>{label}</S.RadioLabel>
      {valueKeys.map((value, index) => {
        return (
          <S.RadioWrap key={`${id}${index}`}>
            <S.Radio
              type={"radio"}
              id={`${id}${index}`}
              name={id}
              value={valueKeys[index]}
              defaultChecked={valueKeys[index] === valueKeys[defaultCheckedIndex ?? 0]} // 초기 선택 값
              disabled={disabled ?? false}
              onChange={(e) =>
                dispatch({
                  type: dispatchType ?? "update",
                  id: id,
                  value: e.target.value,
                })
              }
              onKeyDown={onKeyDown}
            />
            <S.RadioText htmlFor={`${id}${index}`}>{valueValues[index]}</S.RadioText>
          </S.RadioWrap>
        );
      })}
    </S.FdrRadio>
  );
};
