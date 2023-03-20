import React, { createContext, createRef, useState, useContext } from "react";
// ⬇️ reference of page
import SearchBarBox from "components/onlySearchSingleGrid/searchbar/SearchBarBox";
import GridSingleSearch from "components/onlySearchSingleGrid/grid/GridSingleSearch";
import LoginStateChk from "pages/login/LoginStateChk";
import { LayoutEvent } from "components/layout/common/Layout";
import BackDrop from "components/backdrop/BackDrop";
import * as S from "./OnlySearchSingleGrid.styled";
import BusinessDepartmentSet from "pages/gridSetting/BusinessDepartmentSet";
import EquipmentSet from "pages/gridSetting/EquipmentSet";
import LineSet from "pages/gridSetting/LineSet";
import ProcessSet from "pages/gridSetting/ProcessSet";
import ProductGbnSet from "pages/gridSetting/ProductGbnSet";
import ProductSet from "pages/gridSetting/ProductSet";
import ProductTypeSet from "pages/gridSetting/ProductTypeSet";
import RoutingSet from "pages/gridSetting/RoutingSet";

export const OnlySearchSingleGridEvent = createContext();

const componentAllocation = (componentName) => {
  let component = "";
  switch (componentName) {
    case "BusinessDepartmentSet":
      component = BusinessDepartmentSet;
      break;
    case "EquipmentSet":
      component = EquipmentSet;
      break;
    case "LineSet":
      component = LineSet;
      break;
    case "ProcessSet":
      component = ProcessSet;
      break;
    case "ProductGbnSet":
      component = ProductGbnSet;
      break;
    case "ProductSet":
      component = ProductSet;
      break;
    case "ProductTypeSet":
      component = ProductTypeSet;
      break;
    case "RoutingSet":
      component = RoutingSet;
      break;
    default:
  }
  return component;
};

function OnlySearchSingleGrid(props) {
  const { componentName } = props;
  LoginStateChk();
  const { isAllScreen } = useContext(LayoutEvent);
  const refSingleGrid = createRef(); //🔸singleGrid 접근 ref
  const [singleGridData, setSingleGridData] = useState(); //🔸singleGridData 받기
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const component = componentAllocation(componentName);

  return (
    <OnlySearchSingleGridEvent.Provider
      value={{
        refSingleGrid,
        singleGridData,
        setSingleGridData,
        isBackDrop,
        setIsBackDrop,
        isEditMode,
        setIsEditMode,
      }}
    >
      <SearchBarBox
        datePickerSet={component().datePickerSet}
        inputSet={component().inputSet}
        componentName={componentName}
        columns={component().columnsModal}
        columnOptions={component().columnOptions}
        header={component().header}
        uri={component().uri}
        btnDisabled={false}
      />
      <S.GridBox isAllScreen={isAllScreen}>
        <GridSingleSearch
          columns={component(isEditMode).columns}
          columnOptions={component().columnOptions}
          rowHeaders={component().rowHeaders}
          header={component().header}
          // data={component.data}
        />
      </S.GridBox>
      <BackDrop isBackDrop={isBackDrop} />
    </OnlySearchSingleGridEvent.Provider>
  );
}

export default OnlySearchSingleGrid;
