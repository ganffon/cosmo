import * as React from "react";
import * as S from "./Chips.styled";
import restAPI from "api/restAPI";
import NoticeAlertModal from "components/alert/NoticeAlertModal";

export default function Chips(props) {
  const {
    height = null,
    width = null,
    isLock,
    chipData = [],
    setChipData = () => {},
    deleteURI = "",
    deleteKey = "",
    setIsBackDrop = () => {},
    isSnackOpen,
    setIsSnackOpen = () => {},
  } = props;

  // const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState(false);

  const handleDelete = async (chipToDelete) => {
    try {
      setIsBackDrop(true);
      const data = [{ [deleteKey]: chipToDelete.key }];
      await restAPI.delete(deleteURI, { data });

      setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    } finally {
      setIsBackDrop(false);
    }
  };

  return (
    <S.ChipsPaper height={height} width={width}>
      {chipData.map((data) => {
        return (
          <S.ChipWrap key={data.key}>
            <S.ChipItem label={data.label} onDelete={isLock ? undefined : () => handleDelete(data)} />
            {/* <S.ChipItem label={data.label} onDelete={isLock ? undefined : () => setIsDeleteAlertOpen(true)} /> */}
          </S.ChipWrap>
        );
      })}
      {/* {isDeleteAlertOpen && (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          onDelete={() => handleDelete(data)}
          onCancel={() => {
            setIsDeleteAlertOpen(false);
          }}
        />
      )} */}
    </S.ChipsPaper>
  );
}
