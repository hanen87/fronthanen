import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetDemandeComponent } from './det-demande.component';

describe('DetDemandeComponent', () => {
  let component: DetDemandeComponent;
  let fixture: ComponentFixture<DetDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
