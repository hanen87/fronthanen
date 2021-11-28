import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildemandeactifComponent } from './detaildemandeactif.component';

describe('DetaildemandeactifComponent', () => {
  let component: DetaildemandeactifComponent;
  let fixture: ComponentFixture<DetaildemandeactifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaildemandeactifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaildemandeactifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
