import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamServicesComponent } from './param-services.component';

describe('ParamServicesComponent', () => {
  let component: ParamServicesComponent;
  let fixture: ComponentFixture<ParamServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
