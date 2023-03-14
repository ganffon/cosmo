import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// ⬇️ reference of page
import Layout from "components/layout/common/Layout";
import OnlySearchSingleGrid from "components/onlySearchSingleGrid/OnlySearchSingleGrid";
import Dashboard from "pages/mes/dashboard/Dashboard";
// import * as Pages from "pages";
import RealMenuList from "components/layout/datas/RealMenuList.json";
// import NotFound from "pages/notfound/NotFound";
import InspectionStandardManagement from "pages/mes/standard/InspectionStandardManagement";

export default function MainRouter() {
  const [realMenuList, setRealMenuList] = useState([]);
  useEffect(() => {
    setRealMenuList(RealMenuList);
  }, []);
  // const routeList = useMemo(() => {
  //   const result = realMenuList.map((menu) => {
  //     const result = { ...menu };
  //     // console.log(`menu.componentName: ${menu.componentName}`);
  //     const component = Pages[menu.componentName];
  //     // console.log(`component: ${component}`);
  //     if (component) {
  //       result.component = Pages[menu.componentName]();
  //       // console.log(result.component);
  //     }
  //     return result;
  //   });
  //   return result;
  // }, [realMenuList]);

  // if (realMenuList.length === 0) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Layout>
      <Routes>
        <Route path="" element={<Dashboard />} />
        {realMenuList.map((menu) => {
          return (
            menu.onlySearch && (
              <Route
                key={menu.id}
                path={menu.path}
                element={
                  <OnlySearchSingleGrid componentName={menu.componentName} />
                }
              />
            )
          );
        })}
        <Route
          path="inspectionstandardmanagement"
          element={<InspectionStandardManagement />}
        />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </Layout>
  );
}
