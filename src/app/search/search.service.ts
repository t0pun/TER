import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

  search(selectedEntities: string[], firstDate: string, lastDate: string) :Observable<string[]>{
    const result= this.http.get<string[]>('http://localhost:5000/search', { params: {selectedEntities, firstDate, lastDate} });
    console.log(result);
    return result;
  }

}
