import { sheets_v4 } from "googleapis";

export const renderImage = (item: sheets_v4.Schema$CellData) => {
  const match = item.userEnteredValue?.formulaValue?.match(/IMAGE\(['"](.+)['"],\d+,(\d+),(\d+)\)/);
  if (match) {
    return (
      <img src={match[1]} width={match[3]} height={match[2]} alt="any"/>
    )
  }
  return null;
}

export const formatNumber = (s: string) => {
  const match =  s.match(/^(\d+\.\d)\d+$/);
  return match ? match[1] : s;
}