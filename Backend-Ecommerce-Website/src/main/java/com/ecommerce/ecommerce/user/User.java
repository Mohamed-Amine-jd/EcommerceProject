package com.ecommerce.ecommerce.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class User {
    @Id
    @Column(nullable = false, updatable = false)
    private Long phone;
    private String nom;
    private String prenom;
    private String  md;
    private int minus;
    private String adresse;
    @Column(name = "role", length = 50,  columnDefinition = "VARCHAR(50) DEFAULT 'USER'")
    private String role;
    public User(){}

    public User(Long phone, String nom, String prenom, String md, String adresse,int minus) {
        this.phone = phone;
        this.nom = nom;
        this.prenom = prenom;
        this.md = md;
        this.adresse = adresse;
        this.minus=minus;
    }

    public int getMinus() {
        return minus;
    }

    public void setMinus(int minus) {
        this.minus = minus;
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

    public String getMd() {
        return md;
    }

    public void setMd(String md) {
        this.md = md;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Long getPhone() {
        return phone;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
