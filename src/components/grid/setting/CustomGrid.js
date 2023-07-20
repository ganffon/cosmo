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
        ? (el.parentElement._component.context.store.data.rawData[rowKey][elName] = true)
        : (el.parentElement._component.context.store.data.rawData[rowKey][elName] = false);
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

class Button {
  constructor(props) {
    const el = document.createElement("button");
    // const elName = props.columnInfo.renderer.options.name;
    const disabled = props.columnInfo.renderer.options.disabled;
    el.type = "button";
    el.className = "customButton";
    // el.innerText = elName;
    el.disabled = disabled;
    el.onclick = (e) => {
      const rowKey = el.parentElement.__preactattr_["data-row-key"];
      if (props.columnInfo.renderer.options.onClick != null) {
        props.columnInfo.renderer.options.onClick(e, rowKey);
      } else {
        console.log("Custom Grid Button Err");
      }
      // props.columnInfo.renderer.options.onClick();
    };

    this.el = el;
    this.render(props);
  }
  getElement() {
    return this.el;
  }

  render(props) {
    const value = props.value;
    const elName = props.columnInfo.renderer.options.name;
    const elName2 = props.columnInfo.renderer.options.name2;
    if (elName2 === "") {
      this.el.innerText = elName;
    } else {
      this.el.innerText = value ? elName : elName2;
    }
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

/**
 *
 * @param {any} value 숫자 3자리 마다 콤마를 찍음
 * @returns
 */
function NumComma(value) {
  if (value.value !== null) {
    // 소수점 이하 자리 수를 구함
    const decimalLength = value.value.toString().includes(".") ? value.value.toString().split(".")[1].length : 0;
    const int = value.value.toString().split(".")[0];
    const decimal = value.value.toString().split(".")[1];
    const formattedValue =
      decimalLength > 0
        ? int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + decimal
        : value.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedValue;
  } else {
    return null;
  }
}
/**
 *
 * @param {any} value 다른 문자는 숨기고 숫자만 보여줌
 * @returns
 */
function OnlyNum(value) {
  if (value.value !== null) {
    return value.value
      .toString()
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
  } else {
    return null;
  }
}
/**
 *
 * @param {any} value yyyy-MM-dd 형식 표현
 * @returns
 */
function DateFormat(value) {
  if (value.value !== null) {
    return value.value.toString().substr(0, 10);
  } else {
    return null;
  }
}
/**
 *
 * @param {any} value
 * @param {boolean} fg true인 경우 비밀번호 입력 문자 수 만큼 치환하고, false인 경우 비밀번호 치환 문자 수 고정
 * @returns
 */
function Password(value, fg) {
  if (value.value !== null) {
    if (fg) {
      return value.value.toString().replace(value.value.toString(), () => {
        let passwordStr = "";
        for (let i = 0; i < value.value.toString().length; i++) {
          passwordStr = passwordStr + "●";
        }
        return passwordStr;
      });
    } else {
      return value.value.toString().replace(value.value.toString(), "●●●●");
    }
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
  Button,
  NumComma,
  OnlyNum,
  DateFormat,
  Password,
  EditorNumber,
  EditorFloat1,
  EditorFloat2,
  EditorFloat3,
  ColumnHeaderMultiLine,
};
