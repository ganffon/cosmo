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
 *      [2] node versionUpdate.js 실행 -> BE에 생성된 신규 버전을 Version.js 로 가져와 갱신시킴
 *
 *      [3] npm run build
 *
 *      [4] 프론트 서버에 build 파일 옮겨서 배포
 *
 *      [5] Web에서 작성한 배포를 "적용" 시켜주어야 함 -> 적용된 것중에 최신 버전과 기존 Web 버전을 5분마다 비교하여 업데이트 알림을 띄움
 *
 */
const restURI = require("./json/restURI.json");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function getVersion() {
  try {
    axios.defaults.baseURL = "http://51.73.47.26:3000";
    // axios.defaults.baseURL = "http://61.78.123.204:3002";

    const result = await axios.get(restURI.buildReportLatestNotApply);

    console.log("🟩　적용된 버전 : ", result?.data?.data?.rows[0]?.version);
    return result?.data?.data?.rows[0]?.version;
  } catch (err) {
    console.error("❌　에러발생 : ", err);
    return null;
  }
}

function generateVersionFile(dirPath) {
  getVersion().then((version) => {
    if (!version) {
      console.error("🟥　신규 버전이 존재하지 않음! 배포내역 작성부터 해야함!");
      return;
    }

    const versionContent = `export const Version = "${version}";`;

    const versionFilePath = path.join(dirPath, "Version.js");

    try {
      fs.writeFileSync(versionFilePath, versionContent);
      console.log("🟩　Version.js 파일 생성 및 갱신 성공!");
    } catch (writeErr) {
      console.error("❌　Version.js 파일 작성할 때 에러 : ", writeErr);
    }
  });
}

const srcPath = "./"; // src 폴더 경로
generateVersionFile(srcPath);

module.exports = generateVersionFile;
