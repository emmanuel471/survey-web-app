import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Box } from "@mui/material";
import NavBar from "./components/NavBar";
import FillOutSurvey from "./routes/FillOutSurvey";
import ViewSurveyResults from "./routes/ViewSurveyResults";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "./components/AnimatedPage";
import "./App.css";

const queryClient = new QueryClient();

function AppWrapper() {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{ border: "1px solid #ccc", m: 2, p: 2 }}>
        <NavBar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <AnimatedPage>
                  <FillOutSurvey />
                </AnimatedPage>
              }
            />
            <Route
              path="/view"
              element={
                <AnimatedPage>
                  <ViewSurveyResults />
                </AnimatedPage>
              }
            />
          </Routes>
        </AnimatePresence>
      </Box>
    </QueryClientProvider>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
