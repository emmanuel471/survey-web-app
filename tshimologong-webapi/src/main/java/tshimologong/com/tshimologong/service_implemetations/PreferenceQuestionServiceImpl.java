package tshimologong.com.tshimologong.service_implemetations;

import org.springframework.stereotype.Service;
import tshimologong.com.tshimologong.entities.PreferenceQuestion;
import tshimologong.com.tshimologong.repositories.PreferenceQuestionRepository;
import tshimologong.com.tshimologong.service_interfaces.PreferenceQuestionServiceInterface;

import java.util.List;
import java.util.Optional;

@Service
public class PreferenceQuestionServiceImpl implements PreferenceQuestionServiceInterface {

    private final PreferenceQuestionRepository preferenceQuestionRepository;

    public PreferenceQuestionServiceImpl(PreferenceQuestionRepository preferenceQuestionRepository) {
        this.preferenceQuestionRepository = preferenceQuestionRepository;
    }

    @Override
    public List<PreferenceQuestion> getAllPreferenceQuestions() {
        return preferenceQuestionRepository.findAll();
    }

    @Override
    public PreferenceQuestion getPreferenceQuestionById(Long id) {
        Optional<PreferenceQuestion> question = preferenceQuestionRepository.findById(id);
        return question.orElse(null);
    }
}
