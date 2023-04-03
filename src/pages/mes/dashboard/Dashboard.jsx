import React, { useContext } from "react";
import { LayoutContext } from "components/layout/common/Layout";

const Dashboard = () => {
  const { isAllScreen } = useContext(LayoutContext);
  return <div>{`isAllScreen: ${isAllScreen}`}</div>;
};

export default Dashboard;
