import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';



const password = 'myPassword123';

import{ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-sinscrire',
  templateUrl: './sinscrire.component.html',
  styleUrls: ['./sinscrire.component.css']
})

export class SinscrireComponent implements OnInit {
  public users: User[] = [];
  public addForm!: FormGroup;
  constructor(private toastr: ToastrService,private fb: FormBuilder, private auth: UserService, private router: Router) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      nom: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z]*$/)]],
      prenom: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z]*$/)]],
      adresse: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/[1-9]\d*/)]],
      md: ['', [Validators.required]]
    });
  }

  public ajouterutilisateur(): void {
    if (this.addForm.valid) {
      this.addForm.value.role='user'; 
      const user: User = this.addForm.value;
      this.auth.addUser(user).subscribe(
        (response: User) => {
         this.toastr.success('Inscription réussie','succès');
            this.getUsers();
          this.addForm.reset();
          this.router.navigate(['/seconnecter']);
        }
      );
    }
  }

  public getUsers(): void {
    this.auth.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
