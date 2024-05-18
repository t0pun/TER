import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListeentityService {
  private dataSubject = new BehaviorSubject<string[]>([]);
  data$ = this.dataSubject.asObservable();

  updateData(newData: string[]) {
    this.dataSubject.next(newData);
  }
}
