import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ajouterproduit',
  templateUrl: './ajouterproduit.component.html',
  styleUrls: ['./ajouterproduit.component.css','../../../styles.css']
})
export class AjouterproduitComponent {

  public produits: Produit[] = [];
constructor(private fb : FormBuilder  ,  private sharedService:SharedService ,private produitService:ProduitService , private router : Router) {}

ngOnInit() {
  this.getProduits();
}

public getProduits(): void {
  this.produitService.getProduits().subscribe(
    (response: Produit[]) => {
      this.produits = response;
      console.log(this.produits);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}


public onAddProduit(addForm: NgForm): void {
  if (addForm.valid) {
    const produit: Produit = addForm.value;
    
    // Extract the value of the "sponsored" radio button
    produit.sponso = addForm.value.sponsored;
    const userPhone = this.sharedService.getTel();
    //addForm.value.phoneuser = userPhone;
      addForm.value.phoneuser=userPhone;
    this.produitService.addProduit(addForm.value).subscribe(
      (response: Produit) => {
        console.log(response);
        this.getProduits();
        // Vous n'avez pas besoin de faire addForm.reset() ici.
        this.router.navigate(['/homeuser']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        // Vous n'avez pas besoin de faire addForm.reset() ici.
      }
    );
  }
}

}
