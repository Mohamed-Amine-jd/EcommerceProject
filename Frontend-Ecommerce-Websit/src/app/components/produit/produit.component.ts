import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  sponsored: boolean = false;
  activeIndex: number = 0;
  iterationCount: number = 0;
  public allProduits: Produit[] = [];
  public produits: Produit[] = [];
  public sponso: Produit[] = [];
  public filteredProduits: Produit[] = [];

  constructor(private produitService: ProduitService, public router: Router) {}

  ngOnInit() {
    this.getProduits();
  }

  public getProduits(): void {
    this.produitService.getProduits().subscribe(
      (response: Produit[]) => {
        this.allProduits = response;

        this.filteredProduits = this.allProduits.filter((produit) => produit.sponso === 'NON');
        this.sponso = this.allProduits.filter((produit) => produit.sponso === 'ajout');

        this.sponsored = this.sponso.length > 0;

      }
    );
  }
  
  prendrenomFile(filePath: string): string {
    const lastBackslashIndex = filePath.lastIndexOf('\\'); 
      const fileName = filePath.slice(lastBackslashIndex + 1);
    console.log(fileName);

    return `../../../assets/${fileName}`;
}

public searchProduits(key: string): void {
  console.log(key);
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

  // If no search query is specified, show all products
  if (!key) {
    this.showAllProducts();
  }

  // Check if sponsored products are present to activate editing mode
  this.sponsored = this.sponso.length > 0;
}



  showAllProducts(): void {
    this.produits = this.allProduits.filter((product) => product.sponso === 'NON');
    this.sponso = this.allProduits.filter((product) => product.sponso === 'ajout');
    this.filteredProduits =this.produits;
  }
  searchCategory(category: string): void {
    this.sponso = this.allProduits.filter((product) => product.nomcateg === category && product.sponso === 'ajout');
    this.produits = this.allProduits.filter((product) => product.nomcateg === category && product.sponso === 'NON');

    this.filteredProduits = this.produits;
  }

  voirPlus(product: Produit) {
    this.router.navigate(['/product', product.id]);
  }
}
