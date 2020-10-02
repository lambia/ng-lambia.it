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

  onFilter(property?: string, value?: string): void {
    //Se il valore era già selezionato
    if(this.selected[property] === value || !property || !value) {
      //ToDo: settare in this.filters invece che in selected
      this.selected[property] = null;
      this.filteredStamps = this.stamps;
    } else {
      //ToDo: settare in this.filters invece che in selected
      this.selected[property] = value;
      this.filteredStamps = this.filterData(this.stamps, property, value);
    }
  }
  
  //ToDo: filtri multipli
  //ToDo: selected deve essere un oggetto con tutti i possibili valori, da settare true o false
  filterData(data: object[], property: string, value: string): {} {
    console.log(`Selected ${property}: ${value}`);

    //Restituisci i risultati per quel valore in quella proprietà (where property = value)
    //Il ternario serve a non farlo spaccare in caso di proprietà non esistenti
    return data.filter(stamp => stamp[property] ? stamp[property].indexOf(value)>=0 : false);
  }

  //ToDo: naming
  distinctFromObjectsArray(array: object[], properties: string[]): object {
    let tmp = [];

    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      tmp[property] = [];
    }

    //Per ogni oggetto dell'array
    array.map(stamp => {
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

  //ToDo: naming
  //ToDo: typing
  //ToDo doppio for sostituibile
  booleansObjectFromArray(obj, properties) {
    let tmp = [];

    //Per ognuna delle proprietà
    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      //Per ognuno dei valori della proprietà
      for (let j = 0; j < obj[property].length; j++) {
        const element = obj[property][j];
        //Crea un array
        if(!tmp[property]){
          tmp[property] = {};
        }
        //E inizializza a false
        tmp[property][element] = false;
      }
    }

    return tmp;
  }

  constructor() { }

  ngOnInit(): void {
    this.datasources = this.distinctFromObjectsArray(this.stamps, ["country","category"]);
    console.log(this.datasources);
    // this.filters = 
    this.filters = this.booleansObjectFromArray(this.datasources, ["country","category"]);
    console.log(this.filters);
    this.filteredStamps = this.stamps; //ToDo: usare funzione
  }

}
