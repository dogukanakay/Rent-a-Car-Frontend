import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarImageUpdateComponent } from './car-image-update.component';

describe('CarImageUpdateComponent', () => {
  let component: CarImageUpdateComponent;
  let fixture: ComponentFixture<CarImageUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarImageUpdateComponent]
    });
    fixture = TestBed.createComponent(CarImageUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
