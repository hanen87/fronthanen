import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevocationComponent } from './revocation.component';

describe('RevocationComponent', () => {
  let component: RevocationComponent;
  let fixture: ComponentFixture<RevocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
