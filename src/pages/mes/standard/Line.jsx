import { useContext, useState, useEffect, useRef } from "react";
import { LayoutEvent } from "components/layout/common/Layout";
import ButtonSearch from "components/button/ButtonSearch";
import ButtonEdit from "components/button/ButtonEdit";
import GridModule from "components/grid/GridModule";
import LineSet from "pages/gridSetting/LineSet";
import * as S from "./Line.styled";

function Line() {
  const { isAllScreen, isMenuSlide } = useContext(LayoutEvent);
  const refSingleGrid = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refSingleGrid.current]);

  const onClickNew = () => {};
  const onClickEdit = () => {
    setIsEditMode(true);
  };
  const onClickDelete = () => {};
  const onClickSearch = () => {};
  const onClickSave = () => {
    setIsEditMode(false);
  };
  const onClickExit = () => {
    setIsEditMode(false);
  };

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ButtonWrap>
          {isEditMode ? (
            <ButtonEdit
              onClickSave={onClickSave}
              onClickExit={onClickExit}
              onClickSearch={onClickSearch}
            />
          ) : (
            <ButtonSearch
              onClickNew={onClickNew}
              onClickEdit={onClickEdit}
              onClickDelete={onClickDelete}
              onClickSearch={onClickSearch}
            />
          )}
        </S.ButtonWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.GridWrap>
          <GridModule
            columnOptions={LineSet().columnOptions}
            columns={LineSet(isEditMode).columns}
            rowHeaders={LineSet().rowHeaders}
            header={LineSet().header}
            draggable={false}
            refSingleGrid={refSingleGrid}
          />
        </S.GridWrap>
      </S.ShadowBoxGrid>
      {/* {alertDeleteOpen ? <AlertDelete /> : null} */}
      {isModalOpen ? (
        <InsertModal
          componentName={componentName}
          columns={LineSet().columns}
          columnOptions={LineSet().columnOptions}
          header={LineSet().header}
          uri={LineSet().uri}
          onClickSearch={onClickSearch}
        />
      ) : null}
    </S.ContentsArea>
  );
}

export default Line;
