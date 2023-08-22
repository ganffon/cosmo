/**
 * ✨ Version.js 의 버전 값을 배포내역 중 적용되지 않은 가장 최근 버전으로 변경합니다.
 *
 * 🟩 사용방법
 *
 *      CMD에서 versionUpdate.js 가 위치한 경로로 이동
 *
 *      node versionUpdate.js
 *
 *      명령어를 실행하면 Version.js의 버전 값이 배포내역 중 적용되지 않은 가장 최근 버전으로 변경됩니다.
 *
 * 🟥 주의사항(배포순서)
 *
 *      [1] Web에서 배포내용 작성 -> BE에 신규 버전이 자동 생성되기 때문
 *
 *      [2] node versionUpdate.js 실행 -> BE에 생성된 신규 버전을 Version.js에 갱신
 *
 *      [3] npm run build
 *
 *      [4] 프론트 서버에 build 파일 옮겨서 배포
 *
 */
const restURI = require("./json/restURI.json");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function getVersion() {
  try {
    axios.defaults.baseURL = "http://51.73.47.26:3000";

    const result = await axios.get(restURI.buildReportLatestNotApply);

    if (result && result.data && result.data.data && result.data.data.rows) {
      console.log("Received Version: ", result.data.data.rows[0].version);
      return result.data.data.rows[0].version;
    } else {
      console.log("No version data received.");
      return null;
    }
  } catch (err) {
    console.error("Error fetching version: ", err);
    return null;
  }
}

function generateVersionFile(dirPath) {
  getVersion().then((version) => {
    if (!version) {
      console.error("No version to write.");
      return;
    }

    const versionContent = `export const Version = "${version}";`;

    const versionFilePath = path.join(dirPath, "Version.js");

    try {
      fs.writeFileSync(versionFilePath, versionContent);
      console.log("Version.js file generated successfully.");
    } catch (writeErr) {
      console.error("Error writing to Version.js: ", writeErr);
    }
  });
}

const srcPath = "./"; // src 폴더 경로
generateVersionFile(srcPath);

module.exports = generateVersionFile;
