import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  item$: Subject<boolean> = new Subject();

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/items`);
  }

  addNewItem(value): Observable<any> {
    const item = {
      content: value,
      comments: []
    };
    return this.http.post(`${this.baseUrl}/items`, item);
  }

  deleteItem(id) {
    return this.http.delete(`${this.baseUrl}/items/${id}`);
  }

  setCommentByItemId(value, selectedItem) {
    const selectedItemId = selectedItem.id;

    let comment = [];
    let obj = {};
    return this.getAllItems().pipe(
      map(data => data.filter(i => i.id === selectedItem.id)),
      switchMap(response => {
        comment = [...comment];
        comment.push(value);

        obj = Object.assign(selectedItem, {
          comments : [...selectedItem.comments].concat(comment),
        });
        return this.http.put(`${this.baseUrl}/items/${selectedItemId}`, obj);
      })
    );
  }

}
