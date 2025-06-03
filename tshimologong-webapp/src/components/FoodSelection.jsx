import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

const FoodSelection = ({ foodItems, selectedFood, handleFoodChange }) => (
  <Box
    sx={{
      p: 5,
      mt: 2,
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      alignItems: "flex-start",
      gap: 2,
      flexWrap: "wrap",
    }}
  >
    <Typography
      sx={{
        minWidth: 200,
        mt: { xs: 0, sm: 1 },
        fontWeight: 500,
      }}
    >
      What is your favourite food?
    </Typography>

    <FormGroup
      row
      sx={{
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      {[...foodItems].reverse().map((item) => (
        <FormControlLabel
          key={item.foodId}
          control={
            <Checkbox
              checked={selectedFood === item.foodName}
              onChange={() => handleFoodChange(item.foodName)}
              size="small"
            />
          }
          label={item.foodName}
        />
      ))}
    </FormGroup>
  </Box>
);

export default FoodSelection;
