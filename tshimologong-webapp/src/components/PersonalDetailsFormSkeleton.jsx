import { Box, Skeleton } from "@mui/material";

const PersonalDetailsFormSkeleton = () => (
  <Box
    sx={{
      px: { xs: 2, sm: 5, md: 30 },
      pt: 4,
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      gap: 3,
    }}
  >
    <Skeleton variant="text" width={150} height={30} />

    <Box
      sx={{
        flex: 1,
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={40} />
    </Box>
  </Box>
);

export default PersonalDetailsFormSkeleton;
