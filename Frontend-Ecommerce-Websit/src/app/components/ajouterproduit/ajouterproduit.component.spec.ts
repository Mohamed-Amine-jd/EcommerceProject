import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterproduitComponent } from './ajouterproduit.component';

describe('AjouterproduitComponent', () => {
  let component: AjouterproduitComponent;
  let fixture: ComponentFixture<AjouterproduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterproduitComponent]
    });
    fixture = TestBed.createComponent(AjouterproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
