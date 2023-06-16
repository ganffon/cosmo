import React, { useState, useEffect } from 'react';
import EquipStatus from 'pages/mes/managementInfo/EquipStatus/EquipStatus';
import TempView from 'pages/mes/managementInfo/TempView/TempView';
import MonthlyLineCapa from "pages/mes/managementInfo/monthlyLineCapa/MonthlyLineCapa";
import DailyLineCapa from "pages/mes/managementInfo/dailyLineCapa/DailyLineCapa";
import MonthlyPartCapa from "pages/mes/managementInfo/monthlyPartCapa/MonthlyPartCapa";
import MonthlyTempHumidChart from "pages/mes/managementInfo/monthlyTempHumidChart/MonthlyTempHumidChart";
import Dashboard from 'pages/mes/dashboard/Dashboard';

const ManagementAll = ({ interval}) => {
  const [pages, setPages] =
   useState([
              <Dashboard/>, 
              <EquipStatus toggle={false}/>, 
              <MonthlyLineCapa toggle={false}/>, 
              <DailyLineCapa toggle={false}/>, 
              <MonthlyPartCapa toggle={false}/>, 
              <TempView />, 
              <MonthlyTempHumidChart toggle={false}/>, 
            ]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPageIndex((prevIndex) => (prevIndex + 1) % pages.length);
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [pages.length, interval]);

  return (
    <>
      {pages[currentPageIndex]}
    </>
  );
};

export default ManagementAll;
