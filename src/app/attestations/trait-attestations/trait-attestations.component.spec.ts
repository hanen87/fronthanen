import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitAttestationsComponent } from './trait-attestations.component';

describe('TraitAttestationsComponent', () => {
  let component: TraitAttestationsComponent;
  let fixture: ComponentFixture<TraitAttestationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitAttestationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitAttestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
