import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdvertsComponent } from './admin-adverts.component';

describe('AdminAdvertsComponent', () => {
  let component: AdminAdvertsComponent;
  let fixture: ComponentFixture<AdminAdvertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdvertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdvertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
