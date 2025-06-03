import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField, Box, Typography } from "@mui/material";

const PersonalDetailsForm = ({
  fullName,
  setFullName,
  email,
  setEmail,
  dateOfBirth,
  setDateOfBirth,
  contactNumber,
  setContactNumber,
}) => {
  const handleContactChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setContactNumber(value);
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 5, md: 30 },
        pt: 4,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 3,
      }}
    >
      <Typography sx={{ fontWeight: "bold", minWidth: "150px" }}>
        Personal Details:
      </Typography>
      <Box
        sx={{
          flex: 1,
          maxWidth: 400,
          gap: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={dateOfBirth}
            onChange={setDateOfBirth}
            renderInput={(params) => (
              <TextField {...params} fullWidth required />
            )}
          />
        </LocalizationProvider>
        <TextField
          label="Contact Number"
          value={contactNumber}
          onChange={handleContactChange}
          fullWidth
          required
          inputProps={{
            maxLength: 10,
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          helperText={
            contactNumber.length !== 10 ? "Must be exactly 10 digits" : " "
          }
          error={contactNumber.length !== 10}
        />
      </Box>
    </Box>
  );
};

export default PersonalDetailsForm;
