import { Component, OnInit } from '@angular/core';
import { Rental, RentalDetailFilter } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  rentalFilter:RentalDetailFilter = new RentalDetailFilter();
 
  dataLoaded = false;
  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.rentalService.getRentals(this.rentalFilter).subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }
}
