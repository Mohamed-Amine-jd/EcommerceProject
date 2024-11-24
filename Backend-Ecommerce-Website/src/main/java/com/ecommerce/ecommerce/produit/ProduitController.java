package com.ecommerce.ecommerce.produit;


import com.ecommerce.ecommerce.payment.Payement;
import com.ecommerce.ecommerce.payment.PayementService;
import com.ecommerce.ecommerce.user.User;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.model.checkout.Session;
import com.ecommerce.ecommerce.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/produit")
public class ProduitController {
    @Autowired
    private PayementService payementService;

    @Autowired
    private ProduitService produitService;
    @Autowired
    private UserService userService ;



    @GetMapping("/all")
    public ResponseEntity<List<Produit>> getAllProduits() {
        List<Produit> produits = produitService.findAllPrduit();
        return new ResponseEntity<>(produits, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Produit> getUserById(@PathVariable("id") Long id) {
        Produit produit = produitService.findProduitById(id);
        if (produit != null) {
            return new ResponseEntity<>(produit, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Produit> addProduit(@RequestBody Produit produit) {
        System.out.println(produit);
        Produit newProduit = produitService.addProduit(produit);
        System.out.println(produit.getPhoneuser());
        System.out.println(produit.getPhoneprod());
        System.out.println(produit.getSponso());
        if(produit.getPhoneuser()!=null && produit.getSponso().equals("OUI")){
            User loggedUser = userService.findUserById(produit.getPhoneuser());
            Payement nC = new Payement(produit.getId(),produit.getPhoneprod(),loggedUser.getNom(),loggedUser.getPrenom(),loggedUser.getAdresse());
            Payement newPayement = payementService.addPayement(nC);
        }
        return new ResponseEntity<>(newProduit, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Produit> updateProduit(@RequestBody Produit produit) {
        Produit updateProduit = produitService.updateProduit(produit);
        return new ResponseEntity<>(updateProduit, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        produitService.deleteProduit(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/byUserPhone/{phone}")
    public ResponseEntity<List<Produit>> getProduitsByUserPhone(@PathVariable("phone") Long phone) {
        List<Produit> produits = produitService.findProduitsByUserPhone(phone);
        return new ResponseEntity<>(produits, HttpStatus.OK);
    }


    @GetMapping("/bySponso/{sponso}")
    public ResponseEntity<List<Produit>> getProduitsBySponso(@PathVariable("sponso") String sponso) {
        List<Produit> produits = produitService.findProduitsBySponso(sponso);
        return new ResponseEntity<>(produits, HttpStatus.OK);
    }

    @PostMapping("/payment")
    public String createCheckoutSession(@RequestBody Produit produit) throws StripeException {
        Stripe.apiKey = "sk_test_51OkBnbD2DikGESyEx6iTgmuBX8Nh5jaTFyUsTLWwhCwy9jjCXicJBrwIrrBJsmHMJDCeUQvEH5ayRsFSaKFXxOA2008Cz7uo1G";
        System.out.println(produit);

        SessionCreateParams.Builder builder = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:4200/success")
                .setCancelUrl("http://localhost:4200/cancel");

        // Add line items for your products
        builder.addLineItem(SessionCreateParams.LineItem.builder()
                .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                        .setCurrency("usd")
                        .setProductData(
                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName(produit.getTitre())
                                        .build()
                        )
                        .setUnitAmount(300L) // Stripe expects amount in cents
                        .build())
                .setQuantity(1L)
                .build());

        Session session = Session.create(builder.build());
        System.out.println(session.getUrl());
        return session.getUrl() ;
    }

}
