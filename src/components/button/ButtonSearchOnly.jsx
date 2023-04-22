import SearchIcon from "@mui/icons-material/Search";

import * as S from "./Button.styled";

function ButtonSearchOnly(props) {
  const { onClickSearch = () => {} } = props;
  return (
    <>
      <S.ButtonSet
        variant="contained"
        size="small"
        startIcon={<SearchIcon />}
        disabled={false}
        onClick={onClickSearch}
      >
        SEARCH
      </S.ButtonSet>
    </>
  );
}

export default ButtonSearchOnly;
