const API_BASE_URL = "http://localhost:8080";

export const API_ENDPOINT = {
  GET_FOOD_ITEMS: `${API_BASE_URL}/foods/get-all`,
  GET_QUESTIONS_ITEMS: `${API_BASE_URL}/preference-questions/get-all`,
  SUBMIT_SURVEY: `${API_BASE_URL}/api/users/submit-survey`,
  GET_SURVEY_RESULTS: `${API_BASE_URL}/api/survey/summary`,
};
