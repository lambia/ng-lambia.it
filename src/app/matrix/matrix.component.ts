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

  selected = {};
  //ToDo: cambiare nome
  //ToDo: check init null o {any}
  datasources = null;
  filters = null;

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
  distinctFromObjectsArray(array: object[], properties: string[]) {
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
          // Con questo ternario si può eliminare il for precedente, ma è meno efficiente
          // tmp[property] ? tmp[property].push(p) : tmp[property] = [p];
          tmp[property].push(p);
          // Con questo ternario si può eliminare il for successivo, ma è meno efficiente
          // tmp[property] = [...new Set(tmp[property])];
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
  booleansObjectFromArray(obj: object) {
    return {};
  }

  constructor() { }

  ngOnInit(): void {
    this.datasources = this.distinctFromObjectsArray(this.stamps, ["country","category"]);
    // this.filters = this.booleansObjectFromArray(this.datasources);
  }

}
