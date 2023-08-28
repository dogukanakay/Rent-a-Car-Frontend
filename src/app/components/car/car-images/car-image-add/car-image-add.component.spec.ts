import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarImageAddComponent } from './car-image-add.component';

describe('CarImageAddComponent', () => {
  let component: CarImageAddComponent;
  let fixture: ComponentFixture<CarImageAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarImageAddComponent]
    });
    fixture = TestBed.createComponent(CarImageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
