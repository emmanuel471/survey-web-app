package tshimologong.com.tshimologong.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SurveySummaryDTO {
    private long totalSurveys;
    private double averageAge;
    private String oldestPersonName;
    private long oldestPersonAge;
    private String youngestPersonName;
    private long youngestPersonAge;
    private double pizzaPercentage;
    private double pastaPercentage;
    private double papAndWorsPercentage;
    private double avgMoviesRating;
    private double avgRadioRating;
    private double avgEatingOutRating;
    private double avgTVRating;
}

