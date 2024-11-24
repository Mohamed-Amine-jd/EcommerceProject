import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutercontactComponent } from './ajoutercontact.component';

describe('AjoutercontactComponent', () => {
  let component: AjoutercontactComponent;
  let fixture: ComponentFixture<AjoutercontactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutercontactComponent]
    });
    fixture = TestBed.createComponent(AjoutercontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
