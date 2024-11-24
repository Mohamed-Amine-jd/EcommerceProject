import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/contact';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiServerUrl =  'http://localhost:8080';
  constructor(private http: HttpClient) { }



  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiServerUrl}/contact/all`);
  }

  public addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiServerUrl}/contact/add`, contact);
  }

  public updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiServerUrl}/contact/update`, contact);
  }

  public deletecontact(contactId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/contact/delete/${contactId}`);
  }
}