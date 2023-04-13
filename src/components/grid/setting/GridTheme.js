// ⬇️ import TUI
import TuiGrid from "tui-grid";
// ⬇️ reference of page
import {
  HEADER_BORDER_COLOR,
  HEADER_BACK_COLOR,
  NORMAL_BACK_COLOR,
  NORMAL_BORDER_COLOR,
  REQUIRED_BACK_COLOR,
  REQUIRED_TEXT_COLOR,
  EDITABLE_BACK_COLOR,
  DISABLED_BACK_COLOR,
  FROZEN_BORDER_COLOR,
  MODAL_BACK_COLOR,
} from "constant";

function GridTheme() {
  return TuiGrid.applyTheme("custom", {
    frozenBorder: {
      border: FROZEN_BORDER_COLOR,
    },
    cell: {
      rowHeader: {
        border: HEADER_BORDER_COLOR,
        background: HEADER_BACK_COLOR,
      },
      header: {
        border: HEADER_BORDER_COLOR,
        background: HEADER_BACK_COLOR,
      },
      normal: {
        border: NORMAL_BORDER_COLOR,
        background: NORMAL_BACK_COLOR,
        showVerticalBorder: true,
        showHorizontalBorder: true,
      },
      required: {
        background: MODAL_BACK_COLOR,
      },
      editable: {
        background: EDITABLE_BACK_COLOR,
      },
      disabled: {
        background: DISABLED_BACK_COLOR,
      },
      invalid: {
        background: MODAL_BACK_COLOR,
      },

      // oddRow: {
      //   background: "white",
      // },
    },
  });
}

export default GridTheme;
