import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankusersComponent } from './bankusers.component';

describe('BankusersComponent', () => {
  let component: BankusersComponent;
  let fixture: ComponentFixture<BankusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
