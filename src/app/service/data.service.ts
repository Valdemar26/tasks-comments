import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
