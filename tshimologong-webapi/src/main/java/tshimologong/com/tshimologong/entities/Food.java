package tshimologong.com.tshimologong.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.Set;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long foodId;

    @NotBlank
    @Column(unique = true, nullable = false)
    private String foodName;

    @OneToMany(mappedBy = "favoriteFood")
    @JsonManagedReference  
    private Set<User> users;
}
