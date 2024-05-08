import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

  
  /**** Service to get the informations for the entity topic search ****/
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


  /**** Service to get the informations for the entity search ****/
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


  /**** Service to get the informations for the topic search ****/
  searchTopic(firstDate: string, lastDate: string, topic: string) :Observable<string[]>{
    let params = new HttpParams()
    .set('firstDate', firstDate)
    .set('lastDate', lastDate)
    .set('topic', topic);
    return this.http.get<string[]>('http://localhost:5000/search-topic', { params });
  }








  getTopics(): Observable<string[]> {
    return this.http.get<string[]>('http://127.0.0.1:5000/topics');
  }
}
