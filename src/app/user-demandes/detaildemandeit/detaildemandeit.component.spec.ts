import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildemandeitComponent } from './detaildemandeit.component';

describe('DetaildemandeitComponent', () => {
  let component: DetaildemandeitComponent;
  let fixture: ComponentFixture<DetaildemandeitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaildemandeitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaildemandeitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
