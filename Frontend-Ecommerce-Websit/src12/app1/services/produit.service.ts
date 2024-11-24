import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  public addProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiServerUrl}/produit/add`, produit);
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
}
