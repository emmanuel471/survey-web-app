package tshimologong.com.tshimologong.controllers;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import tshimologong.com.tshimologong.dto.UserDTO;
import tshimologong.com.tshimologong.service_interfaces.UserServiceInterface;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceInterface userService;

    @PostMapping("/submit-survey")
    public ResponseEntity<Map<String, String>> submitSurvey(@RequestBody @Valid UserDTO userDto) {
        try {
            if (userService.emailExists(userDto.getEmail())) {
              
                return ResponseEntity.ok(Map.of("message", "Email already exists. Survey submission noted."));
            }

            userService.createUser(userDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", "Survey submitted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "An unexpected error occurred"));
        }
    }

}
