import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamEtablissementsComponent } from './param-etablissements.component';

describe('ParamEtablissementsComponent', () => {
  let component: ParamEtablissementsComponent;
  let fixture: ComponentFixture<ParamEtablissementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamEtablissementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamEtablissementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
