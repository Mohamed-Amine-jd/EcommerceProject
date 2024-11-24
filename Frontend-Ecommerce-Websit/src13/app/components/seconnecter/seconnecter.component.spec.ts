import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeconnecterComponent } from './seconnecter.component';

describe('SeconnecterComponent', () => {
  let component: SeconnecterComponent;
  let fixture: ComponentFixture<SeconnecterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeconnecterComponent]
    });
    fixture = TestBed.createComponent(SeconnecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
