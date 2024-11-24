import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-succes',
  templateUrl: './succes.component.html',
  styleUrls: ['./succes.component.css']
})
export class SuccesComponent {
  constructor(private produitService : ProduitService,private http:HttpClient){}
  ngOnInit(): void {
    this.changeSponsoProducToPaye()
    
  }
  private apiServerUrl =  'http://localhost:8080';
  public changeSponsoProducToPaye() {
    const formData = JSON.parse(localStorage.getItem('addFormData') || '{}');
    const phoneUser = localStorage.getItem('tel');
    console.log(phoneUser);
  
    if (phoneUser !== null) {
      // Parse phoneUser to integer explicitly
      const parsedPhoneUser = parseInt(phoneUser, 10);
      console.log(parsedPhoneUser);
      this.http.post<Produit>(`${this.apiServerUrl}/produit/add`, {...formData, phoneuser: parsedPhoneUser.toString()}).subscribe(
        (response) => {
          console.log('Product added:', response);
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      console.error('Phone number not found in localStorage.');
    }
    localStorage.removeItem( 'addFormData' ) ;
    localStorage.removeItem('produit');
  }
  
}
