
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aboutus } from 'src/app/interfaces/aboutus';  // Assurez-vous d'ajuster le chemin en fonction de votre structure de projet
import { AboutusService } from 'src/app/services/aboutus.service';  // Assurez-vous d'ajuster le chemin en fonction de votre structure de projet
import { SharedService } from 'src/app/services/shared.service';
;
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutUsComponent implements OnInit {

  public aboutusList: Aboutus[] = [];
  public isEditing: boolean = false;
  constructor(private aboutUsService: AboutusService,private sharedService: SharedService) { }


  ngOnInit() {
    this.isEditing = !this.sharedService.getTel();
    this.getAboutUsList();
  }

  public getAboutUsList(): void {
    this.aboutUsService.getAboutusList().subscribe(
      (response: Aboutus[]) => {
        this.aboutusList = response;
        console.log(this.aboutusList);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}

