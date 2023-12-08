import * as S from "./fdrModal.styled";
import Exit from "../../assets/img/ui/exit.svg";

export const FdrModal = (props) => {
  const { children, modalState, setModal } = props;
  const { width = "1000px", height = "500px", position = "top", title = "" } = modalState;
  return (
    <S.Overlay>
      <S.Inner $width={width} $height={height} $position={position}>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.Exit src={Exit} onClick={() => setModal({ open: false })} />
        </S.Header>
        <S.Main>{children}</S.Main>
      </S.Inner>
    </S.Overlay>
  );
};
