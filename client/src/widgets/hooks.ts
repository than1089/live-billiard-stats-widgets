import { sheets_v4 } from "googleapis";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useParams } from "react-router-dom";

export type WidgetData = {
  [key in 'overall' | 'break' | 'offense' | 'defense' | 'score' | 'label']?:
  {
    label: string;
    player1Data: string[];
    player2Data: string[];
  }
}
& 
{
  [key in 'player1' | 'player2']:
  {
    name: string;
    flag?: string;
  }
}
&
{
  title: string;
  numberOfSets: number;
  totalScore: string;
  logo?: {
    src: string;
    width: number;
    height: number;
  }
};

export const usePBSSheetData = () => {
  const [rows, setRows] = useState<sheets_v4.Schema$CellData[][]>([]);
  const [numOfSets, setNumOfSets] = useState(5);
  const params = useParams();
  
  useEffect(() => {
    if (params.table) {
      socket.emit('connectToTable', params.table);
    }
  }, [params]);

  useEffect(() => {
    socket.on('PBS_MAIN_PAGE-UPDATE', (sheet: sheets_v4.Schema$Sheet) => {
      const rowsData = sheet!.data![0].rowData || [];
      const numOfSets = getNumberOfSets(rowsData);
      setNumOfSets(numOfSets);

      rowsData.pop();
      setRows(rowsData.map((row, index) => {
        if (index === 1) {
          return row.values ? [row.values[0], ...row.values?.slice(5-numOfSets + 1, 8 + numOfSets)] : [];
        }
        if (index < 26) {
          return row.values ? row.values?.slice(5-numOfSets, 8 + numOfSets) : [];
        }
        return row.values || [];
      }));
    });
    return () => {
      socket.off('PBS_MAIN_PAGE-UPDATE');
    }
  }, []);

  return {
    numOfSets,
    rows
  }
}

const getNumberOfSets = (rowsData: sheets_v4.Schema$RowData[]): number => {
  let numOfSets = 5;
  if (!rowsData[4]?.values![0]?.formattedValue) {
    numOfSets --;
  }
  if (!rowsData[4]?.values![1]?.formattedValue) {
    numOfSets --;
  }
  if (!rowsData[4]?.values![2]?.formattedValue) {
    numOfSets --;
  }
  return numOfSets;
}

// const getWidgetData = (rowsData: sheets_v4.Schema$RowData[]) => {
//   const numberOfSets = getNumberOfSets(rowsData);
//   const logoMatch = rowsData[1].values![6].userEnteredValue?.formulaValue?.match(/IMAGE\(['"](.+)['"],\d+,(\d+),(\d+)\)/);
//   const widgetdata: WidgetData = {
//     title: rowsData[0].values![6]?.formattedValue || '',
//     numberOfSets,
//     totalScore: rowsData[4].values![6]?.formattedValue || '',
//     player1: {
//       name: rowsData[1].values![0]?.formattedValue || ''
//     },
//     player2: {
//       name: rowsData[1].values![7]?.formattedValue || ''
//     },
//     logo: logoMatch ? {src: logoMatch[1], width: Number(logoMatch[3]), height: Number(logoMatch[2])} : undefined,
//     overall: {
//       label: '',
//       player1Data: [],
//       player2Data: []
//     }
//   }
// }