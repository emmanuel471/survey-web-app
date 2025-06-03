package tshimologong.com.tshimologong.service_implemetations;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tshimologong.com.tshimologong.dto.SurveySummaryDTO;
import tshimologong.com.tshimologong.entities.User;
import tshimologong.com.tshimologong.repositories.PreferenceQuestionRepository;
import tshimologong.com.tshimologong.repositories.UserRepository;

@Service
public class SurveySummaryService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PreferenceQuestionRepository userPreferenceRepository;

    public SurveySummaryDTO getSurveySummary() {
        List<User> users = userRepository.findAll();


        List<User> validUsers = users.stream()
                .filter(u -> u.getDateOfBirth() != null && !u.getDateOfBirth().isAfter(LocalDate.now()))
                .collect(Collectors.toList());


        long totalSurveys = users.size();

        double averageAge = validUsers.stream()
                .mapToLong(u -> ChronoUnit.YEARS.between(u.getDateOfBirth(), LocalDate.now()))
                .average()
                .orElse(0.0);

        User oldest = validUsers.stream()
                .min(Comparator.comparing(User::getDateOfBirth))
                .orElse(null);

        User youngest = validUsers.stream()
                .max(Comparator.comparing(User::getDateOfBirth))
                .orElse(null);


        long pizzaLovers = userRepository.countByFavoriteFood_FoodNameIgnoreCase("Pizza");
        long pastaLovers = userRepository.countByFavoriteFood_FoodNameIgnoreCase("Pasta");
        long papLovers = userRepository.countByFavoriteFood_FoodNameIgnoreCase("Pap and Wors");

        double pizzaPercent = (totalSurveys > 0) ? (pizzaLovers * 100.0 / totalSurveys) : 0.0;
        double pastaPercent = (totalSurveys > 0) ? (pastaLovers * 100.0 / totalSurveys) : 0.0;
        double papPercent = (totalSurveys > 0) ? (papLovers * 100.0 / totalSurveys) : 0.0;

        Double moviesAvg = userPreferenceRepository.getAverageRatingForQuestion("Like to watch movies");
        Double radioAvg = userPreferenceRepository.getAverageRatingForQuestion("Like to listen to radio");
        Double eatOutAvg = userPreferenceRepository.getAverageRatingForQuestion("Like to eat out");
        Double tvAvg = userPreferenceRepository.getAverageRatingForQuestion("Like to watch TV");

        return new SurveySummaryDTO(
                totalSurveys,
                averageAge,
                oldest != null ? oldest.getFullNames() : null,
                oldest != null ? ChronoUnit.YEARS.between(oldest.getDateOfBirth(), LocalDate.now()) : 0,
                youngest != null ? youngest.getFullNames() : null,
                youngest != null ? ChronoUnit.YEARS.between(youngest.getDateOfBirth(), LocalDate.now()) : 0,
                pizzaPercent,
                pastaPercent,
                papPercent,
                moviesAvg != null ? moviesAvg : 0.0,
                radioAvg != null ? radioAvg : 0.0,
                eatOutAvg != null ? eatOutAvg : 0.0,
                tvAvg != null ? tvAvg : 0.0
        );
    }
}
