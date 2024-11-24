import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Aboutus } from 'src/app/interfaces/aboutus';
import { AboutusService } from 'src/app/services/aboutus.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editabout',
  templateUrl: './editabout.component.html',
  styleUrls: ['./editabout.component.css']
})
export class EditaboutComponent implements OnInit {
  public aboutusList: Aboutus[] = [];
  public editAboutusForm: FormGroup;
  public isEditing: boolean = false;
  public editedAboutus: Aboutus = { id: 0, aboutus: '' };

  constructor(private fb: FormBuilder, private aboutService: AboutusService, private router: Router) {
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
    this.isEditing = true;
    this.editedAboutus = { ...aboutus }; // Copy the current aboutus object
    this.editAboutusForm.patchValue({ aboutus: aboutus.aboutus }); // Set the form value
  }

  public onCancelEdit(): void {
    this.isEditing = false;
  }



public onEditAboutus(): void {
  // Récupérez l'ID de l'élément que vous souhaitez éditer
  const aboutusId: number =7 /* Code pour récupérer l'ID */;

  // Construisez l'objet Aboutus à partir du formulaire
  const editedAboutus: Aboutus = {
    id: aboutusId,
    aboutus: this.editAboutusForm.value.aboutus
  };

  // Appelez le service pour mettre à jour l'élément
  this.aboutService.updateAboutus(editedAboutus).subscribe(
    () => {
      console.log('Aboutus updated successfully.');
      this.router.navigate(['/homeadmin']);
      // Ajoutez toute action supplémentaire après la mise à jour
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
}

