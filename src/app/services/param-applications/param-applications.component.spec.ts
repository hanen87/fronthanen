import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamApplicationsComponent } from './param-applications.component';

describe('ParamApplicationsComponent', () => {
  let component: ParamApplicationsComponent;
  let fixture: ComponentFixture<ParamApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
