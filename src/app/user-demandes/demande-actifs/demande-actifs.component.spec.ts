import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeActifsComponent } from './demande-actifs.component';

describe('DemandeActifsComponent', () => {
  let component: DemandeActifsComponent;
  let fixture: ComponentFixture<DemandeActifsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeActifsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeActifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
