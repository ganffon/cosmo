import restURI from "json/restURI.json";
import CN from "json/ColumnName.json";
import * as CustomGrid from "components/grid/setting/CustomGrid";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function noticeSet(isEditMode) {
    const data = [];
    const rowHeaders = [ "checkbox","rowNum"];
    const rowHeadersModal = ["rowNum"];


    const columns=[
        col.id("notice_id", CN.notice_id, C.HIDDEN_ID),
        col.id("factory_id", CN.factory_id, C.HIDDEN_ID),
        col.text("factory_nm", CN.factory_nm, false, false, C.WIDTH_SHORT, false, false, false),
        col.text("title", CN.notice_title, false, false, C.WIDTH_SHORT, false, false, false),
        col.text("contents", CN.notice_content, false, false, C.WIDTH_SHORT, false, false, false),

        col.id("writer_uid", CN.writer_uid, C.HIDDEN_ID),
        col.text("writer_user_nm", CN.writer_user_nm, false, false, C.WIDTH_SHORT, false, false, false),
        col.date("notice_start_date",CN.notice_start_date,false,C.U,false),
        col.date("notice_end_date",CN.notice_end_date,false,C.U,false)
    ]




    const datePickerSet = "single";


    const inputSet = [
        {
            id: "notice_title",
            name: CN.notice_title,
        },
        {
            id: "notice_content",
            name: CN.notice_content,
        },
    ];


    return{data,rowHeaders,rowHeadersModal,inputSet,datePickerSet,columns};
}

export default noticeSet;