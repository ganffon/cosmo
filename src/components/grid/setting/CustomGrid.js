export class CheckBox {
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

export class Button {
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
      const columnName = el.parentElement.__preactattr_["data-column-name"];
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
    const type = props.columnInfo.renderer.options.btnType;
    switch (type) {
      case "copy":
        this.el.innerText = elName;
        this.el.disabled = value ? true : false;
        break;
      case "cancel":
        this.el.innerText = elName;
        this.el.disabled = value ? false : true;
        break;
      case "packingInput":
        if (elName2 === "") {
          this.el.innerText = elName;
        } else {
          this.el.innerText = value ? elName : elName2;
          this.el.disabled = value === 2 ? false : true;
          this.el.className = value === 2 ? "customButton grid__button--apply" : "customButton grid__button--disabled";
        }
        break;
      case "inspDocumentApply":
        if (elName2 === "") {
          this.el.innerText = elName;
        } else {
          this.el.innerText = value ? elName : elName2;
        }
        this.el.className = value ? "customButton grid__button--apply" : "customButton";
        break;
      case "downtimeInput":
        if (elName2 === "") {
          this.el.innerText = elName;
        } else {
          switch (value) {
            case 0:
              this.el.innerText = elName;
              this.el.disabled = false;
              break;
            case 1:
              this.el.innerText = elName2;
              this.el.disabled = true;
              break;
            case 2:
              this.el.innerText = elName;
              this.el.disabled = true;
              break;
            default:
          }
        }
        break;
      default:
        if (elName2 === "") {
          this.el.innerText = elName;
        } else {
          this.el.innerText = value ? elName : elName2;
        }
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
export class EditorNumber {
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
export class EditorFloat1 {
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
export class EditorFloat2 {
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
export class EditorFloat3 {
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
export function NumComma(value) {
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
export function OnlyNum(value) {
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
export function DateFormat(value) {
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
export function Password(value, fg) {
  if (value.value !== null) {
    if (fg) {
      return value.value.toString().replace(value.value.toString(), () => {
        let passwordStr = "";
        for (let i = 0; i < value.value.toString().length; i++) {
          passwordStr = passwordStr + "*";
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

export class ColumnHeaderMultiLine {
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

export const copyRow = (refGrid, setGridData, columns, copyColumnNames, btnRowKey = null) => {
  let rowKey = null;
  if (!btnRowKey) {
    rowKey = refGrid?.current?.gridInst?.getFocusedCell().rowKey; //현재 선택된 cell의 rowKey 가져오기
  } else {
    rowKey = btnRowKey;
  }
  if (rowKey) {
    const targetGridData = refGrid?.current?.gridInst?.getData(); //현재 Grid Data 모두 가져오기
    const maxRowCount = targetGridData.length;
    targetGridData.forEach((item) => {
      item.copyRow = item.copyRow === 1 ? 1 : 0;
      item.cancelRow = item.cancelRow === 1 ? 1 : 0;
    });
    const makesCopyRow = {}; //Copy 할 Row 를 만들기 시작
    columns.forEach((column) => {
      if (copyColumnNames.includes(column.name)) {
        //copyColumnNames 에 배열로 전달받은 컬럼만 내용을 복사함
        makesCopyRow[column.name] = targetGridData[rowKey]?.[column.name];
      } else {
        makesCopyRow[column.name] = null;
      }
    });
    makesCopyRow.copyRow = 1;
    makesCopyRow.cancelRow = 1;

    if (Number(rowKey) !== maxRowCount - 1) {
      //연속 복사 시 복사한 다음 row에 추가될 수 있도록 조치함
      for (let i = Number(rowKey) + 1; i < Number(maxRowCount) + 1; i++) {
        if (targetGridData[i]?.copyRow === 0) {
          rowKey = i;
          break;
        }
        if (i === maxRowCount) {
          rowKey = maxRowCount;
        }
      }
    } else {
      rowKey = Number(rowKey) + 1;
    }

    // targetGridData.splice(Number(rowKey) + 1, 0, makesCopyRow);
    targetGridData.splice(rowKey, 0, makesCopyRow);
    const copiedData = targetGridData.map((item, index) => {
      //최종적으로 만들어진 데이터에 uniqueKey와 rowKey를 재선언함
      return { ...item, uniqueKey: `@dataKey${Date.now()}-${index}`, rowKey: index };
    });
    setGridData(copiedData);
  }
};
export const cancelRow = (refGrid, setGridData, btnRowKey = null) => {
  let rowKey = null;
  if (!btnRowKey) {
    rowKey = refGrid?.current?.gridInst?.getFocusedCell().rowKey; //현재 선택된 cell의 rowKey 가져오기
  } else {
    rowKey = btnRowKey;
  }
  if (rowKey) {
    refGrid?.current?.gridInst?.removeRow(rowKey); // 일단 지우고
    const targetGridData = refGrid?.current?.gridInst?.getData(); //현재 Grid Data 모두 가져오기
    targetGridData.forEach((item) => {
      item.copyRow = item.copyRow === 1 ? 1 : 0;
      item.cancelRow = item.cancelRow === 1 ? 1 : 0;
    });
    const cancelData = targetGridData.map((item, index) => {
      //최종적으로 만들어진 데이터에 uniqueKey와 rowKey를 재선언함
      return { ...item, uniqueKey: `@dataKey${Date.now()}-${index}`, rowKey: index };
    });
    setGridData(cancelData);
  }
};

// export {
//   CheckBox,
//   Button,
//   NumComma,
//   OnlyNum,
//   DateFormat,
//   Password,
//   EditorNumber,
//   EditorFloat1,
//   EditorFloat2,
//   EditorFloat3,
//   ColumnHeaderMultiLine,
// };
