package tshimologong.com.tshimologong.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import tshimologong.com.tshimologong.entities.Food;

public interface FoodRepository extends JpaRepository<Food, Long> {
    Optional<Food> findByFoodName(String foodName);
}

