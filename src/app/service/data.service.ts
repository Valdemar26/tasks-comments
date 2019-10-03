import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {filter, first, tap, map, switchMap, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = environment.baseUrl;

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

  setCommentByItemId(value, item) {

    let comments = [];
    let obj = {};
    return this.getAllItems().pipe(
      map(data => data.filter(i => i.id === item.id)),
      tap((data) => console.log(data)),
      mergeMap(response => {
        console.log(response);
        // comments.push(value);
        obj = Object.assign({}, item = {
          comments : [value]
        })
        return this.http.put(`${this.baseUrl}/items/${item.id}`, obj);
      })
    );

    // return this.http.put(`${this.baseUrl}/items/${item.id}`, obj);
  }

}
