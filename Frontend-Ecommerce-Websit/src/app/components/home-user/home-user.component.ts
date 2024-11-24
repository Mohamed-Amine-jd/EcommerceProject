import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';


@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent {
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
  
    // Filter sponsored products
    this.sponso = this.allProduits.filter(produit => {
      const productTitle = produit.titre ? produit.titre.toLowerCase() : '';
      return productTitle.includes(searchQuery) && produit.sponso === 'ajout';
    });
    if (!key) {
      this.affichertoutprods();
    }
    this.isEditing = this.sponso.length > 0;
  }
 
    rechercherparcategorie(category: string): void {
    this.sponso = this.allProduits.filter((product) => product.nomcateg === category && product.sponso === 'ajout');
    this.produits = this.allProduits.filter((product) => product.nomcateg === category && product.sponso === 'NON');

    this.filteredProduits =this.produits;
  }
  affichertoutprods(): void {
    this.produits = this.allProduits.filter((product) => product.sponso === 'NON');
    this.sponso = this.allProduits.filter((product) => product.sponso === 'ajout');
    this.filteredProduits =this.produits;
  }
  
  
  details(product: Produit) {
    this.router.navigate(['/product', product.id]);
  }
  prendrenomFile(filePath: string): string {
    const lastBackslashIndex = filePath.lastIndexOf('\\');  // Utilisez "\\" pour représenter le caractère "\"

    // Utilisez la méthode slice pour extraire la partie après le dernier "\"
    const fileName = filePath.slice(lastBackslashIndex + 1);

    // Retournez le nom du fichier
    return `../../../assets/${fileName}`;
}


  logOut() {
    localStorage.removeItem('tel')
    this.router.navigate(['/produit']);
  }
}