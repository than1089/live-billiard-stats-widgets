import { useEffect, useState } from "react";
import { socket } from "../socket";
import Frame from "./Frame";
import { sheets_v4 } from "googleapis";

const FirstShot = () => {
  const [rows, setRows] = useState<sheets_v4.Schema$RowData[]>([]);
  useEffect(() => {
    socket.on('sheet1-update', (sheet: sheets_v4.Schema$Sheet) => {
      setRows(sheet!.data![0].rowData?.slice(11, 15) || [])
    });
    return () => {
      socket.off('sheet1-update');
    }
  }, []);
  return (
    <>
      <Frame>
        {rows.length >= 4 &&
          <table>
            <thead>
              <tr className="title-row">
                <th colSpan={6}>{rows[0]?.values![10].formattedValue}</th>
              </tr>
              <tr className="heading-row">
                {rows[1]?.values?.slice(11, 17).map((h: sheets_v4.Schema$CellData, index: number) =>
                  <th key={index}>
                    {h.formattedValue}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr className="player-1">
                {rows[2].values?.slice(11, 17).map((s: sheets_v4.Schema$CellData, index: number) =>
                  <td key={index}>
                    {index === 0 &&
                      <strong>{s.formattedValue}</strong>
                    }
                    {index !== 0 && 
                      <>
                        {s.formattedValue}
                      </>
                    }
                  </td>
                )}
              </tr>
              <tr className="player-2">
                {rows[3].values?.slice(11, 17).map((s: sheets_v4.Schema$CellData, index: number) =>
                  <td key={index}>
                    {index === 0 &&
                      <strong>{s.formattedValue}</strong>
                    }
                    {index !== 0 && 
                      <>
                        {s.formattedValue}
                      </>
                    }
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        }
      </Frame>
    </>
  );
}

export default FirstShot;