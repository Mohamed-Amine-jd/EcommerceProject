package com.ecommerce.ecommerce.payment;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class Payement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long produitID;
    private Long phoneuser;
    private float prix;
    private String nom;
    private String prenom;
    private String address;

    public Payement() {
        // No-argument constructor required by JPA
    }
    public Payement(Long produitID, Long phoneuser, String nom, String prenom, String address) {
        this.produitID = produitID;
        this.phoneuser = phoneuser;
        this.prix = 3F;
        this.nom = nom;
        this.prenom = prenom;
        this.address = address;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProduitID() {
        return produitID;
    }

    public void setProduitID(Long produitID) {
        this.produitID = produitID;
    }

    public Long getPhoneuser() {
        return phoneuser;
    }

    public void setPhoneuser(Long phoneuser) {
        this.phoneuser = phoneuser;
    }

    public float getPrix() {
        return prix;
    }

    public void setPrix(float prix) {
        this.prix = prix;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
