package com.ecommerce.ecommerce.produit;


import com.ecommerce.ecommerce.payment.PayementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {


    @Autowired
    private ProduitRepository produitRepository;
    @Autowired
    private PayementRepository payementRepository;

    public List<Produit> findAllPrduit() {
        return produitRepository.findAll();
    }

    public Produit findProduitById(Long id) {
        return produitRepository.findById(id).orElse(null);
    }

    public Produit addProduit(Produit produit) {
        return produitRepository.save(produit);
    }
    public Produit addProduitSponso(Produit produit) {
        return produitRepository.save(produit);
    }

    public  Produit updateProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }
    public List<Produit> findProduitsByUserPhone(Long phoneuser) {
        return produitRepository.findByPhoneuser(phoneuser);
    }


    public List<Produit> findProduitsBySponso(String sponso) {
        return produitRepository.findBySponso(sponso);
    }

}
