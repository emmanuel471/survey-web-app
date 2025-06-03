import { Box, Skeleton } from "@mui/material";

const FoodSelectionSkeleton = () => (
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
    <Skeleton variant="text" width={200} height={30} />

    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", flex: 1 }}>
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} variant="rectangular" width={100} height={32} />
      ))}
    </Box>
  </Box>
);

export default FoodSelectionSkeleton;
