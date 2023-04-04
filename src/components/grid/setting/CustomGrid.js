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

/**
 * ⬇️ step 값을 변수로 받아왔더니 동작을 안함
 * EditorNumber(정수)
 * EditorFloat1(소수점1자리)
 * EditorFloat2(소수점2자리)
 * EditorFloat3(소수점3자리)
 * 총 4종류를 만들어 두었음.
 */
//🔸Grid Cell Type 정수
class EditorNumber {
  constructor(props) {
    const el = document.createElement("input");
    el.type = "number";
    el.step = 1;
    el.className = "number";
    el.value = props.value;

    this.el = el;
  }
  getElement() {
    return this.el;
  }
  getValue() {
    return this.el.value;
  }
}
//🔸Grid Cell Type 소수점 1자리
class EditorFloat1 {
  constructor(props) {
    const el = document.createElement("input");
    el.type = "number";
    el.step = 0.1;
    el.className = "number";
    el.value = props.value;

    this.el = el;
  }
  getElement() {
    return this.el;
  }
  getValue() {
    return this.el.value;
  }
}
//🔸Grid Cell Type 소수점 2자리
class EditorFloat2 {
  constructor(props) {
    const el = document.createElement("input");
    el.type = "number";
    el.step = 0.01;
    el.className = "number";
    el.value = props.value;

    this.el = el;
  }
  getElement() {
    return this.el;
  }
  getValue() {
    return this.el.value;
  }
}
//🔸Grid Cell Type 소수점 3자리
class EditorFloat3 {
  constructor(props) {
    const el = document.createElement("input");
    el.type = "number";
    el.step = 0.001;
    el.className = "number";
    el.value = props.value;

    this.el = el;
  }
  getElement() {
    return this.el;
  }
  getValue() {
    return this.el.value;
  }
}

function NumComma(value) {
  if (value.value !== null) {
    return value.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //🔸숫자 3자리마다 콤마 찍기
  } else {
    return null;
  }
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

export {
  CheckBox,
  NumComma,
  EditorNumber,
  EditorFloat1,
  EditorFloat2,
  EditorFloat3,
  ColumnHeaderMultiLine,
};
