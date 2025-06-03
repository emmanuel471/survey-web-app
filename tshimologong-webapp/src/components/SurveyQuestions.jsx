import { Box, Typography, Radio } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const SurveyQuestions = ({
  statements,
  optionLabels,
  options,
  responses,
  handleChange,
}) => (
  <Box sx={{ px: { xs: 2, sm: 4 }, pb: 5, mt: 2, width: { lg: "70%" } }}>
    <Typography sx={{ mb: 2 }}>
      Please rate your level of on a scale of 1 to 5, with 1 being "Strongly
      Agree" and 5 being "Strongly Disagree"
    </Typography>
    <TableContainer
      sx={{
        borderRadius: 0,
        boxShadow: "none",
      }}
      component={Paper}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "#f0f0f0",
                color: "black",
              }}
            >
              Statement
            </TableCell>
            {optionLabels.map((opt) => (
              <TableCell
                key={opt}
                align="center"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f0f0f0",
                  color: "black",
                }}
              >
                {opt}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {statements.map((statement) => (
            <TableRow key={statement.questionId}>
              <TableCell>{statement.questionText}</TableCell>
              {optionLabels.map((opt) => (
                <TableCell key={opt} align="center">
                  <Radio
                    checked={responses[statement.questionText] === options[opt]}
                    onChange={() =>
                      handleChange(statement.questionText, options[opt])
                    }
                    value={options[opt]}
                    name={statement.questionText}
                    size="small"
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default SurveyQuestions;
