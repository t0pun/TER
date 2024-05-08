import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(private http: HttpClient) { }

  getSuggestions(query: string): Observable<string[]> {
    const result= this.http.get<string[]>('http://localhost:5000/suggestions', { params: { query } });
    return result;
  }
}
