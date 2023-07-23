import { ReactElement } from 'react';
import { UnknownObject } from 'types';

export type TableColType = {
  path: string;
  label: string;
  thClassName?: string;
  className?: string;
  content?: (row: UnknownObject, i: number) => void;
};

export type ConsumptionTablePropType = {
  cols: TableColType[];
  data: UnknownObject[];
};
export const ChargerTable = ({ cols, data }: ConsumptionTablePropType): ReactElement => {
  return (
    <table className="w-full text-left text-sm text-gray-300">
      <thead className="uppercase text-slate-400">
        <tr className="border-b border-gray-800 ">
          {cols.map((col: TableColType, i: number) => {
            return (
              <th key={i} scope="col" className={`py-3 ${col?.thClassName ?? ''}`}>
                {col.label}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row: UnknownObject, index: number) => {
          return (
            <tr key={index} className="border-b border-gray-800 ">
              {cols.map((col: TableColType, i: number) => {
                return (
                  <td key={i} className={`py-3 ${col?.className ?? ''}`}>
                    {col?.content && typeof col.content === 'function' ? col.content(row, index) : row[col.path]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
