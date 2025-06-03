package tshimologong.com.tshimologong.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import tshimologong.com.tshimologong.entities.PreferenceQuestion;
import tshimologong.com.tshimologong.service_interfaces.PreferenceQuestionServiceInterface;

@RestController
@RequestMapping("/preference-questions")
public class PreferenceQuestionController {

    @Autowired
    private PreferenceQuestionServiceInterface preferenceQuestionService;

    @GetMapping("/get-all")
    public List<PreferenceQuestion> getAllPreferenceQuestions() {
        return preferenceQuestionService.getAllPreferenceQuestions();
    }

    @GetMapping("/{id}")
    public PreferenceQuestion getPreferenceQuestionById(@PathVariable Long id) {
        return preferenceQuestionService.getPreferenceQuestionById(id);
    }
}
