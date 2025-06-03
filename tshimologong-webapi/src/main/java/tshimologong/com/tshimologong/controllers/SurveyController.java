package tshimologong.com.tshimologong.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tshimologong.com.tshimologong.dto.SurveySummaryDTO;
import tshimologong.com.tshimologong.service_implemetations.SurveySummaryService;

@RestController
@RequestMapping("/api/survey")
public class SurveyController {

    @Autowired
    private SurveySummaryService surveySummaryService;

    @GetMapping("/summary")
    public ResponseEntity<SurveySummaryDTO> getSurveySummary() {

        return ResponseEntity.ok(surveySummaryService.getSurveySummary());
    }
}