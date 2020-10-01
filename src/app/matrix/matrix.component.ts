import { Component, OnInit } from '@angular/core';
import { Matrix } from '../matrix';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})

export class MatrixComponent implements OnInit {

  matrix: Matrix = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() { }

  ngOnInit(): void {
    console.log("Matrix init ok");
  }

}
