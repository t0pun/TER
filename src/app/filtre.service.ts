import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltreService {
  private apiUrl_first_graph = ""
  private apiUrl_top_entity_graph = ""
  private submitTriggeredSource = new Subject<void>();
  private submitTriggeredTopEntity = new Subject<void>();
  submitTriggered$ = this.submitTriggeredSource.asObservable();
  submitTriggeredTopEntity$ = this.submitTriggeredTopEntity.asObservable();
  data: any
  
  constructor(private http: HttpClient) { 

  }

  triggerSubmit() {
    this.submitTriggeredSource.next();
  }

  onSubmit(granularite: string,debut: string, fin: string){
    this.apiUrl_first_graph = "http://127.0.0.1:5000/json_born_date/"+debut+"/"+fin
    this.apiUrl_top_entity_graph = "http://127.0.0.1:5000/json_born_entity/"+debut+"/"+fin
    console.log(this.apiUrl_first_graph)
    this.submitTriggeredSource.next();
    this.submitTriggeredTopEntity.next();

  }

  fetchDataFirstGraph() :Observable<any[]>{
    var results = this.http.get<any>(this.apiUrl_first_graph)
    return results;
}

fetchDataTopEntity() :Observable<any[]>{
  var results = this.http.get<any>(this.apiUrl_top_entity_graph)
  return results;
}
}
