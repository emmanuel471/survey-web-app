package tshimologong.com.tshimologong.service_interfaces;

import java.util.List;
import java.util.Optional;

import tshimologong.com.tshimologong.dto.UserDTO;

public interface UserServiceInterface {
    boolean emailExists(String email);
    UserDTO createUser(UserDTO userDto);
    Optional<UserDTO> getUserById(Long id);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(Long id, UserDTO userDto);
    void deleteUser(Long id);
}
