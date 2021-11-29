import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetBordGlobalComponent } from './det-bord-global.component';

describe('DetBordGlobalComponent', () => {
  let component: DetBordGlobalComponent;
  let fixture: ComponentFixture<DetBordGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetBordGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetBordGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
