import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirplusdetailsComponent } from './voirplusdetails.component';

describe('VoirplusdetailsComponent', () => {
  let component: VoirplusdetailsComponent;
  let fixture: ComponentFixture<VoirplusdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoirplusdetailsComponent]
    });
    fixture = TestBed.createComponent(VoirplusdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
