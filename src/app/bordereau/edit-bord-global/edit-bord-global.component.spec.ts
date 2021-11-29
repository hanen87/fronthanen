import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBordGlobalComponent } from './edit-bord-global.component';

describe('EditBordGlobalComponent', () => {
  let component: EditBordGlobalComponent;
  let fixture: ComponentFixture<EditBordGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBordGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBordGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
