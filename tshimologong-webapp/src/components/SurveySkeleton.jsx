import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";

const SurveySkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: { xs: 2, md: 4 },
        width: "100%",
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Loading Survey Results...
      </Typography>

      {[...Array(4)].map((_, index) => (
        <Box
          key={index}
          sx={{
            width: "100%",
            maxWidth: "80vh",
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Skeleton variant="text" width="60%" height={28} />
          <Skeleton variant="text" width="20%" height={28} />
        </Box>
      ))}

      {[...Array(2)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          width="100%"
          height={80}
          sx={{ maxWidth: "80vh", mt: index === 0 ? 4 : 2, borderRadius: 1 }}
        />
      ))}
    </Box>
  );
};

export default SurveySkeleton;
