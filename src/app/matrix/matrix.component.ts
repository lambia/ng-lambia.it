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

  selectedStamp: Stamp;
  onSelect(stamp: Stamp): void {
    this.selectedStamp = stamp;
    console.log("Selected stamp: ", stamp.id);
  }

  constructor() { }

  ngOnInit(): void {
    console.log("Matrix init ok");
  }

}
