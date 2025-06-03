import { Box, Typography } from "@mui/material";

const ErrorMessage = ({ message }) => (
  <Box
    sx={{
      p: 3,
      bgcolor: "#fdecea",
      border: "1px solid #f5c6cb",
      borderRadius: 1,
      color: "#b71c1c",
      maxWidth: 600,
      margin: "20px auto",
      textAlign: "center",
    }}
  >
    <Typography variant="body1" fontWeight="bold">
      Error:
    </Typography>
    <Typography variant="body2">{message}</Typography>
  </Box>
);

export default ErrorMessage;
