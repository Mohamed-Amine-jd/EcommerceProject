import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsponsoComponent } from './produitsponso.component';

describe('ProduitsponsoComponent', () => {
  let component: ProduitsponsoComponent;
  let fixture: ComponentFixture<ProduitsponsoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitsponsoComponent]
    });
    fixture = TestBed.createComponent(ProduitsponsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
