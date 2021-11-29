import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetSousbordereauComponent } from './det-sousbordereau.component';

describe('DetSousbordereauComponent', () => {
  let component: DetSousbordereauComponent;
  let fixture: ComponentFixture<DetSousbordereauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetSousbordereauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetSousbordereauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
