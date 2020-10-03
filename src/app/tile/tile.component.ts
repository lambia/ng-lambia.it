import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  
  @Input() name: string; //Label
  @Input() icon: string; //Icon to show instead of name, optional
  @Input() link: string; //Link
  @Input() text: string; //What to show instead of link, optional

  constructor() { }

  ngOnInit(): void {
  }

}
