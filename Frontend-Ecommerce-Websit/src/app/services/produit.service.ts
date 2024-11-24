import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Produit } from '../interfaces/produit';
@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiServerUrl =  'http://localhost:8080';
  constructor(private http: HttpClient) { }


  
  public getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiServerUrl}/produit/all`);
  }
  public addProduit(produit: Produit): Observable<Produit | string> {
    console.log('Produit to be added:', produit); 
  
    if (produit.sponso === 'OUI') {
      return this.http.post<string>(`${this.apiServerUrl}/produit/payment`, produit, { responseType: 'text' as 'json' });
    } else {
      return this.http.post<Produit>(`${this.apiServerUrl}/produit/add`, produit);
    }
  }

  public updateProduit(produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiServerUrl}/produit/update`, produit);
  }

  public deleteProduit(produitId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/produit/delete/${produitId}`);
  }
  public getProduitById(productId: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiServerUrl}/produit/find/${productId}`);
  }
  public getProduitsByUserPhone(userPhone: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiServerUrl}/produit/byUserPhone/${userPhone}`);
  }
 
  public getProduitsBySponso(sponso: string): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiServerUrl}/produit/bySponso/${sponso}`);
  }
  public changeSponsoProducToPaye(){
    
  }
}
