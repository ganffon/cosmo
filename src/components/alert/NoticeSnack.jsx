import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function NoticeSnack({ state, setState }) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  let vertical = "";
  let horizontal = "";

  switch (state.location) {
    case "bottomLeft":
      vertical = "bottom";
      horizontal = "left";
      break;
    case "bottomRight":
      vertical = "bottom";
      horizontal = "right";
      break;
    case "topLeft":
      vertical = "top";
      horizontal = "left";
      break;
    case "topRight":
      vertical = "top";
      horizontal = "right";
      break;
    case "topCenter":
      vertical = "top";
      horizontal = "center";
      break;
    default:
      vertical = "bottom";
      horizontal = "right";
  }

  let duration = 0;

  if (state.severity === "success") {
    duration = 1500;
  } else {
    duration = 5000;
  }

  return (
    /**
     * 🔸severity params
     * "error" - red
     * "warning" - orange
     * "info" - blue
     * "success" - grin
     */

    <Snackbar
      open={state.open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
    >
      <Alert onClose={handleClose} severity={state.severity} sx={{ width: "100%" }}>
        {state.message}
      </Alert>
    </Snackbar>
  );
}

export default NoticeSnack;
