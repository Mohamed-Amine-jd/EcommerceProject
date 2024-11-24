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
  isEditing: boolean = false;
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

        // Apply search condition to both filteredProduits and sponso
        this.filteredProduits = this.allProduits.filter((produit) => produit.sponso === 'NON');
        this.sponso = this.allProduits.filter((produit) => produit.sponso === 'ajout');

        this.isEditing = this.sponso.length > 0;
        console.log(this.allProduits);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  prevSlide() {
    if (this.sponso && this.sponso.length > 0) {


      if(this.activeIndex==0)
      {
        this.activeIndex=Math.floor(this.sponso.length / 3)-1;
      }
      else{
        this.activeIndex = this.activeIndex - 1;
      }
      console.log('Previous Slide. New activeIndex:', this.activeIndex);
    }
  }





  nextSlide() {
    if (this.sponso && this.sponso.length > 0) {

      this.activeIndex = (this.activeIndex + 1) % this.sponso.length;


      this.iterationCount++;


      if (this.iterationCount === Math.floor(this.sponso.length / 3)) {
   
        this.activeIndex = 0;
        this.iterationCount = 0;
      }

      console.log('Next Slide. New activeIndex:', this.activeIndex);
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

public searchProduits(key: string): void {
  console.log(key);
  const results: Produit[] = [];
  const sponsoResults: Produit[] = [];

  for (const produit of this.allProduits) {
    if (
      produit.titre.toLowerCase().includes(key.toLowerCase())
    ) {
      if (produit.sponso === 'NON')
      {
        results.push(produit);
      }



      if (produit.sponso === 'ajout') {
        sponsoResults.push(produit);
      }
    }
  }

  if (key) {
    // Si une clé de recherche est spécifiée, afficher les produits normaux et sponsorisés
    this.filteredProduits = results;
    this.sponso = sponsoResults;
  } else {
    // Si aucune clé de recherche n'est spécifiée, afficher tous les produits
    this.showAllProducts();
  }

  this.isEditing = this.sponso.length > 0;
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
