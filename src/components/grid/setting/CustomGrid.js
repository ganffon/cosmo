class CheckBox {
  constructor(props) {
    const el = document.createElement("input");
    const elName = props.columnInfo.renderer.options.name;
    const disabled = props.columnInfo.renderer.options.disabled;
    el.type = "checkbox";
    el.className = "checkbox";
    el.disabled = disabled; //🔸true 값을 주면 체크박스가 회색으로 비활성화됨, CSS로 색이 안바뀜, 방법 좀 찾아주세요!
    el.addEventListener("click", (ev) => {
      const rowKey = el.parentElement.__preactattr_["data-row-key"];
      el.checked
        ? (el.parentElement._component.context.store.data.rawData[rowKey][
            elName
          ] = true)
        : (el.parentElement._component.context.store.data.rawData[rowKey][
            elName
          ] = false);
    });

    this.el = el;
    this.render(props);
  }

  getElement() {
    return this.el;
  }

  render(props) {
    this.el.checked = Boolean(props.value); //🔸BE에서 받아온 데이터에 따라 체크표시 유무
  }
}

function NumComma(value) {
  return value.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //🔸숫자 3자리마다 콤마 찍기
}

class ColumnHeaderMultiLine {
  constructor(props) {
    const columnInfo = props.columnInfo;
    const el = document.createElement("div");
    el.className = "columnHeaderMultiLine";
    el.textContent = columnInfo.header;
    this.el = el;
  }
  getElement() {
    return this.el;
  }
  render(props) {
    this.el.textContent = props.columnInfo.header;
  }
}

export default { CheckBox, NumComma, ColumnHeaderMultiLine };
