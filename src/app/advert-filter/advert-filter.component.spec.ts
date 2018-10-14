import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertFilterComponent } from './advert-filter.component';

describe('AdvertFilterComponent', () => {
  let component: AdvertFilterComponent;
  let fixture: ComponentFixture<AdvertFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
