import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';  // Adjust the path based on your project structure
import { User } from 'src/app/interfaces/user';  // Adjust the path based on your project structure

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public supprimerUtilisateur(user: User): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur : ${user.nom} ?`)) {
      this.userService.deleteUser(user.phone).subscribe(
        () => {
          console.log(`Utilisateur ${user.nom} supprimé avec succès.`);
          // Mettez à jour la liste des utilisateurs après la suppression
          this.getUsers();
        },
        (error: HttpErrorResponse) => {
          console.error(`Erreur lors de la suppression de l'utilisateur : ${error.message}`);
          // Gérez les erreurs de suppression ici
        }
      );
      }}

  
  }



