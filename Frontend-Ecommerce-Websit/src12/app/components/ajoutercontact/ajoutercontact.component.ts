import { Component } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-ajoutercontact',
  templateUrl: './ajoutercontact.component.html',
  styleUrls: ['./ajoutercontact.component.css','../../../styles.css']
})
export class AjoutercontactComponent {
  public contacts: Contact[] = [];
  constructor(private fb : FormBuilder  , private contactService:ContactService , private router : Router) {}

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

  public onAddContact(addForm: NgForm): void {
    if (addForm.valid) {
      const contact: Contact = addForm.value;
    this.contactService.addContact(addForm.value).subscribe(
      (response: Contact) => {
        console.log(response);
        this.getContacts;
        addForm.reset();
        this.router.navigate(['/homeuser']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }


  }
}