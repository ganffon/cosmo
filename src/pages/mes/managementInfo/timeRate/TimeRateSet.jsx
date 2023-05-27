import React from "react";


export const getColTest = () => [
    { header: '생산일자', name: 'create_at' },
  
    { header: '조업시간', name: 'e1_work' },
    { header: '계획정지시간', name: 'e1_pTime' },
    { header: '비계획정지시간', name: 'e1_nTime' },
    { header: '시간가동률', name: 'e1_Oper' },
  
    { header: '조업시간', name: 'e2_work' },
    { header: '계획정지시간', name: 'e2_pTime' },
    { header: '비계획정지시간', name: 'e2_nTime' },
    { header: '시간가동률', name: 'e2_Oper' },
  
    { header: '조업시간', name: 'e3_work' },
    { header: '계획정지시간', name: 'e3_pTime' },
    { header: '비계획정지시간', name: 'e3_nTime' },
    { header: '시간가동률', name: 'e3_Oper' },
  
    { header: '합계', name: 'total' },
  ];
  
  export const getTimeHeader = () => ({
    complexColumns: [
      {
        header: 'E1',
        name: 'E1',
        childNames: ['e1_work', 'e1_pTime', 'e1_nTime', 'e1_Oper'],
      },
      {
        header: 'E2',
        name: 'E2',
        childNames: ['e2_work', 'e2_pTime', 'e2_nTime', 'e2_Oper'],
      },
      {
        header: 'E3',
        name: 'E3',
        childNames: ['e3_work', 'e3_pTime', 'e3_nTime', 'e3_Oper'],
      },
    ],
    height: '60px',
  });
  
  export const getData = (tmpStr) => {
    const tmpRows = [];
    tmpStr.data.rows.map((row) => {
        
        const createAt = new Date(row.create_at);
        let formattedCreateAt = `${createAt.getFullYear()}-${(createAt.getMonth() + 1).toString().padStart(2, '0')}-${createAt.getDate().toString().padStart(2, '0')}`;
        if (isNaN(createAt.getTime())) {
          formattedCreateAt = "TOTAL";
        }
      
      const rowData = {
        create_at: formattedCreateAt,
        e1_work: row.e1_work,
        e1_pTime: row.e1_pTime,
        e1_nTime: row.e1_nTime,
        e1_Oper: row.e1_Oper,
        e2_work: row.e2_work,
        e2_pTime: row.e2_pTime,
        e2_nTime: row.e2_nTime,
        e2_Oper: row.e2_Oper,
        e3_work: row.e3_work,
        e3_pTime: row.e3_pTime,
        e3_nTime: row.e3_nTime,
        e3_Oper: row.e3_Oper,
        total: row.total,
      };
  
      tmpRows.push(rowData);
      return rowData;
    });
    
    return tmpRows;
  };
  
  
  