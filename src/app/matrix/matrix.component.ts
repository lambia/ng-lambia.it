import { Component, OnInit } from '@angular/core';
// import { StampMatrix } from './stamp.matrix'; //M1
import { Stamp } from './stamp'; //M2
import { STAMPS } from './stamp.mock'; //M3

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})

export class MatrixComponent implements OnInit {

  // matrix: StampMatrix = [{ id: 1, title: 'uno', visible: true }]; //M1
  // matrix: Stamp[] = [{ id: 1, title: 'uno', visible: true }]; //M2
  stamps = STAMPS; //M3
  filteredStamps = STAMPS; //M3

  countries = [];
  categories = [];

  selectedCategory: string;
  selectedCountry: string;
  //ToDo: rimuovere e chiamare direttamente filterMatrix
  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    console.log("Selected stamp: ", category);
    this.filterMatrix("category", category);
  }
  onCountrySelect(country: string): void {
    this.selectedCountry = country;
    console.log("Selected stamp: ", country);
    this.filterMatrix("country", country);
  }

  filterMatrix(property: string, value: string): void {
    this.filteredStamps = this.stamps.filter(stamp => {
      if(stamp[property]) {
        return stamp[property].indexOf(value)>=0;
      } else { //ToDo: sistemare
        return [];
      }
    });
  }

  constructor() { }

  ngOnInit(): void {
    console.log("Matrix init ok");

    //ToDo: usare qualcosa di più efficiente
    this.stamps.map(stamp => {
      stamp.country.map(country => {
        this.countries.push(country);
      });
      stamp.category.map(category => {
        this.categories.push(category);
      });
    });
    this.countries = [...new Set(this.countries)];
    this.categories = [...new Set(this.categories)];

  }

}
