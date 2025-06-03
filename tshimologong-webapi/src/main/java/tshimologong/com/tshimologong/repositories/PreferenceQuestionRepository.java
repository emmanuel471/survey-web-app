package tshimologong.com.tshimologong.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tshimologong.com.tshimologong.entities.PreferenceQuestion;

public interface PreferenceQuestionRepository extends JpaRepository<PreferenceQuestion, Long> {
    @Query("SELECT AVG(up.response) FROM UserPreference up WHERE up.question.questionText = :text")
    Double getAverageRatingForQuestion(@Param("text") String questionText);
}
