package com.ecommerce.ecommerce.user;

import com.ecommerce.ecommerce.config.ByCryptConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    private ByCryptConfig byCryptConfig;

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        User user = userService.findUserById(loginUser.getPhone());
        boolean correctPassword = byCryptConfig.encoder().matches(loginUser.getMd(),user.getMd());
        if (user != null && correctPassword) {
            // Login successful
            // Return the role as JSON
            return ResponseEntity.ok().body("{\"role\": \"" + user.getRole() + "\"}");
        } else {
            // Login failed
            return new ResponseEntity<>("Invalid phone or password", HttpStatus.UNAUTHORIZED);
        }
    }

}
