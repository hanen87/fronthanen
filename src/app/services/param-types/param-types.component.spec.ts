import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamTypesComponent } from './param-types.component';

describe('ParamTypesComponent', () => {
  let component: ParamTypesComponent;
  let fixture: ComponentFixture<ParamTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
