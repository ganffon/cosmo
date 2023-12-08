import * as S from "./contents.styled";

export const Contents = ({ children, ...props }) => {
  const { hidden, flexColumn } = props;

  return (
    <S.ContentsHidden>
      <S.ContentsFlex $hidden={hidden ?? false} $flexColumn={flexColumn ?? true}>
        {children}
      </S.ContentsFlex>
    </S.ContentsHidden>
  );
};
