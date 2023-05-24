import React, { createContext, createRef, useState, useContext } from "react";
// ⬇️ reference of page
import SearchBarBox from "components/onlySearchSingleGrid/searchbar/SearchBarBox";
import GridSingleSearch from "components/onlySearchSingleGrid/grid/GridSingleSearch";
import { LoginStateChk } from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import BackDrop from "components/backdrop/BackDrop";
import * as S from "./OnlySearchSingleGrid.styled";
import FactorySet from "pages/mes/standard/factory/FactorySet";
import EquipmentSet from "pages/mes/standard/equipment/EquipmentSet";
import LineSet from "pages/mes/standard/line/LineSet";
import ProcessSet from "pages/mes/standard/process/ProcessSet";
import ProductGbnSet from "pages/mes/standard/productGbn/ProductGbnSet";
import ProductSet from "pages/mes/standard/product/ProductSet";
import ProductTypeSet from "pages/mes/standard/productType/ProductTypeSet";
import RoutingSet from "pages/gridSetting/RoutingSet";

export const OnlySearchSingleGridContext = createContext();

const componentAllocation = (componentName) => {
  let component = "";
  switch (componentName) {
    case "FactorySet":
      component = FactorySet;
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
  const { isAllScreen } = useContext(LayoutContext);
  const refSingleGrid = createRef(); //🔸singleGrid 접근 ref
  const [singleGridData, setSingleGridData] = useState(); //🔸singleGridData 받기
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const component = componentAllocation(componentName);

  return (
    <OnlySearchSingleGridContext.Provider
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
    </OnlySearchSingleGridContext.Provider>
  );
}

export default OnlySearchSingleGrid;
