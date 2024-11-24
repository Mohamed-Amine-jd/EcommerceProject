import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';

import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-detail-component',
  templateUrl: './product-detail-component.component.html',
  styleUrls: ['./product-detail-component.component.css']
})
export class ProductDetailComponent {
  produit: Produit = {} as Produit;
  connect: number = 0;
  tels: number[] = [];

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private userService: UserService
   
  ) {}

  ngOnInit() {
    this.connect = localStorage.getItem('tel') ? 1 : 0;
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.produitService.getProduitById(productId).subscribe((produit: Produit) => {
        this.produit = produit;
      });
    });
    const storedPhones = localStorage.getItem('tel');
    if (storedPhones) {
         this.tels = JSON.parse(storedPhones).map(Number);
    }
  }
  ngOnDestroy() {
       localStorage.setItem('tel', JSON.stringify(this.tels));
  }
  signalerProduit(produitId: number): void {
    const userPhone =Number.parseInt( localStorage.getItem('tel')!);
   if (this.tels.includes(userPhone)) {
      this.toastr.error('Vous avez déjà signalé ce produit', 'Erreur');
    } else {
        this.tels.push(userPhone); 
       this.userService.getUserByPhone(this.produit.phoneuser).subscribe(user => {
        if (user) {
          user.minus += 1;
          this.userService.updateUser(user).subscribe(updatedUser => {
           this.toastr.success('Produit signalé avec succès', 'Succès');
          });
        }
      });
    }
  }

  prendrenomFile(filePath: string): string {
      const lastSlashIndex = Math.max(filePath.lastIndexOf('\\'), filePath.lastIndexOf('/'));
    if (lastSlashIndex === -1) {
            return filePath;
    }   const fileName = filePath.slice(lastSlashIndex + 1);
   return `../../../assets/${fileName}`;
}


}