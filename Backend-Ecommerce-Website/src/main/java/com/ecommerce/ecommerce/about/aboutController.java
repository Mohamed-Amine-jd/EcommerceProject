package com.ecommerce.ecommerce.about;

import com.ecommerce.ecommerce.contact.contact;
import com.ecommerce.ecommerce.contact.contactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/about")
public class aboutController {

    @Autowired
    private aboutService aboutService;

    @GetMapping("/all")
    public ResponseEntity<List<about>> getAllabout() {
        List<about> abouts = aboutService.findAllabout();
        return new ResponseEntity<>(abouts, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<about> updateabout(@RequestBody about about) {
        about updateabout = aboutService.updateabout(about);
        return new ResponseEntity<>(updateabout, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<about> addabout(@RequestBody about about) {
        about newabout = aboutService.addabout(about);
        return new ResponseEntity<>(newabout, HttpStatus.CREATED);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteabout(@PathVariable("id") Long id) {
        aboutService.deleteabout(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}