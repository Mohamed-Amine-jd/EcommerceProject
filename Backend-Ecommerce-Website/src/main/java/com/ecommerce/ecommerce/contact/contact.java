package com.ecommerce.ecommerce.contact;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private long phone;
    private String message;

    public contact(Long id, String nom, String prenom, long phone, String message) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.phone = phone;
        this.message = message;
    }

    public contact() {

    }

    @Override
    public String toString() {
        return "contact{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", phone=" + phone +
                ", message='" + message + '\'' +
                '}';
    }
}