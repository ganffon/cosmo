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
 *
 *      Router에서 사용되는 Component 페이지를 제외한 다른 페이지의 확장자는
 *
 *      모두 *.js 로 작성해야합니다.
 *
 * 🟦 참고
 *
 *      하위 폴더에 존재하는 index.js 파일을 한번에 지우고 싶은 경우
 *
 *      CMD 에서 pages 폴더 경로로 이동
 *
 *      Get-ChildItem -Recurse -Filter "index.js" | Remove-Item -Force
 *
 *      명령어 치면 pages 폴더 내에 존재하는 모든 index.js 파일이 지워짐
 */

const fs = require("fs");
const path = require("path");
const last = [];
function generateExports(dirPath) {
  const files = fs.readdirSync(dirPath);
  const exportStatements = [];

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const isDirectory = fs.statSync(fullPath).isDirectory();

    if (isDirectory) {
      const subDirExportStatements = generateExports(fullPath);
      if (subDirExportStatements.length > 0) {
        exportStatements.push(`export * from './${file}';`);
      }
    } else if (file.endsWith(".jsx")) {
      const fileName = path.basename(file, ".jsx");
      const fileDirName = path.basename(dirPath); // 파일이 위치한 디렉토리 이름
      exportStatements.push(`export * from './${fileDirName}/${fileName}.jsx';`);
      const tmpdirPath = dirPath.replace("pages\\", "./").replaceAll("\\", "/");
      last.push(`export * from '${tmpdirPath}/${file}';`);
    }
  }

  return exportStatements;
}

function generateMainIndexFile(pagesPath) {
  generateExports(pagesPath);
  const indexFilePath = path.join(pagesPath, "index.js");
  fs.writeFileSync(indexFilePath, last.join("\n"));
  console.log("🟩　index.js 파일 생성 및 갱신 성공!");
}

const pagesPath = "./pages"; // pages 폴더 경로
generateMainIndexFile(pagesPath);
