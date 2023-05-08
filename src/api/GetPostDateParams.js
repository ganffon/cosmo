// ✨ INSERT ✨

class storeCheck {
  constructor(raw, date) {
    this.reg_date = date;
    this.tran_type_id = null;
    this.store_id = raw.store_id;
    this.location_id = raw.location_id;
    this.prod_id = raw.prod_id;
    this.reject_id = raw.reject_id;
    this.partner_id = raw.partner_id;
    this.lot_no = raw.lot_no;
    this.Existing_qty = String(raw.qty) ? Number(raw.qty) : null;
    this.Modify_qty = String(raw.stock_inspection)
      ? Number(raw.stock_inspection)
      : null;
    this.remark = raw.remark;
  }
}
class storeCheckNewLOT {
  constructor(raw, date) {
    this.reg_date = date;
    this.tran_type_id = null;
    this.store_id = raw.store_id;
    this.location_id = raw.location_id;
    this.prod_id = raw.prod_id;
    this.reject_id = raw.reject_id;
    this.partner_id = raw.partner_id;
    this.lot_no = raw.lot_no;
    this.Existing_qty = 0;
    this.Modify_qty = String(raw.qty) ? Number(raw.qty) : null;
    this.remark = raw.remark;
  }
}

/**
 * 🔍 Grid Cell 이 Combo 인 경우
 * this.prod_gbn_id = raw.prod_gbn_nm; ➡️ id = nm 형식으로 작성
 */

/**
 * @param {string} componentName 소문자로 시작
 * @param {any} raw 처리 할 데이터
 * @param {string} factory_id 쿠키에서 현재 로그인 한 사업부 아이디
 * @returns
 */
function GetPostDateParams(componentName, raw, date) {
  let params = "";
  if (raw !== undefined) {
    switch (componentName) {
      case "storeCheck":
        params = new storeCheck(raw, date);
        break;
      case "storeCheckNewLOT":
        params = new storeCheckNewLOT(raw, date);
        break;
      default:
    }
  }
  console.log(params);
  return params;
}

export default GetPostDateParams;
