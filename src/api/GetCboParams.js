// ✨ ComboBox ✨
/**
 * @param {any} raw 처리 할 데이터
 * @param {string} key_id DB id 변수명
 * @param {string} key_nm DB nm 변수명
 * @returns
 */
// function GetComboParams(componentName, raw, key_id, key_nm) {
function GetComboParams(raw, key_id, key_nm) {
  return { text: raw[key_nm], value: raw[key_id] };
}

export default GetComboParams;
