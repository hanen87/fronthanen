import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SousBordereauComponent } from './sous-bordereau.component';

describe('SousBordereauComponent', () => {
  let component: SousBordereauComponent;
  let fixture: ComponentFixture<SousBordereauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SousBordereauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SousBordereauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
