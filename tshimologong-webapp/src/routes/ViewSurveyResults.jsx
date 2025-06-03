import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AnimatedPage from "../components/AnimatedPage";
import { Box, Typography } from "@mui/material";
import ResultSection from "../components/ResultSection";
import SurveySkeleton from "../components/SurveySkeleton";
import { API_ENDPOINT } from "../config";

const fetchSurveySummary = async () => {
  const { data } = await axios.get(API_ENDPOINT.GET_SURVEY_RESULTS);
  return data;
};

const ViewSurveyResults = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["surveySummary"],
    queryFn: fetchSurveySummary,
  });

  if (isLoading) return <SurveySkeleton />;
  if (isError) return <Typography>Error loading survey summary.</Typography>;

  return (
    <AnimatedPage>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <Typography sx={{ fontWeight: "bold", mb: 2 }}>
          Survey Results
        </Typography>

        <ResultSection
          items={[
            { label: "Total number of surveys:", value: data.totalSurveys },
            { label: "Average age:", value: data.averageAge },
            {
              label: "Oldest person who participated in the survey:",
              value: `${data.oldestPersonAge}`,
            },
            {
              label: "Youngest person who participated in the survey:",
              value: `${data.youngestPersonAge}`,
            },
          ]}
        />

        <ResultSection
          title="Food Preferences"
          items={[
            {
              label: "Percentage of people who like Pizza:",
              value: `${data.pizzaPercentage}%`,
            },
            {
              label: "Percentage of people who like Pasta:",
              value: `${data.pastaPercentage}%`,
            },
            {
              label: "Percentage of people who like Pap and Wors:",
              value: `${data.papAndWorsPercentage}%`,
            },
          ]}
        />

        <ResultSection
          title="Entertainment Preferences"
          items={[
            {
              label: "Average rating for movies:",
              value: data.avgMoviesRating,
            },
            {
              label: "Average rating for radio:",
              value: data.avgRadioRating,
            },
            {
              label: "Average rating for eating out:",
              value: data.avgEatingOutRating,
            },
            {
              label: "Average rating for TV:",
              value: data.avgTVRating,
            },
          ]}
        />
      </Box>
    </AnimatedPage>
  );
};

export default ViewSurveyResults;
