import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEmailVerificationComponent } from './show-email-verification.component';

describe('ShowEmailVerificationComponent', () => {
  let component: ShowEmailVerificationComponent;
  let fixture: ComponentFixture<ShowEmailVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEmailVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
