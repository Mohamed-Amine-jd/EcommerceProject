import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getContacts();
  }

  public getContacts(): void {
    this.contactService.getContacts().subscribe(
      (response: Contact[]) => {
        this.contacts = response;
        console.log(this.contacts);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public supprimerMessage(msg: Contact): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le message : ${msg.id} ?`)) {
      this.contactService.deletecontact(msg.id).subscribe(
        () => {
          console.log(`message ${msg.id} supprimé avec succès.`);
          // Mettez à jour la liste des utilisateurs après la suppression
          this.getContacts();
        },
        (error: HttpErrorResponse) => {
          console.error(`Erreur lors de la suppression deu message : ${error.message}`);
          // Gérez les erreurs de suppression ici
        }
      );
      }}

}