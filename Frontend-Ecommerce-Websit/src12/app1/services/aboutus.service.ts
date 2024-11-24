// aboutus.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aboutus } from '../interfaces/aboutus';  // Assurez-vous d'ajuster le chemin en fonction de votre structure de projet

@Injectable({
  providedIn: 'root'
})
export class AboutusService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getAboutusList(): Observable<Aboutus[]> {
    return this.http.get<Aboutus[]>(`${this.apiServerUrl}/about/all`);
  }

  public addAboutus(aboutus: Aboutus): Observable<Aboutus> {
    return this.http.post<Aboutus>(`${this.apiServerUrl}/about/add`, aboutus);
  }

  public updateAboutus(aboutus: Aboutus): Observable<Aboutus> {
    return this.http.put<Aboutus>(`${this.apiServerUrl}/about/update`, aboutus);
  }

  public deleteAboutus(aboutusId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/about/delete/${aboutusId}`);
  }
}