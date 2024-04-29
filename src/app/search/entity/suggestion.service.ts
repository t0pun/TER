import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  getFilteredEntities(term: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getSuggestions(query: string): Observable<string[]> {
    console.log(this.http.get<string[]>('http://localhost:5000/suggestions', { params: { query } }));
    return this.http.get<string[]>('http://localhost:5000/suggestions', { params: { query } });
  }
}
