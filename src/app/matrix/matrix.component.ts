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

  itemsFields = ["colors", "things", "categories"];
  items = {
    colors: [
      { id: 1, name: "Red", fields: { things: [1,2,3], categories: [1,2,3] } },
      { id: 2, name: "White", fields: { things: [4,5], categories: [3] } },
      { id: 3, name: "Green", fields: { things: [6,7], categories: [1,2] } },
    ],
    things: [
      { id: 1, name: "Blood", fields: { colors: [1], categories: [2] } },
      { id: 2, name: "Fire", fields: { colors: [1], categories: [3] } },
      { id: 3, name: "Cherries", fields: { colors: [1], categories: [1] } },
      { id: 4, name: "Sun", fields: { colors: [2], categories: [3] } },
      { id: 5, name: "Snow", fields: { colors: [2], categories: [3] } },
      { id: 6, name: "Grass", fields: { colors: [3], categories: [2] } },
      { id: 7, name: "Avocado", fields: { colors: [3], categories: [1,2] } },
    ],
    categories: [
      { id: 1, name: "Fruits", fields: { colors: [1,3], things: [3,7] } },
      { id: 2, name: "Organic", fields: { colors: [1,3], things: [1,3,6,7] } },
      { id: 3, name: "Physics", fields: { colors: [1,2], things: [1,4,5] } },
    ]
  };
  selected = { field: null, value: null };

  //ToDo: typing e model
  //Imposta "selected" per gli oggetti con il valore "value" nella proprietà id dell'oggetto "field"
  fieldFiltering(data: object, fields: string[], field?: string, value?: string): void {
      //Se non sono stati forniti gruppo e valore per cui filtrare
      if(!field || !value) {
        //Per ogni gruppo esistente
        fields.map(itemsField=>{
          //Per ogni elemento
          data[itemsField].map(item=>{
            item.selected = true; //cfg.AllSelectedOnLoad
          });
        });
      //Se sono stati forniti gruppo e valore per cui filtrare
      } else {
        //per ogni gruppo esistente
        fields.map(itemsField=>{
          //Per ogni elemento
          data[itemsField].map(item=>{
            //Se si tratta del gruppo del filtro
            if(itemsField==field) {
              //Evidenzia solo il selezionato (un filtro per gruppo)
              item.selected = (item.id==value);
            } else {
              //Altrimenti, evidenzia quelle che corrispondono al filtro
              item.selected = item.fields[field].indexOf(value)>=0;
            }
          });
        });

      }
  }

  onFilter(field: string, value: string): void {
    //Se il valore era già selezionato, deseleziona
    if(this.selected.field==field && this.selected.value==value) {
      field = value = null;
    }
    
    this.selected = { field, value };
    this.fieldFiltering(this.items, this.itemsFields, field, value);
  }

  initData(): void {    
    this.selected = { field: null, value: null };
    this.fieldFiltering(this.items, this.itemsFields);
  }

  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

}
