import React, { useEffect, useState } from "react";

 
export default function GetTestValAndCreateAt(data,val,val1,val2,val3,val4,val5,val6) {
    const result = [];
    for (let i = 0; i < data.data.rows.length; i++) {
        const tmpDate = new Date(data.data.rows[i][val])
        const year = tmpDate.getFullYear();
        const month = tmpDate.getMonth() + 1;
        //const day = date.getDate().toString().padStart(2, '0');

        const dateString = year + '-' + (month < 10 ? '0' : '') + month; // 년-월
        //const dateString = year + '-' + month + '-' + day; // 년-월-일
        result.push({
            create_at: dateString,//data.data.rows[i][val2],
            testVal1: data.data.rows[i][val1],
            testVal2:data.data.rows[i][val2],
            testVal3:data.data.rows[i][val3],
            goal1:data.data.rows[i][val4],
            goal2:data.data.rows[i][val5],
            goal3:data.data.rows[i][val6]
          });
    }

    result.sort((a, b) => {
        const aDate = new Date(a.create_at);
        const bDate = new Date(b.create_at);
        return aDate.getTime() - bDate.getTime();
      });

    return result;
}

export function GetTestValAndCreateAtDay(data,val,val1,val2,val3,val4,val5,val6) {
    const result = [];
    for (let i = 0; i < data.data.rows.length; i++) {
        const tmpDate = new Date(data.data.rows[i][val])
        const year = tmpDate.getFullYear();
        const month = tmpDate.getMonth() + 1;
        const day = tmpDate.getDate().toString().padStart(2, '0');

        // const dateString = year + '-' + (month < 10 ? '0' : '') + month; // 년-월
        const dateString = year + '-' + month + '-' + day; // 년-월-일
        result.push({
            create_at: dateString,//data.data.rows[i][val2],
            testVal1: data.data.rows[i][val1],
            testVal2:data.data.rows[i][val2],
            testVal3:data.data.rows[i][val3],
            goal1:data.data.rows[i][val4],
            goal2:data.data.rows[i][val5],
            goal3:data.data.rows[i][val6]
          });
    }

    result.sort((a, b) => {
        const aDate = new Date(a.create_at);
        const bDate = new Date(b.create_at);
        return aDate.getTime() - bDate.getTime();
      });

    return result;
}

export function GetTestValAndCreateAtString(data,val,val1,val2,val3,val4,val5,val6) {
    const result = [];
    for (let i = 0; i < data.data.rows.length; i++) {
        result.push({
            create_at: data.data.rows[i][val],
            testVal1: data.data.rows[i][val1],
            testVal2:data.data.rows[i][val2],
            testVal3:data.data.rows[i][val3],
            goal1:data.data.rows[i][val4],
            goal2:data.data.rows[i][val5],
            goal3:data.data.rows[i][val6]
          });
    }

    return result;
}

export function GetDateMonth(data,endDate) {
  const result = [];
  for (let i = 0; i < 12; i++) {
      result.push({
          create_at: (i+1) + '월',
          testVal1:data.data.rows[0]['month'+(i+1)],
          testVal2:data.data.rows[1]['month'+(i+1)],
          testVal3:data.data.rows[2]['month'+(i+1)],
          goal1:data.data.rows[0]['goal'+(i+1)],
          goal2:data.data.rows[1]['goal'+(i+1)],
          goal3:data.data.rows[2]['goal'+(i+1)],
        });
  }

  return result;
}

export function GetDateDay(data,endDate) {
  const result = [];
  console.log(data)
  console.log(endDate)
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 11);
  let currentDate = new Date(startDate);
  for (let i = 0; i < 12; i++) {
    const formattedDate = currentDate.toISOString().split('T')[0];
      result.push({
          create_at: formattedDate,
          testVal1:data.data.rows[0]['day'+(i+1)],
          testVal2:data.data.rows[1]['day'+(i+1)],
          testVal3:data.data.rows[2]['day'+(i+1)],
          goal1:data.data.rows[0]['goal'+(i+1)],
          goal2:data.data.rows[1]['goal'+(i+1)],
          goal3:data.data.rows[2]['goal'+(i+1)],
        });
        currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}

export function GetTimeRate(data,val,val1,val2,val3,val4) {
  const result = [];
  for (let i = 0; i < data.data.rows.length; i++) {
      const tmpDate = new Date(data.data.rows[i][val])
      
      const year = tmpDate.getFullYear();
      const month = (tmpDate.getMonth() + 1).toString().padStart(2, '0');
      const day = tmpDate.getDate().toString().padStart(2, '0');

      // const dateString = year + '-' + (month < 10 ? '0' : '') + month; // 년-월
      const dateString = year + '-' + month + '-' + day; // 년-월-일
      result.push({
          create_at: (dateString.includes('NaN')) ? "ToTal" : dateString,
          // create_at: dateString,//data.data.rows[i][val2],
          testVal1: data.data.rows[i][val1],
          testVal2:data.data.rows[i][val2],
          testVal3:data.data.rows[i][val3],
          testVal4:data.data.rows[i][val4],
        });
  }

  result.sort((a, b) => {
      const aDate = new Date(a.create_at);
      const bDate = new Date(b.create_at);
      return aDate.getTime() - bDate.getTime();
    });

  return result;
}