package com.ecommerce.ecommerce.contact;

import com.ecommerce.ecommerce.produit.Produit;
import com.ecommerce.ecommerce.produit.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/contact")
public class contactController {

    @Autowired
    private contactService contactService;

    @GetMapping("/all")
    public ResponseEntity<List<contact>> getAllcontact() {
        List<contact> contacts = contactService.findAllcontact();
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<contact> getcontactById(@PathVariable("id") Long id) {
        contact contact = contactService.findcontactById(id);
        if (contact != null) {
            return new ResponseEntity<>(contact, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<contact> addcontact(@RequestBody contact contact) {
        contact newcontact = contactService.addcontact(contact);
        return new ResponseEntity<>(newcontact, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<contact> updatecontact(@RequestBody contact contact) {
        contact updatecontact = contactService.updatecontact(contact);
        return new ResponseEntity<>(updatecontact, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletecontact(@PathVariable("id") Long id) {
        contactService.deletecontact(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
