import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css',]
})
export class HomeAdminComponent {
  public allProduits: Produit[] = [];
  activeIndex: number = 0;
  iterationCount: number = 0;
  public filteredProduits: Produit[] = [];
  public produits: Produit[] = [];
  public sponso: Produit[] = [];
  isEditing: boolean = false;
  constructor(private produitService: ProduitService,public router:Router) {}



  ngOnInit() {
    this.getProduits();
  }

  public getProduits(): void {
    this.produitService.getProduits().subscribe(
      (response: Produit[]) => {
        this.allProduits = response;
        this.produits = response.filter((produit) => produit.sponso === 'NON');
        this.sponso = response.filter((produit) => produit.sponso === 'ajout');
        this.filteredProduits =this.produits;
        this.isEditing = this.sponso.length > 0;
        console.log(this.allProduits);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public rechercherProds(key: string): void {
    const searchQuery = key ? key.toLowerCase() : '';
    this.filteredProduits = this.allProduits.filter(produit => {
      const productTitle = produit.titre ? produit.titre.toLowerCase() : '';
      return productTitle.includes(searchQuery) && produit.sponso !== 'ajout';
    });
  
    this.sponso = this.allProduits.filter(produit => {
      const productTitle = produit.titre ? produit.titre.toLowerCase() : '';
      return productTitle.includes(searchQuery) && produit.sponso === 'ajout';
    });
    if (!key) {
      this.affichertoutprods();
    }
    this.isEditing = this.sponso.length > 0;
  }
 
  affichertoutprods(): void {
    this.produits = this.allProduits.filter((product) => product.sponso === 'NON');
    this.sponso = this.allProduits.filter((product) => product.sponso === 'ajout');
    this.filteredProduits =this.produits;
  }
  
 
  prendrenomFile(filePath: string): string {
    const lastBackslashIndex = filePath.lastIndexOf('\\');  
    const fileName = filePath.slice(lastBackslashIndex + 1);
    return `../../../assets/${fileName}`;
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
  logOut() {
   localStorage.removeItem('tel');
    sessionStorage.clear();
    this.router.navigate(['/produit']);
  }
}

