import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDemandeActifComponent } from './new-demande-actif.component';

describe('NewDemandeActifComponent', () => {
  let component: NewDemandeActifComponent;
  let fixture: ComponentFixture<NewDemandeActifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDemandeActifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDemandeActifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
