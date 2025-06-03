package tshimologong.com.tshimologong.service_implemetations;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import tshimologong.com.tshimologong.entities.User;
import tshimologong.com.tshimologong.entities.UserPreference;
import tshimologong.com.tshimologong.entities.UserPreferenceId;
import tshimologong.com.tshimologong.entities.PreferenceQuestion;
import tshimologong.com.tshimologong.dto.UserDTO;
import tshimologong.com.tshimologong.dto.PreferenceDTO;
import tshimologong.com.tshimologong.repositories.UserRepository;
import tshimologong.com.tshimologong.repositories.FoodRepository;
import tshimologong.com.tshimologong.repositories.PreferenceQuestionRepository;
import tshimologong.com.tshimologong.service_interfaces.UserServiceInterface;

@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserServiceInterface {

    private final UserRepository userRepository;
    private final FoodRepository foodRepository;
    private final PreferenceQuestionRepository preferenceQuestionRepository;

    @Override
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public UserDTO createUser(UserDTO userDto) {
        User user = mapToEntity(userDto);
        User savedUser = userRepository.save(user);
        return mapToDto(savedUser);
    }

    @Override
    public Optional<UserDTO> getUserById(Long id) {
        return userRepository.findById(id).map(this::mapToDto);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDto) {
        return userRepository.findById(id).map(existingUser -> {
            existingUser.setFullNames(userDto.getFullNames());
            existingUser.setEmail(userDto.getEmail());
            existingUser.setDateOfBirth(userDto.getDateOfBirth());
            existingUser.setContactNumber(userDto.getContactNumber());

            foodRepository.findByFoodName(userDto.getFavoriteFood())
                .ifPresent(existingUser::setFavoriteFood);

            // Update preferences
            if (userDto.getPreferences() != null) {
                Set<UserPreference> updatedPrefs = userDto.getPreferences().stream()
                    .map(prefDto -> {
                        UserPreference pref = new UserPreference();

                        // Composite key
                        UserPreferenceId idKey = new UserPreferenceId();
                        idKey.setUserId(existingUser.getUserId());
                        idKey.setQuestionId(prefDto.getQuestionId());
                        pref.setId(idKey);

                        pref.setUser(existingUser);

                        PreferenceQuestion question = preferenceQuestionRepository.findById(prefDto.getQuestionId())
                            .orElseThrow(() -> new RuntimeException("Preference question not found"));
                        pref.setQuestion(question);

                        pref.setResponse(prefDto.getResponse());

                        return pref;
                    }).collect(Collectors.toSet());

                existingUser.getPreferences().clear();
                existingUser.getPreferences().addAll(updatedPrefs);
            }

            User saved = userRepository.save(existingUser);
            return mapToDto(saved);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    private User mapToEntity(UserDTO dto) {
        User user = new User();
        user.setFullNames(dto.getFullNames());
        user.setEmail(dto.getEmail());
        user.setDateOfBirth(dto.getDateOfBirth());
        user.setContactNumber(dto.getContactNumber());

        foodRepository.findByFoodName(dto.getFavoriteFood())
            .ifPresent(user::setFavoriteFood);

        if (dto.getPreferences() != null) {
            Set<UserPreference> preferences = dto.getPreferences().stream()
                .map(prefDto -> {
                    UserPreference pref = new UserPreference();

                    UserPreferenceId id = new UserPreferenceId();
                    // userId is null here since user is not persisted yet, it will be set by JPA later
                    id.setQuestionId(prefDto.getQuestionId());
                    pref.setId(id);

                    pref.setUser(user);

                    PreferenceQuestion question = preferenceQuestionRepository.findById(prefDto.getQuestionId())
                        .orElseThrow(() -> new RuntimeException("Preference question not found"));
                    pref.setQuestion(question);

                    pref.setResponse(prefDto.getResponse());

                    return pref;
                }).collect(Collectors.toSet());

            user.setPreferences(preferences);
        }

        return user;
    }

    private UserDTO mapToDto(User user) {
        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setFullNames(user.getFullNames());
        dto.setEmail(user.getEmail());
        dto.setDateOfBirth(user.getDateOfBirth());
        dto.setContactNumber(user.getContactNumber());

        dto.setFavoriteFood(user.getFavoriteFood() != null ? user.getFavoriteFood().getFoodName() : null);

        if (user.getPreferences() != null) {
            Set<PreferenceDTO> prefsDto = user.getPreferences().stream()
                .map(pref -> {
                    PreferenceDTO pDto = new PreferenceDTO();
                    pDto.setQuestionId(pref.getQuestion().getQuestionId());
                    pDto.setResponse(pref.getResponse());
                    return pDto;
                }).collect(Collectors.toSet());
            dto.setPreferences(prefsDto);
        }

        return dto;
    }
}
