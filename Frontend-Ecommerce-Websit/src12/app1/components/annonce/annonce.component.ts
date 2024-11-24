import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {

  annonces: Produit[] = [];
  userPhone: number = 0;

  isEditing: boolean = false;
  editedProduct: Partial<Produit> = {};

  constructor(private produitService: ProduitService, public sharedService: SharedService) {}

  ngOnInit(): void {
    this.getProduits();
  }

  getProduits(): void {
    this.userPhone = this.sharedService.getTel();
    this.produitService.getProduitsByUserPhone(this.userPhone).subscribe(
      (response: Produit[]) => {
        this.annonces = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  Delete(id: number): void {
    this.produitService.deleteProduit(id).subscribe(
      () => {
        console.log('Produit supprimé avec succès');
        this.getProduits();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  showEditForm(produit: Produit): void {
    this.editedProduct = { ...produit };
    this.isEditing = true;
  }

  public cancelEdit(): void {
    this.isEditing = false;
  }
  updateProduct(form: NgForm): void {
    if (this.editedProduct.id !== undefined) {
      // Vérifiez si 'id' est défini avant de faire la mise à jour
      this.produitService.updateProduit(this.editedProduct as Produit).subscribe(
        (response: Produit) => {
          console.log('Produit mis à jour avec succès:', response);
          this.isEditing = false;
          this.getProduits();
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la mise à jour du produit:', error);
        }
      );
    } else {
      console.error('ID du produit non défini. Impossible de mettre à jour.');
    }
  }
  getFileName(filePath: string): string {
    const lastBackslashIndex = filePath.lastIndexOf('\\');  // Utilisez "\\" pour représenter le caractère "\"

    // Utilisez la méthode slice pour extraire la partie après le dernier "\"
    const fileName = filePath.slice(lastBackslashIndex + 1);
    console.log(fileName);

    // Retournez le nom du fichier
    return `../../../assets/${fileName}`;
}

}