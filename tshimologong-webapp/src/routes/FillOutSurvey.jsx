import { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "../config";
import AlertMessage from "../components/AlertMessage";
import SurveyQuestions from "../components/SurveyQuestions";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import PersonalDetailsFormSkeleton from "../components/PersonalDetailsFormSkeleton";
import SurveyQuestionsSkeleton from "../components/SurveyQuestionsSkeleton";
import FoodSelection from "../components/FoodSelection";
import FoodSelectionSkeleton from "../components/FoodSelectionSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import AnimatedPage from "../components/AnimatedPage";

const FillOutSurvey = () => {
  const [submitting, setSubmitting] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [responses, setResponses] = useState({});
  const [selectedFood, setSelectedFood] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const options = {
    "Strongly agree": 1,
    Agree: 2,
    Neutral: 3,
    Disagree: 4,
    "Strongly disagree": 5,
  };
  const optionLabels = Object.keys(options);

  const isFormValid = () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !dateOfBirth ||
      !contactNumber.trim() ||
      !selectedFood
    )
      return false;

    for (const { questionText } of questionItems) {
      if (!responses[questionText]) return false;
    }

    return true;
  };

  const showAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleClose = () => setAlertOpen(false);

  const calculateAge = (dob) => {
    if (!dob) return null;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      showAlert(
        "Please fill out all required fields and answer all questions.",
        "error"
      );
      return;
    }

    const age = calculateAge(dateOfBirth);
    if (age === null || age < 5 || age > 120) {
      showAlert("Age must be between 5 and 120 years.", "error");
      return;
    }

    const preferences = questionItems.map(({ questionId, questionText }) => ({
      questionId,
      response: responses[questionText] ?? null,
    }));

    const payload = {
      fullNames: fullName,
      email,
      dateOfBirth: dateOfBirth ? dateOfBirth.toLocaleDateString("en-CA") : null,
      contactNumber,
      favoriteFood: selectedFood,
      preferences,
    };

    setSubmitting(true);

    try {
      const response = await fetch(API_ENDPOINT.SUBMIT_SURVEY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.message.includes("already exists")) {
        showAlert(data.message, "info");
      } else if (response.ok) {
        showAlert(data.message, "success");
        setTimeout(() => window.location.reload(), 3000);
      } else {
        showAlert(data.message, "error");
      }
    } catch (error) {
      showAlert("Network error: " + error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (questionText, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionText]: value,
    }));
  };

  const handleFoodChange = (foodName) => {
    setSelectedFood((prev) => (prev === foodName ? "" : foodName));
  };

  const {
    data: foodItems = [],
    isLoading: isFoodLoading,
    isPending: isFoodPending,
    error: foodError,
  } = useQuery({
    queryKey: ["foodItems"],
    queryFn: () => fetch(API_ENDPOINT.GET_FOOD_ITEMS).then((res) => res.json()),
  });

  const {
    data: questionItems = [],
    isLoading: isQuestionLoading,
    isPending: isQuestionPending,
    error: questionError,
  } = useQuery({
    queryKey: ["questionItems"],
    queryFn: () =>
      fetch(API_ENDPOINT.GET_QUESTIONS_ITEMS).then((res) => res.json()),
  });

  if (
    isFoodLoading ||
    isFoodPending ||
    isQuestionLoading ||
    isQuestionPending
  ) {
    return (
      <>
        <PersonalDetailsFormSkeleton />
        <FoodSelectionSkeleton />
        <SurveyQuestionsSkeleton />
      </>
    );
  }

  if (foodError || questionError) {
    return (
      <ErrorMessage
        message={
          foodError?.message || questionError?.message || "Unknown error"
        }
      />
    );
  }

  return (
    <AnimatedPage>
      <AlertMessage
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        onClose={handleClose}
      />

      <PersonalDetailsForm
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        setEmail={setEmail}
        dateOfBirth={dateOfBirth}
        setDateOfBirth={setDateOfBirth}
        contactNumber={contactNumber}
        setContactNumber={setContactNumber}
      />

      <FoodSelection
        foodItems={foodItems}
        selectedFood={selectedFood}
        handleFoodChange={handleFoodChange}
      />

      <SurveyQuestions
        statements={questionItems}
        optionLabels={optionLabels}
        options={options}
        responses={responses}
        handleChange={handleChange}
      />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isFoodLoading || isQuestionLoading || submitting}
          startIcon={
            submitting ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </AnimatedPage>
  );
};

export default FillOutSurvey;
