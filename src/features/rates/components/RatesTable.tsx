import { ReactElement } from 'react';
import { UnknownObject } from 'types';

export type TableColType = {
  path: string;
  label: string;
  thClassName?: string;
  content?: (row: UnknownObject) => void;
};

export type RatesTablePropType = {
  cols: TableColType[];
  rates: UnknownObject[];
};
export const RatesTable = ({ cols, rates }: RatesTablePropType): ReactElement => {
  return (
    <table className="w-full text-left text-sm text-gray-300">
      <thead className="uppercase text-slate-400">
        <tr className="border-b border-gray-800 ">
          {cols.map((col: TableColType, i: number) => {
            return (
              <th key={i} scope="col" className={`px-4 py-3 ${col?.thClassName ?? ''}`}>
                {col.label}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rates
          .filter((e: UnknownObject) => {
            const now = new Date().getTime();
            return new Date(e.valid_to).getTime() > now;
          })
          .sort((a: UnknownObject, b: UnknownObject) => {
            return new Date(a.valid_from).getTime() - new Date(b.valid_from).getTime();
          })
          .map((row: UnknownObject, i: number) => {
            return (
              <tr key={i} className="border-b border-gray-800 ">
                {cols.map((col: TableColType, i: number) => {
                  return (
                    <td key={i} className="px-4 py-3">
                      {col?.content && typeof col.content === 'function' ? col.content(row) : row[col.path]}
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