import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf,  CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphLabelDateComponent } from "./graph-label-date/graph-label-date.component";
import { SuggestionService } from './suggestion.service';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, filter, map, of, startWith, switchMap } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule} from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-entity',
    standalone: true,
    templateUrl: './entity.component.html',
    styleUrl: './entity.component.css',
    imports: [ CommonModule,NgIf, FormsModule, GraphLabelDateComponent,NgFor,MatAutocompleteModule,MatInputModule,MatSelectModule,MatFormFieldModule,ReactiveFormsModule]
})
export class EntityComponent implements OnInit{
//tuto
  colorsArray=['Red','Green','Yellow']
  name = new FormControl('');
  suggestions!: Observable<string[]>;

  submitted : boolean = false;
  entity: string ="";
  first_date:string="";
  last_date:string="";
  
  constructor(private suggestionService: SuggestionService){
    this.suggestions = this.name.valueChanges.pipe(
      startWith(''),
      map(value => value || ''), // Ensure the value is never null
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term.trim() !== ''),  // Filter out empty or whitespace-only strings
      switchMap((term: string) => this.suggestionService.getSuggestions(term) || of([])),  // Switch to new search observable each time the term changes
      catchError(error => {
          console.error(error);
          return of([]);
      })
  );
  }
  ngOnInit(): void {
    
  }
  submit(entity:string, first_date:string, last_date:string){
    this.submitted=true;
    this.entity=entity;
    this.first_date=first_date;
    this.last_date=last_date;
    console.log('Submitted value:', this.entity,this.first_date,this.last_date);
  }
}
