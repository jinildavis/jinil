import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStuffingComponent } from './add-stuffing.component';

describe('AddStuffingComponent', () => {
  let component: AddStuffingComponent;
  let fixture: ComponentFixture<AddStuffingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStuffingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStuffingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
