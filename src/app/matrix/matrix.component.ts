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
  
  initData() {
    this.storeIndex.map(group => {
      this.store[group].map(item=>{
        item.selected = false;
      });
    });
  }

  //prendi this.store[property] con id = value
  onNewFilter(property?: string, value?: string): void {
    //ToDo: aggiungere la deselezione e naming
    let selected = this.store[property].filter(r=>r.id==value);
    if(selected[0] && selected[0].selected) {
      //Se il valore era già selezionato, deseleziona
      this.initData();
    } else {
      //Se il valore non era selezionato, per ogni gruppo esistente
      this.storeIndex.map(group=>{
        this.store[group].map(item=>{
          //Se si tratta del gruppo del filtro
          if(group==property) {
            //Evidenzia solo il selezionato (un filtro per gruppo)
            item.selected = (item.id==value);
          } else {
            //Altrimenti, evidenzia quelle che corrispondono al filtro
            item.selected = item.links[property].indexOf(value)>=0;
          }
        });
      });
    }


  }

  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

}
