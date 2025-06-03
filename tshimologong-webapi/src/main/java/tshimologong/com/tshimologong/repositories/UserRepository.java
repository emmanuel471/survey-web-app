package tshimologong.com.tshimologong.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tshimologong.com.tshimologong.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
      long countByFavoriteFood_FoodNameIgnoreCase(String foodName);
}
