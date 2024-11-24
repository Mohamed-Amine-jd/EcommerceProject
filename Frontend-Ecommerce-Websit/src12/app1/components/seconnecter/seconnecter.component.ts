import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-seconnecter',
  templateUrl: './seconnecter.component.html',
  styleUrls: ['./seconnecter.component.css']
})
export class SeconnecterComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,public sharedService: SharedService) {
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      md: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  login(form: NgForm): void {
    if (form.valid) {
      const { phone, md } = form.value;
      const tel=form.value.phone;
      this.sharedService.setTel(tel);
      this.userService.login(phone, md).subscribe(
        (response: any) => {
          console.log('Server Response:', response);

          const role = response.role;
         ;
          if (role === 'user') {
            this.router.navigate(['/homeuser']);
          } else if (role === 'admin') {
            this.router.navigate(['/homeadmin']);
          } else {
            console.error('Unknown role:', role);
            // Handle other roles or show an error message
          }
        },
        error => {
         
          alert('Login failed');
        }
      );
    }
  }
}
