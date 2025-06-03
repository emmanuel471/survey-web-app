package tshimologong.com.tshimologong.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import tshimologong.com.tshimologong.entities.Food;
import tshimologong.com.tshimologong.service_interfaces.FoodServiceInterface;

@RestController
@RequestMapping("/foods")
public class FoodController {

    @Autowired
    private FoodServiceInterface foodService;

    @GetMapping("/get-all")
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    @GetMapping("/{id}")
    public Food getFoodById(@PathVariable Long id) {
        return foodService.getFoodById(id);
    }
}
