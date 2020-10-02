import { Component, OnInit } from '@angular/core';
// import { StampMatrix } from './stamp.matrix'; //M1
// import { Stamp } from './stamp'; //M2
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

  storeIndex = ["colors", "things", "categories"];
  store = {
    colors: [
      { id: 1, name: "Red", links: { things: [1,2,3], categories: [1,2,3] } },
      { id: 2, name: "White", links: { things: [4,5], categories: [3] } },
      { id: 3, name: "Green", links: { things: [6,7], categories: [1,2] } },
    ],
    things: [
      { id: 1, name: "Blood", links: { colors: [1], categories: [2] } },
      { id: 2, name: "Fire", links: { colors: [1], categories: [3] } },
      { id: 3, name: "Cherries", links: { colors: [1], categories: [1] } },
      { id: 4, name: "Sun", links: { colors: [2], categories: [3] } },
      { id: 5, name: "Snow", links: { colors: [2], categories: [3] } },
      { id: 6, name: "Grass", links: { colors: [3], categories: [2] } },
      { id: 7, name: "Avocado", links: { colors: [3], categories: [1,2] } },
    ],
    categories: [
      { id: 1, name: "Fruits", links: { colors: [1,3], things: [3,7] } },
      { id: 2, name: "Organic", links: { colors: [1,3], things: [1,3,6,7] } },
      { id: 3, name: "Physics", links: { colors: [1,2], things: [1,4,5] } },
    ]
  };
  filteredStore = {}; // = this.store
  
  initData() {
    this.storeIndex.map(group => {
      this.store[group].map(item=>{
        item.selected = false;
      });
    });

    this.filteredStore = this.store;
  }

  //prendi this.store[property] con id = value
  onNewFilter(property?: string, value?: string): void {
    console.log(`Selected ${property}: ${value}`);
    
    //Per ogni grouppo
    this.storeIndex.map(group=>{
      this.filteredStore[group].map(item=>{
        //Se si tratta del gruppo del filtro
        if(group==property) {
          //Evidenzia solo il selezionato
          item.selected = (item.id==value);
        } else {
          //Altrimenti, evidenzia quelle che corrispondono al filtro
          if(item.links[property].indexOf(value)>=0) {
            item.selected = true;
          } else {
            item.selected = false;
          }
        }
      });
    });

    // let tmp = {};

    // this.storeIndex.filter(group=>group!=property).map(group=> {
    //   tmp[group] = this.store[group].filter(item=> {
        
    //     console.log(`Search for ${property}:${value} in ${group}`, item.links[property]);
    //     return item.links[property].indexOf(value)>=0;
    //   });
    // });

    // tmp[property] = this.store[property];

    // this.filteredStore = tmp;
    // console.log("filtrati", this.filteredStore);
  }

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

    this.initData();
  }

}
