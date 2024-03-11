import { sheets_v4 } from "googleapis";
import { usePBSSheetData } from "./hooks";
import { formatNumber, renderImage } from "../utils";
import { Fragment, useMemo } from "react";
import Frame from "./Frame";

type Widget = 'all' | 'break' | 'offense' | 'defense';

const Stats = ({ widget }: { widget?: Widget }) => {
  const { numOfSets, rows } = usePBSSheetData();
  const skipRows = useMemo(() => {
    if (widget === 'break') {
      return [3, 6, 7, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    }
    if (widget === 'offense') {
      return [3, 6, 7, 8, 9, 10, 11, 12, 13, 20, 21, 22, 23, 24, 25];
    }
    if (widget === 'defense') {
      return [3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    }
    return [3];
  }, [widget]);

  return (
    <Frame>
      <table>
        <tbody>
          {rows.map((s: sheets_v4.Schema$CellData[], x: number) =>
            <Fragment key={x}>
              {!skipRows.includes(x) &&

                <tr key={x} className={[[0, 5].includes(x) ? 'border-bottom' : '', x === 26 ? 'border-top' : '', [8, 14, 20].includes(x) ? 'bg-grey' : 'bg-black'].filter(i => !!i).join(' ')}>
                  {s?.map((item: sheets_v4.Schema$CellData, y) =>
                    <Fragment key={`${x}${y}`}>
                      {(() => {
                        if (x === 0) {
                          if (y === numOfSets + 1) {
                            return (
                              <td className="widget-title" colSpan={numOfSets * 2 + 3}>
                                {item.formattedValue}
                              </td>
                            )
                          }
                          return null;
                        }
                        if (x === 1 && y === 0) {
                          return (
                            <td colSpan={numOfSets + 1} className="text-right player-name-cell">
                              {item.formattedValue}
                            </td>
                          )
                        }
                        if (x === 1 && y === numOfSets + 2) {
                          return (
                            <td colSpan={numOfSets + 1} className="text-left player-name-cell">
                              {item.formattedValue}
                            </td>
                          )
                        }
                        if (x === 2 && y === numOfSets - 1) {
                          return (
                            <>
                              <td colSpan={numOfSets}></td>
                              <td className="text-center flag">
                                {item.formattedValue && item.formattedValue !== '#N/A' &&
                                  <img src={`https://f005.backblazeb2.com/file/ProBilliardSeries/flags/${item.formattedValue?.replaceAll(' ', '_')}.png`} alt="Flag"/>
                                }
                              </td>
                            </>
                          )
                        }
                        if (x === 2 && y === numOfSets + 2) {
                          return (
                            <>
                              <td className="text-center flag">
                                {item.formattedValue && item.formattedValue !== '#N/A' &&
                                  <img src={`https://f005.backblazeb2.com/file/ProBilliardSeries/flags/${item.formattedValue?.replaceAll(' ', '_')}.png`} alt="Flag"/>
                                }
                              </td>
                              <td colSpan={numOfSets}></td>
                            </>
                          )
                        }
                        if (x === 1 && y === numOfSets + 1) {
                          return <td className="logo" rowSpan={2}>{renderImage(item)}</td>;
                        }
                        if (x === 26) {
                          if (y === 0) {
                            return (
                              <>
                                <td className="p-0 text-left bottom-logo" colSpan={numOfSets + 1}>
                                  <img src="https://f005.backblazeb2.com/file/ProBilliardSeries/toplogo.png" alt="Logo"/>                                
                                </td>
                                <td></td>
                                <td className="p-0 text-right bottom-logo" colSpan={numOfSets + 1}>
                                  <img src="https://f005.backblazeb2.com/file/ProBilliardSeries/toplogoreverse.png" alt="Logo"/>
                                </td>
                              </>
                            )
                          }
                          return null;
                        }
                        if (![1,2].includes(x)) {
                          return (
                            <td className={[
                              x >= 6 && y === numOfSets + 1 && ![8, 14, 20].includes(x) ? "text-yellow no-wrap label-cell" : "number-cell",
                            ].filter(i => !!i).join(' ')}>
                              {formatNumber(item.formattedValue || '')}
                            </td>
                          )
                        }

                      })()}
                    </Fragment>
                  )}
                </tr>
              }
            </Fragment>
          )}

        </tbody>
      </table>
    </Frame>
  );
}

export default Stats;