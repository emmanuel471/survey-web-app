package tshimologong.com.tshimologong.service_implemetations;

import org.springframework.stereotype.Service;
import tshimologong.com.tshimologong.entities.Food;
import tshimologong.com.tshimologong.repositories.FoodRepository;
import tshimologong.com.tshimologong.service_interfaces.FoodServiceInterface;
import java.util.List;
import java.util.Optional;

@Service
public class FoodServiceImpl implements FoodServiceInterface {

    private final FoodRepository foodRepository;

    public FoodServiceImpl(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @Override
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    @Override
    public Food getFoodById(Long id) {
        Optional<Food> food = foodRepository.findById(id);
        return food.orElse(null);
    }
}
