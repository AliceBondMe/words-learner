import { FC } from "react";

import { WordsTableProps } from "./types";
import { Icon } from "../common";

const WordsTable: FC<WordsTableProps> = ({ wordsList }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <div>
                <span>Word</span>
                <Icon name="icon-uk" width={32} height={32} />
              </div>
            </th>
            <th>
              <div>
                <span>Translation</span>
                <Icon name="icon-ukraine" width={32} height={32} />
              </div>
            </th>
            <th>
              <span>Category</span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {wordsList.map(({ _id, en, ua, category }) => (
            <tr key={_id}>
              <td>
                <span>{en}</span>
              </td>
              <td>
                <span>{ua}</span>
              </td>
              <td>
                <span>{category}</span>
              </td>
              <td>
                <button type="button">
                  <span>Add to dictionary</span>
                  <Icon
                    name="icon-arrow-right"
                    width={20}
                    height={20}
                    stroke="var(--text-primary)"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordsTable;

// const WordsTable: FC<WordsTableProps> = ({ wordsList }) => {
//   const [data] = useState(wordsList);
//   const rerender = useReducer(() => ({}), {})[1];

//   const columnHelper = createColumnHelper<Word>();

//   const columns = [
//     columnHelper.accessor("en", {
//       header: () => "Word",
//       cell: (info) => info.renderValue(),
//     }),
//     columnHelper.accessor("ua", {
//       header: () => "Translation",
//       cell: (info) => info.renderValue(),
//     }),
//     columnHelper.accessor("category", {
//       header: () => "Category",
//       cell: (info) => info.renderValue(),
//     }),
//     columnHelper.accessor("add", {
//       header: () => "",
//     }),
//   ];

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div>
//       <table>
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div />
//       <button onClick={() => rerender()}>Rerender</button>
//     </div>
//   );
// };

// export default WordsTable;
