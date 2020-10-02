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
  filteredStamps = null; //M3

  selected = {};
  //ToDo: cambiare nome
  //ToDo: check init null o {any}
  datasources = null;
  filters = null;

  //ToDo: refactoring
  //ToDo: filtri multipli
  //ToDo: selected deve essere un oggetto con tutti i possibili valori, da settare true o false
  filterData(data: object[], property?: string, value?: string): {} {
    console.log(`Selected ${property}: ${value}`);
    let r = {};
    
    if(property) {
      //Se è stata passata una proprietà per cui filtrare

      if(this.selected[property] === value) {
        //Se il valore è già selezionato, resetta
        this.selected[property] = null;
        r = data;
      } else {
        //Altrimenti
        if(value) {
          //Se c'è un filtro, restituisci il risultato
          this.selected[property] = value;
          r = data.filter(stamp => {
            if(stamp[property]) {
              return stamp[property].indexOf(value)>=0;
            } else {
              return [];
            }
          });
        } else {
          //Altrimenti, resetta
          this.selected[property] = null;
          r = data;
        }
      }

    } else {
      //Se non sono stati applicati filtri
      this.selected[property] = null;
      r = data;
    }
    return r;
  }

  onFilter(property: string, value?: string): void {
    this.filteredStamps = this.filterData(this.stamps, property, value);
  }

  //ToDo: naming
  distinctFromObjectsArray(array: object[], properties: string[]): object {
    let tmp = { };

    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      tmp[property] = [];
    }

    //Per ogni oggetto dell'array
    this.stamps.map(stamp => {
      //Per ogni proprietà dell'oggetto dell'array
      for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        
        //Per ogni valore della proprietà dell'oggetto dell'array, pusha
        stamp[property].map(p => {
          tmp[property].push(p);
        });
      }
    });

    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      tmp[property] = [...new Set(tmp[property])];
    }

    return tmp;
  }

  //ToDo: fare
  //ToDo: naming
  booleansObjectFromArray(obj: object) {
    return {};
  }

  constructor() { }

  ngOnInit(): void {
    this.datasources = this.distinctFromObjectsArray(this.stamps, ["country","category"]);
    // this.filters = this.booleansObjectFromArray(this.datasources);
    this.filteredStamps = this.filterData(this.stamps);
  }

}
