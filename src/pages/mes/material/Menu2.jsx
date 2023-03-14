// import React from "react";
// // ⬇️ reference of page
// import SearchBar from "components/searchbar/SearchBarBox";
// import GridSingle from "components/grid/GridSingleSearch";

// const data = [
//   {
//     id: 1,
//     name: "EditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditorEditor",
//     name1:
//       "test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test ",
//   },
//   { id: 2, name: "Grid" },
//   { id: 3, name: "Chart" },
//   { id: 4, name: "Editor" },
//   { id: 5, name: "Grid" },
//   { id: 6, name: "Chart" },
//   { id: 7, name: "Editor" },
//   { id: 8, name: "Grid" },
//   { id: 9, name: "Chart" },
// ];

// const columns = [
//   { name: "id", header: "ID", width: "80", sortable: true },
//   {
//     name: "name",
//     header: "Name",
//     whiteSpace: "pre-line",
//     width: "250",
//     minWidth: "200",
//     require: true,
//     editor: "text",
//     sortable: true,
//     rowSpan: true,
//   },
//   {
//     name: "name1",
//     header: "Name1",
//     whiteSpace: "pre-line",
//     width: "250",
//     minWidth: "200",
//     editor: "text",
//     sortable: true,
//   },
//   { name: "name2", header: "Name2", width: "250", minWidth: "200" },
//   { name: "name3", header: "Name3", width: "250", minWidth: "200" },
//   { name: "name4", header: "Name4", width: "250", minWidth: "200" },
//   { name: "name5", header: "Name5", width: "250", minWidth: "200" },
//   { name: "name6", header: "Name6", width: "250", minWidth: "200" },
//   { name: "name7", header: "Name7", width: "250", minWidth: "200" },
//   { name: "name8", header: "Name8", width: "250", minWidth: "200" },
//   { name: "name9", header: "Name9", width: "250", minWidth: "200" },
//   { name: "name11", header: "Name11", width: "250", minWidth: "200" },
//   { name: "name12", header: "Name12", width: "250", minWidth: "200" },
//   { name: "name10", header: "Name10", width: "250", minWidth: "200" },
//   { name: "name13", header: "Name13", width: "250", minWidth: "200" },
//   { name: "name14", header: "Name14", width: "250", minWidth: "200" },
//   { name: "name15", header: "Name15", width: "250", minWidth: "200" },
//   { name: "name16", header: "Name16", width: "250", minWidth: "200" },
//   { name: "name17", header: "Name17", width: "250", minWidth: "200" },
//   { name: "name18", header: "Name18", width: "250", minWidth: "200" },
// ];

// const columnOptions = {
//   resizable: true,
//   frozenBorderWidth: 1,
//   frozenCount: 1, // frozenColumn은 여기 값만 수정
// };

// const header = {
//   height: "100",
//   complexColumns: [
//     {
//       header: "ID + Name",
//       name: "parent1",
//       childNames: ["id", "name"],
//     },
//   ],
// };

// // const header = {};

// function Menu2() {
//   return (
//     <div>
//       <SearchBar
//         input={[
//           {
//             name: "품번",
//             id: "pumbun",
//           },
//           {
//             name: "품명",
//             id: "product_name",
//           },
//           {
//             name: "차종",
//             id: "car",
//           },
//         ]}
//         disNew={true}
//         disDelete={true}
//         disSave={true}
//         disSearch={false}
//       />
//       <GridSingle
//         columns={columns}
//         columnOptions={columnOptions}
//         data={data}
//         header={header}
//       />
//     </div>
//   );
// }

// export { Menu2 };
