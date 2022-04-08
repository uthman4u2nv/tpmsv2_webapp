import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuagechartComponent } from './guagechart.component';

describe('GuagechartComponent', () => {
  let component: GuagechartComponent;
  let fixture: ComponentFixture<GuagechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuagechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuagechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
