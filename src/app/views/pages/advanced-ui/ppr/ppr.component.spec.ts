import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PprComponent } from './ppr.component';

describe('PprComponent', () => {
  let component: PprComponent;
  let fixture: ComponentFixture<PprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PprComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
