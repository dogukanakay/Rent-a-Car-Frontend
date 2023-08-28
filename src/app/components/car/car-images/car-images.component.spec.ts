import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarImagesComponent } from './car-images.component';

describe('CarImagesComponent', () => {
  let component: CarImagesComponent;
  let fixture: ComponentFixture<CarImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarImagesComponent]
    });
    fixture = TestBed.createComponent(CarImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
