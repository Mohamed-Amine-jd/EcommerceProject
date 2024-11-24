import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
@Injectable({ providedIn: 'root' })

@Injectable({providedIn: 'root'})
export class UserService {

  private apiServerUrl =  'http://localhost:8080';

  constructor(private http: HttpClient){}

  
  login(phone: string, md: string): Observable<any> {
    const body = { phone, md };
    return this.http.post(`${this.apiServerUrl}/login`, body);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/users/all`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/users/add`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/users/update`, user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/users/delete/${userId}`);
  }

  getUserByPhone(phone: number): Observable<User> {
    // Assurez-vous que votre API prend en charge cette requête
    const url = `${this.apiServerUrl}/users/find/${phone}`;
    return this.http.get<User>(url);
  }
}
