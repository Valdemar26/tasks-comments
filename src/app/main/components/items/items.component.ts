import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {

  items$: Observable<any>;
  input: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAllItems();
  }

  getAllItems() {
    this.dataService.getAllItems()
      .subscribe((res) => {
        this.items$ = res;
      });
  }

  addNewItem(input) {
    this.dataService.addNewItem(input)
      .subscribe((res) => {
        this.getAllItems();
      });

    this.input = '';
  }

  deleteItem(id) {
    this.dataService.deleteItem(id)
      .subscribe((res) => {
        this.getAllItems();
      });
  }

}
