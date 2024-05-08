import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

  searchEntityTopic(selectedEntities: string[], firstDate: string, lastDate: string, topic: string) :Observable<string[]>{
    let params = new HttpParams()
    .set('firstDate', firstDate)
    .set('lastDate', lastDate)
    .set('topic', topic);

  // Append each `selectedEntity` as a separate query parameter
    selectedEntities.forEach((entity) => {
      params = params.append('selectedEntities', entity);
    });
  return this.http.get<string[]>('http://localhost:5000/search-entity-topic', { params });
  }

  searchEntity(selectedEntities: string[], firstDate: string, lastDate: string) :Observable<string[]>{
    let params = new HttpParams()
    .set('firstDate', firstDate)
    .set('lastDate', lastDate)

  // Append each `selectedEntity` as a separate query parameter
    selectedEntities.forEach((entity) => {
      params = params.append('selectedEntities', entity);
    });

  return this.http.get<string[]>('http://localhost:5000/search-entity', { params });
  }

  getTopics(): Observable<string[]> {
    return this.http.get<string[]>('http://127.0.0.1:5000/topics');
  }
}
