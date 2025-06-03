package tshimologong.com.tshimologong.service_interfaces;

import java.util.List;
import tshimologong.com.tshimologong.entities.Food;

public interface FoodServiceInterface {
    List<Food> getAllFoods();
    Food getFoodById(Long id);
}