package tshimologong.com.tshimologong.dto;

import java.time.LocalDate;
import java.util.Set;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long userId;
    private String fullNames;
    private String email;
    private LocalDate dateOfBirth;
    private String contactNumber;

    private String favoriteFood; 

    private Set<PreferenceDTO> preferences;
}
