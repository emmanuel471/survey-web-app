package tshimologong.com.tshimologong.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class UserPreference {

    @EmbeddedId
    private UserPreferenceId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    @JsonBackReference 
    private User user;

    @ManyToOne
    @MapsId("questionId")
    @JoinColumn(name = "question_id")
    @JsonManagedReference  
    private PreferenceQuestion question;

    @Min(1)
    @Max(5)
    @Column(nullable = false)
    private int response;
}
