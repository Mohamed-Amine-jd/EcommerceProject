package com.ecommerce.ecommerce.user;


import com.ecommerce.ecommerce.config.ByCryptConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private ByCryptConfig byCryptConfig;

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUser();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/find/{phone}")
    public ResponseEntity<User> getUserById(@PathVariable("phone") Long phone) {
        User user = userService.findUserById(phone);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        String hashedpass =(byCryptConfig.encoder().encode(user.getMd()));


        user.setMd(hashedpass);
        User newUser = userService.addUser(user);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        User updateUser = userService.updateUser(user);
        return new ResponseEntity<>(updateUser, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{phone}")
    public ResponseEntity<?> deleteUser(@PathVariable("phone") Long phone) {
        userService.deleteUser(phone);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}
