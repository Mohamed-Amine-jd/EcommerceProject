import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';  
import { User } from 'src/app/interfaces/user';  
import { ToastrService } from 'ngx-toastr'; 
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public users: User[] = [];

  constructor(private toastr: ToastrService,private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public deleteuser(user: User): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur : ${user.nom} ?`)) {
      this.userService.deleteUser(user.phone).subscribe(
        () => {
          this.toastr.error('L\'utilisateur a été supprimé avec succès', 'Succès');
         
          this.getUsers();
        }
      );
      }}

  
  }



