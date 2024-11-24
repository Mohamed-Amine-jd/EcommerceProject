package com.ecommerce.ecommerce.produit;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String description;
    private String nomcateg;
    private String photo;
    private int prix;
    private Long phoneuser;
    private Long phoneprod;
    private String sponso;




    public Produit(){

    }

    public Produit(Long id, String titre, String description, String nomcateg, String photo, int prix, Long phoneuser,Long phoneprod,String sponso) {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.nomcateg = nomcateg;
        this.photo = photo;
        this.prix = prix;
        this.phoneuser = phoneuser;
        this.phoneprod=phoneprod;
        this.sponso=sponso;


    }

    public String getSponso() {
        return sponso;
    }

    public void setSponso(String sponso) {
        this.sponso = sponso;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNomcateg() {
        return nomcateg;
    }

    public void setNomcateg(String nomcateg) {
        this.nomcateg = nomcateg;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public long getPrix() {
        return prix;
    }

    public void setPrix(int prix) {
        this.prix = prix;
    }

    public Long getPhoneuser() {
        return phoneuser;
    }




    public void setPhoneuser(Long phoneuser) {
        this.phoneuser = phoneuser;
    }

    public Long getPhoneprod() {
        return phoneprod;
    }

    public void setPhoneprod(Long phoneprod) {
        this.phoneprod = phoneprod;
    }
}
