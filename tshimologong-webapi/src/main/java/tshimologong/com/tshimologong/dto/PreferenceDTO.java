package tshimologong.com.tshimologong.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PreferenceDTO {
    @NotNull
    private Long questionId;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer response;
}

