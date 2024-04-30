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
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
@Component({
    selector: 'app-entity',
    standalone: true,
    templateUrl: './entity.component.html',
    styleUrl: './entity.component.css',
    imports: [ MatChipsModule,MatIconModule,CommonModule,NgIf, FormsModule, GraphLabelDateComponent,NgFor,MatAutocompleteModule,MatInputModule,MatSelectModule,MatFormFieldModule,ReactiveFormsModule]
})
export class EntityComponent {

  // Suggestions:
  formEntity= new FormControl('');
  suggestions!: Observable<string[]>;
  selectedOptions: string[] = [];



  submitted : boolean = false;
  first_date:string="";
  last_date:string="";
  
  constructor(private suggestionService: SuggestionService){
    this.suggestions = this.formEntity.valueChanges.pipe(
      startWith(''),
     // map(value=> this._filter(value|| ''))
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

  optionClicked(event: Event, option: string) {
    event.stopPropagation(); // Prevents the mat-option click from closing the autocomplete panel
    this.toggleSelection(option);
  }
  // Adds the suggestion after selecting it to the top if the option was aleady chosen or add it at the bottom if not
  toggleSelection(option: string) {
    const idx = this.selectedOptions.indexOf(option);
    if (idx > -1) {
      this.selectedOptions.splice(idx, 1);
    } else {
      this.selectedOptions.push(option);
    }
    this.formEntity.setValue('');
  }

  submit( first_date:string, last_date:string){
    this.submitted=true;
    this.first_date=first_date;
    this.last_date=last_date;
    //TODO add a function to call the service with the parameters so it can return us the graphs
    console.log('Submitted value:', this.selectedOptions,this.first_date,this.last_date);

  }
}
