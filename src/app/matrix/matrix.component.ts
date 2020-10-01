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
  selected = {};

  //ToDo: refactoring
  //ToDo: filtri multipli
  //ToDo: selected deve essere un oggetto con tutti i possibili valori, da settare true o false
  filterMatrix(property: string, value?: string): void {
    console.log(`Selected ${property}: ${value}`);

    
    if(this.selected[property] === value) {
      //Se il valore è già selezionato, resetta
      this.selected[property] = null;
      this.filteredStamps = this.stamps;
    } else {
      //Altrimenti
      if(value) {
        //Se c'è un filtro, restituisci il risultato
        this.selected[property] = value;
        this.filteredStamps = this.stamps.filter(stamp => {
          if(stamp[property]) {
            return stamp[property].indexOf(value)>=0;
          } else {
            return [];
          }
        });
      } else {
        //Altrimenti, resetta
        this.selected[property] = null;
        this.filteredStamps = this.stamps;
      }
    }

  }

  //ToDo: refactoring
  distinctFromObjectsArray() {
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

  constructor() { }

  ngOnInit(): void {
    this.distinctFromObjectsArray();
  }

}
