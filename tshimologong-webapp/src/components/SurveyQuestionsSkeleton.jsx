import { Box, Skeleton } from "@mui/material";

const SurveyQuestionsSkeleton = () => (
  <Box sx={{ px: { xs: 2, sm: 4 }, pb: 5, mt: 2, width: { lg: "70%" } }}>
    <Skeleton variant="text" width={400} height={30} sx={{ mb: 2 }} />
    {[...Array(5)].map((_, i) => (
      <Skeleton
        key={i}
        variant="rectangular"
        width="100%"
        height={40}
        sx={{ mb: 1 }}
      />
    ))}
  </Box>
);

export default SurveyQuestionsSkeleton;
