import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-produitsponso',
  templateUrl: './produitsponso.component.html',
  styleUrls: ['./produitsponso.component.css']
})
export class ProduitsponsoComponent {
public produits : Produit [] =[];
sponso: string = '';
constructor(private produitService: ProduitService) {}

ngOnInit(): void {
  this.getProduits();
}

getProduits(): void {
  this.sponso = 'OUI';
  this.produitService.getProduitsBySponso(this.sponso).subscribe(
    (response: Produit[]) => {
      this.produits = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
Delete(id:number){
  this.produitService.deleteProduit(id).subscribe(
    (response: void) => {
      console.log(response);
      this.getProduits();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
AjouterSponso(produit: Produit): void {
  produit.sponso = 'ajout'; // Update the 'sponso' attribute
  this.produitService.updateProduit(produit).subscribe(
    () => {
      console.log('Product added successfully');
      this.getProduits();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
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