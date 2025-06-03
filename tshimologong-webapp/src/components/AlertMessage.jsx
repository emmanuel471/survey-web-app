import React from "react";
import { Snackbar, Alert, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

const AlertMessage = ({
  open,
  message,
  severity,
  onClose,
  duration = 6000,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        width: "100%",
        px: isSmallScreen ? 2 : 0,
      }}
    >
      <Alert
        severity={severity}
        onClose={onClose}
        variant="filled"
        sx={{
          width: "100%",
          maxWidth: isSmallScreen ? "90%" : 600,
          mx: "auto",
          boxShadow: 3,
          borderRadius: 2,
        }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
