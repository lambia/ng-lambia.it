import { Component, OnInit } from '@angular/core';
import { colors, things, categories } from '../interfaces/items.mock';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})

export class MatrixComponent implements OnInit {

  items = { colors, things, categories };
  itemsFields = ["colors", "things", "categories"];
  selected = { field: null, value: null };

  //ToDo: typing e model
  //Imposta "selected" per gli oggetti con il valore "value" nella proprietà id dell'oggetto "field"
  fieldFiltering(data: object, fields: string[], field?: string, value?: string): void {
      //Se non sono stati forniti gruppo e valore per cui filtrare
      if(!field || !value) {
        //Per ogni gruppo esistente
        fields.map(itemsField=>{
          //Per ogni elemento
          //ToDo: se esiste un fields che non esiste come proprietà nel data, ritorna errore
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
