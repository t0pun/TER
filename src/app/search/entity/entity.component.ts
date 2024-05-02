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
import { SearchService } from '../search.service';
@Component({
    selector: 'app-entity',
    standalone: true,
    templateUrl: './entity.component.html',
    styleUrl: './entity.component.css',
    imports: [ MatChipsModule,MatIconModule,CommonModule,NgIf, FormsModule, GraphLabelDateComponent,NgFor,MatAutocompleteModule,MatInputModule,MatSelectModule,MatFormFieldModule,ReactiveFormsModule]
})
export class EntityComponent {

  formEntity= new FormControl('');
  suggestions!: Observable<string[]>;
  selectedOptions: string[] = [];
  submitted : boolean = false;
  firstDate:string="";
  lastDate:string="";

  //test
  test: any=[];
  
  constructor(private suggestionService: SuggestionService, private searchService: SearchService){
    this.suggestions = this.formEntity.valueChanges.pipe(
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
    this.firstDate=first_date;
    this.lastDate=last_date;
    this.searchService.search(this.selectedOptions, this.firstDate, this.lastDate)
  .subscribe({
    next: (result) => {
      // Handle the data received from the search
      console.log('Search results:', result);
      alert(JSON.stringify(result)); // Using JSON.stringify to display the result object in alert
      this.test = result; // Assigning the result to this.test for other uses
    },
    error: (error) => {
      // Handle any errors that occur during the search
      console.error('Search failed:', error);
      alert('Search failed, please try again.');
    }
  });
    //TODO CSS à modifier
    console.log('Submitted value:', this.selectedOptions,this.firstDate,this.lastDate);

  }
}
