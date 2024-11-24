import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiServerUrl =  'http://localhost:8080';
  constructor(private http: HttpClient) { }


  
  public getPayment(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiServerUrl}/payement/all`);
  }

  public deletepay(payId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/payement/delete/${payId}`);
  }
}
