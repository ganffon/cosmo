import React, { useContext } from "react";
import { LayoutEvent } from "components/layout/common/Layout";

const Dashboard = () => {
  const { isAllScreen } = useContext(LayoutEvent);
  return <div>{`isAllScreen: ${isAllScreen}`}</div>;
};

export default Dashboard;
