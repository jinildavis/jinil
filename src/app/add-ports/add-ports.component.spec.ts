import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPortsComponent } from './add-ports.component';

describe('AddPortsComponent', () => {
  let component: AddPortsComponent;
  let fixture: ComponentFixture<AddPortsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPortsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
