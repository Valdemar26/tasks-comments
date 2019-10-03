import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  item: any;

  constructor() { }

  ngOnInit() {
  }

  getSelectedItemId(e) {
    this.item = e;
  }

}
