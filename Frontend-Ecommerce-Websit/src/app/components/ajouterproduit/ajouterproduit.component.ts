import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ajouterproduit',
  templateUrl: './ajouterproduit.component.html',
  styleUrls: ['./ajouterproduit.component.css','../../../styles.css']
})
export class AjouterproduitComponent {

  public produits: Produit[] = [];
constructor(private toastr: ToastrService,private fb : FormBuilder  ,private produitService:ProduitService , private router : Router) {}

ngOnInit() {
  this.getProduits();
}

public getProduits(): void {
  this.produitService.getProduits().subscribe(
    (response: Produit[]) => {
      this.produits = response;
         },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

/*
public ajouterproduit(donnee: NgForm): void {
  if (donnee.valid) {
    const produit: Produit = donnee.value;
      produit.sponso = donnee.value.sponsored;
    const userPhone =localStorage.getItem('tel')!;
   
    donnee.value.phoneuser=userPhone;
    localStorage.setItem('addFormData', JSON.stringify(donnee.value));
    this.produitService.addProduit(donnee.value).subscribe(
      
      (response: Produit | string) => {
        localStorage.setItem("produit",donnee.value);
        if (typeof response === 'string') {
          
          window.location.href = response;
          this.getProduits();
        } else {
          console.log('Response is a Produit object:', response);
          
        }
        this.getProduits();
        this.toastr.success('Produit ajouté avec succès','Succès');
        this.router.navigate(['/homeuser']);
      }
    );
  }
}*/

public ajouterproduit(donnee: NgForm): void {
  if (donnee.valid) {
    const produit: Produit = donnee.value;
    produit.sponso = donnee.value.sponsored; // Ensure this assignment is correct
    const userPhone = localStorage.getItem('tel')!;
    donnee.value.phoneuser = userPhone;

    console.log('Produit to be sent:', produit); // Log the produit object to inspect its structure

    this.produitService.addProduit(produit).subscribe(
      (response: Produit | string) => {
        console.log('Response from server:', response); // Log the response for debugging purposes

        if (typeof response === 'string') {
          window.location.href = response;
        } else {
          console.log('Response is a Produit object:', response);
        }

        this.toastr.success('Produit ajouté avec succès', 'Succès');
        this.router.navigate(['/homeuser']);
      },
      (error) => {
        console.error('Error adding produit:', error); // Log any errors that occur during the HTTP request
        // Handle error (e.g., show error message to user)
      }
    );
  }
}





}
