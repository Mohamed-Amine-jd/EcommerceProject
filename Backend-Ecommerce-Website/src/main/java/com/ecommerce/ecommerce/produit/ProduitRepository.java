package com.ecommerce.ecommerce.produit;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProduitRepository extends JpaRepository<Produit,Long> {
    List<Produit> findByPhoneuser(Long phoneuser);
    List<Produit> findBySponso(String sponso);


}
