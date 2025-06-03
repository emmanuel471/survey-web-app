package tshimologong.com.tshimologong.service_interfaces;

import java.util.List;

import tshimologong.com.tshimologong.entities.PreferenceQuestion;

public interface PreferenceQuestionServiceInterface {
    List<PreferenceQuestion> getAllPreferenceQuestions();
    PreferenceQuestion getPreferenceQuestionById(Long id);
}