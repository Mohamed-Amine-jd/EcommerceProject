import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {

  annonces: Produit[] = [];
  userPhone: number = Number.parseInt( localStorage.getItem('tel')!);
 

  editedProduct: Partial<Produit> = {};

  constructor( private toastr: ToastrService,private produitService: ProduitService) {}

  ngOnInit(): void {
    this.getProduits();
     console.log(localStorage.getItem('tel')!);
  }

  getProduits(): void {
    this.produitService.getProduitsByUserPhone(this.userPhone).subscribe(
      (response: Produit[]) => {
        this.annonces = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
       
      }
    );
  }

  Delete(id: number): void {
    this.produitService.deleteProduit(id).subscribe(
      () => {
        this.toastr.error('Annonce supprimée avec succès', 'Succès');
         this.getProduits();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  afficherformulaireupdate(produit: Produit): void {
    this.editedProduct = { ...produit };
  }


  miseajourproduit(form: NgForm): void {
    if (this.editedProduct.id !== undefined) {
      this.produitService.updateProduit(this.editedProduct as Produit).subscribe(
        (response: Produit) => {
          this.toastr.success('Annonce mise à jour avec succès', 'Succès');
          this.getProduits();
        }
      );
    }
  }
  prendrenomFile(filePath: string): string {
    const lastBackslashIndex = filePath.lastIndexOf('\\');  
    const fileName = filePath.slice(lastBackslashIndex + 1);
    return `../../../assets/${fileName}`;
}

}