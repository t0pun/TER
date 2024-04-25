import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphLabelDateComponent } from "./graph-label-date/graph-label-date.component";
import { SuggestionService } from './suggestion.service';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, filter, of, switchMap } from 'rxjs';
import { AutoCompleteModule } from 'primeng/autocomplete';
@Component({
    selector: 'app-entity',
    standalone: true,
    templateUrl: './entity.component.html',
    styleUrl: './entity.component.css',
    imports: [NgIf, FormsModule, GraphLabelDateComponent,NgFor,AutoCompleteModule]
})
export class EntityComponent {
  searchTerms = new Subject<string>();
  suggestions$: Observable<string[]>;

  submitted : boolean = false;
  entity: string ="";
  first_date:string="";
  last_date:string="";
  
  constructor(private suggestionService: SuggestionService){
    this.suggestions$ = this.searchTerms.pipe(
      debounceTime(300),        // Wait 300ms after each keystroke before considering the term
      distinctUntilChanged(),   // Ignore new term if same as previous term
      filter(term => term.trim() !== ''),  // Filter out empty or whitespace-only strings
      switchMap((term: string) => term ? this.suggestionService.getSuggestions(term) :
        of([])),                // Switch to new search observable each time the term changes
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );
  }
  submit(entity:string, first_date:string, last_date:string){
    this.submitted=true;
    this.entity=entity;
    this.first_date=first_date;
    this.last_date=last_date;
    console.log('Submitted value:', this.entity,this.first_date,this.last_date);
  }
}
