import CN from "json/ColumnName.json";
import * as col from "custom/GridColumnSet";
import * as C from "constant/Grid";

export function subdivisionGroundSet(continueButton = ()=>{}){
    const data = [];
    const rowHeaders = [ "rowNum"];
    const rowHeadersModal = ["rowNum"];


    const gridCol = [
        col.text("lot_no", CN.lot_no, false, C.U, C.WIDTH_MIDDLE),
        col.text("subdivision_qty", CN.weight,true,false,C.WIDTH_MIDDLE),
        col.id("work_subdivision_detail_id",C.U,false),
    ]

    const commonGridCol = [
        col.button("continue","바코드","재출력",continueButton),
        col.id("work_subdivision_id",C.U,false),
        col.text("subdivision_date",CN.date,false,false),
        col.text("subdivision_time",CN.hour_time,false,false),
        col.text("lot_no",CN.lot_no,false,false),
        col.number("bag_cnt",CN.bag_count,false,C.WIDTH_SHORT,false),
        col.number("total_qty",CN.bag_qty,false,C.WIDTH_SHORT,false),
        col.text("worker_group_nm",CN.worker_group_nm,false,false),
        col.text("remark",CN.remark,false,false),
        col.id("prod_id",CN.prod_id,false),
        col.text("prod_nm",CN.prod_nm,false,false)
    ]


    const inputSet = [
        {
            id: "remark",
            name: CN.remark,
        },

    ];
    return {
        data,
        rowHeaders,
        rowHeadersModal,
        inputSet,
        gridCol,
        commonGridCol,
    };
}