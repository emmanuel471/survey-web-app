package tshimologong.com.tshimologong.mappers;

import tshimologong.com.tshimologong.dto.UserDTO;
import tshimologong.com.tshimologong.dto.PreferenceDTO;
import tshimologong.com.tshimologong.entities.User;
import tshimologong.com.tshimologong.entities.UserPreference;
import tshimologong.com.tshimologong.entities.UserPreferenceId;
import tshimologong.com.tshimologong.entities.Food;
import tshimologong.com.tshimologong.entities.PreferenceQuestion;
import tshimologong.com.tshimologong.repositories.FoodRepository;
import tshimologong.com.tshimologong.repositories.PreferenceQuestionRepository;
import org.springframework.stereotype.Component;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UserMapper {

    private final FoodRepository foodRepository;
    private final PreferenceQuestionRepository preferenceQuestionRepository;

    public UserMapper(FoodRepository foodRepository, PreferenceQuestionRepository preferenceQuestionRepository) {
        this.foodRepository = foodRepository;
        this.preferenceQuestionRepository = preferenceQuestionRepository;
    }

    public UserDTO mapToDto(User user) {
        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setFullNames(user.getFullNames());
        dto.setEmail(user.getEmail());
        dto.setDateOfBirth(user.getDateOfBirth());
        dto.setContactNumber(user.getContactNumber());
        dto.setFavoriteFood(user.getFavoriteFood() != null ? user.getFavoriteFood().getFoodName() : null);

        Set<PreferenceDTO> preferenceDTOs = user.getPreferences().stream()
            .map(pref -> {
                PreferenceDTO p = new PreferenceDTO();
                p.setQuestionId(pref.getQuestion().getQuestionId());
                p.setResponse(pref.getResponse());
                return p;
            })
            .collect(Collectors.toSet());
        dto.setPreferences(preferenceDTOs);

        return dto;
    }

    public User mapToEntity(UserDTO dto) {
        User user = new User();
        user.setUserId(dto.getUserId());
        user.setFullNames(dto.getFullNames());
        user.setEmail(dto.getEmail());
        user.setDateOfBirth(dto.getDateOfBirth());
        user.setContactNumber(dto.getContactNumber());

        Food favoriteFood = foodRepository.findByFoodName(dto.getFavoriteFood())
            .orElse(null); 
        user.setFavoriteFood(favoriteFood);
        Set<UserPreference> preferences = dto.getPreferences().stream()
            .map(prefDto -> {
                UserPreference pref = new UserPreference();

                UserPreferenceId id = new UserPreferenceId();
                id.setUserId(user.getUserId());
                id.setQuestionId(prefDto.getQuestionId());
                pref.setId(id);

                pref.setUser(user);

                PreferenceQuestion question = preferenceQuestionRepository.findById(prefDto.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Question not found: " + prefDto.getQuestionId()));
                pref.setQuestion(question);

                pref.setResponse(prefDto.getResponse());

                return pref;
            }).collect(Collectors.toSet());

        user.setPreferences(preferences);

        return user;
    }
}
