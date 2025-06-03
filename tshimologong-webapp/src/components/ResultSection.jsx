import React from "react";
import { Grid, Box, Typography } from "@mui/material";

const ResultSection = ({ items }) => {
  return (
    <Grid
      sx={{ width: "80vh", mt: 4 }}
      container
      direction="column"
      spacing={2}
    >
      {items.map(({ label, value }, index) => {
        const formattedValue =
          typeof value === "number" ? value.toFixed(1) : value;

        return (
          <Grid item key={index}>
            <Box display="flex" justifyContent="space-between">
              <Typography sx={{ flexGrow: 1 }}>{label}</Typography>
              <Typography>{formattedValue}</Typography>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ResultSection;
