import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-detail-component',
  templateUrl: './product-detail-component.component.html',
  styleUrls: ['./product-detail-component.component.css']
})
export class ProductDetailComponent {
  produit: Produit = {} as Produit;
  connect: number = 0;
  phones: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private userService: UserService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.connect = this.sharedService.getTel();
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.produitService.getProduitById(productId).subscribe((produit: Produit) => {
        this.produit = produit;
      });
    });

    // Load stored phones from browser storage on component initialization
    const storedPhones = localStorage.getItem('phones');
    if (storedPhones) {
      this.phones = JSON.parse(storedPhones);
    }
  }

  ngOnDestroy() {
    // Save phones to browser storage on component destruction
    localStorage.setItem('phones', JSON.stringify(this.phones));
  }
  signalerProduit(produitId: number): void {
    const userPhone = this.sharedService.getTel();

    // Check if the user's phone exists in the local 'phones' array
    if (this.phones.includes(userPhone)) {
      alert('Vous avez déjà signalé !');
    } else {
      // User is signaling for the first time
      this.phones.push(userPhone); // Add the phone to the local array

      // Perform your other signaling logic here
      this.userService.getUserByPhone(this.produit.phoneuser).subscribe(user => {
        if (user) {
          user.minus += 1;
          this.userService.updateUser(user).subscribe(updatedUser => {
            console.log('L\'utilisateur a été mis à jour avec succès:', updatedUser);
          }, error => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
          });
        }
      }, error => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      });
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