import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { DataService } from '../../../service/data.service';
import { first } from 'rxjs/operators';
import {AuthenticationService} from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {

  @Output() activeItemEvent: EventEmitter<any> = new EventEmitter<any>();

  items$: Observable<any>;
  input: string;
  activeItem: any = new BehaviorSubject(0);
  activeUser;

  constructor(
    private dataService: DataService,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.getAllItems();
    this.activeItem.subscribe();
    // this.activeUser = this.authService.currentUserSubject.subscribe();
  }

  getCurrentUSer() {
    return this.authService.currentUserValue;
  }

  getAllItems() {
    this.dataService.getAllItems()
      .pipe(first())
      .subscribe((res) => {
        this.items$ = res;
        console.log(this.items$)
      });
  }

  addNewItem(input) {
    this.dataService.addNewItem(input)
      .pipe(first())
      .subscribe((res) => {
        this.getAllItems();
      });

    this.input = '';
  }

  selectItem(item, id, index) {
    this.activeItem.next(index);
    this.activeItemEvent.emit({item, index});
  }

  deleteItem(item, index) {
    this.dataService.deleteItem(item.id)
      .pipe(first())
      .subscribe((res) => {
        this.getAllItems();
        index === 0 && !(index + 1)
          ? this.selectItem(this.items$[index + 1], this.items$[index + 1].id, index + 1)
          : this.selectItem(this.items$[index - 1], this.items$[index - 1].id, index - 1)
        this.dataService.item$.next({deleteItem: true});
      });
  }
}
