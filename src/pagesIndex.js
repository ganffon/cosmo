/**
 * ✨ pages 내 index.js 자동 생성해주는 기능입니다.
 *
 * 🟩 사용방법
 *
 *      CMD에서 pagesIndex.js 가 위치한 경로로 이동
 *
 *      node pagesIndex.js
 *
 *      명령어를 실행하면 index.js 파일이 생성되거나 내용이 갱신됩니다.
 *
 * 🟥 주의사항
 *
 *      *.jsx 파일을 실제 페이지로 인식하도록 구현 되었기에
 *      Router에서 사용되는 Component 페이지를 제외한 다른 페이지의 확장자는
 *      모두 *.js 로 작성해야합니다.
 */

const fs = require("fs");
const path = require("path");

function generateExports(dirPath) {
  const files = fs.readdirSync(dirPath);
  const exportStatements = [];

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const isDirectory = fs.statSync(fullPath).isDirectory();

    if (isDirectory) {
      const subDirExportStatements = generateExports(fullPath);
      if (subDirExportStatements.length > 0) {
        const subDirIndexPath = path.join(fullPath, "index.js");
        const subDirIndexContent = subDirExportStatements.join("\n");
        fs.writeFileSync(subDirIndexPath, subDirIndexContent);

        exportStatements.push(`export * from './${file}';`);
      }
    } else if (file.endsWith(".jsx")) {
      const fileName = path.basename(file, ".jsx");
      exportStatements.push(`export * from './${fileName}.jsx';`);
    }
  }

  return exportStatements;
}

function generateMainIndexFile(pagesPath) {
  const exportStatements = generateExports(pagesPath);
  const indexFilePath = path.join(pagesPath, "index.js");
  const indexFileContent = exportStatements.join("\n");
  fs.writeFileSync(indexFilePath, indexFileContent);
  console.log("index.js file generated successfully.");
}

const pagesPath = "./pages"; // pages 폴더 경로
generateMainIndexFile(pagesPath);

// const fs = require("fs");
// const path = require("path");

// function indexExport(dirPath) {
//   const files = fs.readdirSync(dirPath);
//   const exportStatements = [];
//   let hasSubdirectories = false; // 하위 디렉토리의 존재 여부를 추적하기 위한 변수
//   const tempData = [];
//   for (const file of files) {
//     const fullPath = path.join(dirPath, file);
//     const isDirectory = fs.statSync(fullPath).isDirectory();

//     if (isDirectory) {
//       const subDirExportStatements = indexExport(fullPath);

//       if (subDirExportStatements.length > 0) {
//         hasSubdirectories = true;
//         const subDirIndexPath = path.join(dirPath, "index.js");
//         const subDirIndexContent = subDirExportStatements.join("\n");
//         tempData.push(subDirIndexContent);
//         exportStatements.push(`export * from './${file}';`);
//         if (hasSubdirectories) {
//           if (subDirIndexPath.includes("mes\\index")) {
//             fs.writeFileSync(subDirIndexPath, exportStatements.join("\n"));
//           } else {
//             fs.writeFileSync(subDirIndexPath, tempData.join("\n"));
//           }
//         }
//       }
//     } else if (file.endsWith(".jsx")) {
//       const fileName = path.basename(file, ".jsx");
//       const fileDirName = path.basename(dirPath); // 파일이 위치한 디렉토리 이름
//       exportStatements.push(`export * from './${fileDirName}/${fileName}.jsx';`);
//     }
//   }

//   return exportStatements;
// }

// function mainIndexFile(pagesPath) {
//   const exportStatements = indexExport(pagesPath);
//   const indexFilePath = path.join(pagesPath, "index.js");
//   const indexFileContent = exportStatements.join("\n");
//   fs.writeFileSync(indexFilePath, indexFileContent);
//   console.log("index.js file generated successfully.");
// }

// const pagesPath = "./pages"; // pages 폴더 경로
// mainIndexFile(pagesPath);
