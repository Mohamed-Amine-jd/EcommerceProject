package com.ecommerce.ecommerce.payment;

import com.ecommerce.ecommerce.payment.Payement;
import com.ecommerce.ecommerce.payment.PayementService;
import com.ecommerce.ecommerce.produit.Produit;
import com.ecommerce.ecommerce.produit.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/payement")
public class PayementController {
    @Autowired
    private PayementService payementService;

    @PostMapping("/add")
    public ResponseEntity<Payement> addPayement(@RequestBody Payement payement) {
        System.out.println(payement);
        Payement newPayement = payementService.addPayement(payement);
        return new ResponseEntity<>(newPayement, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Payement>> getAllPayements() {
        List<Payement> payements = payementService.findAllPayement();
        return new ResponseEntity<>(payements, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePayement(@PathVariable("id") Long id) {
        payementService.deletePay(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
