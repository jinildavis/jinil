import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuffinglistComponent } from './stuffinglist.component';

describe('UsersComponent', () => {
  let component: StuffinglistComponent;
  let fixture: ComponentFixture<StuffinglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuffinglistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuffinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
