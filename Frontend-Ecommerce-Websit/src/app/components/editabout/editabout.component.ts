import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Aboutus } from 'src/app/interfaces/aboutus';
import { AboutusService } from 'src/app/services/aboutus.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import{ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-editabout',
  templateUrl: './editabout.component.html',
  styleUrls: ['./editabout.component.css']
})
export class EditaboutComponent implements OnInit {
  public aboutusList: Aboutus[] = [];
  public editAboutusForm: FormGroup;
  public editedAboutus: Aboutus = { id: 0, aboutus: '' };

  constructor(private toastr: ToastrService,private fb: FormBuilder, private aboutService: AboutusService, private router: Router) {
    this.editAboutusForm = this.fb.group({
      aboutus: ['']
    });
  }

  ngOnInit() {
    this.getAboutus();
  }

  public getAboutus(): void {
    this.aboutService.getAboutusList().subscribe(
      (response: Aboutus[]) => {
        this.aboutusList = response;
        console.log(this.aboutusList);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public onEditClick(aboutus: Aboutus): void {
    this.editedAboutus = { ...aboutus }; 
    this.editAboutusForm.patchValue({ aboutus: aboutus.aboutus }); 
  }

public onEditAboutus(): void {
  const aboutusId: number =8 
  const editedAboutus: Aboutus = {
    id: aboutusId,
    aboutus: this.editAboutusForm.value.aboutus
  };
  this.aboutService.updateAboutus(editedAboutus).subscribe(
    () => {
      this.toastr.success('Aboutus updated successfully.','success');
      this.router.navigate(['/homeadmin']);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
}

