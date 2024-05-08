import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf,  CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphLabelDateComponent } from "./graph-label-date/graph-label-date.component";
import { SuggestionService } from '../suggestion.service';
import { Observable, catchError, debounceTime, distinctUntilChanged, filter, map, of, startWith, switchMap } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule} from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { SearchService } from '../search.service';
@Component({
    selector: 'app-by-entity-by-theme',
    standalone: true,
    templateUrl: './by-entity-by-theme.component.html',
    styleUrl: './by-entity-by-theme.component.css',
    imports: [ MatChipsModule,MatIconModule,CommonModule,NgIf, FormsModule, GraphLabelDateComponent,NgFor,MatAutocompleteModule,MatInputModule,MatSelectModule,MatFormFieldModule,ReactiveFormsModule]
})
export class ByEntityByThemeComponent {
  topics: string[] = [];
  selectedTopic: string ="";

  formEntity= new FormControl('');
  suggestions!: Observable<string[]>;
  selectedOptions: string[]=[] ;
  submitted : boolean = false;
  firstDate:string="";
  lastDate:string="";


  
  constructor(private suggestionService: SuggestionService, private searchService: SearchService){
    // 
this.suggestions = this.formEntity.valueChanges.pipe(
    startWith(''),
    map(value => value || ''), // Ensure the value is never null
    debounceTime(300), // Add a delay to prevent calling API on each keystroke
    distinctUntilChanged(), // Skip consecutive duplicate values
    filter(term => term.trim().length >= 2), // Check that the term is at least two characters long
    switchMap((term: string) =>
        this.suggestionService.getSuggestions(term) || of([]) // Call your service only if the above filter passes
    ),
    catchError(error => {
        console.error(error);
        return of([]);
    })
);

  this.searchService.getTopics().subscribe((data) => {
    this.topics = data;
  });
  }

  optionClicked(event: Event, option: string) {
    event.stopPropagation(); // Prevents the mat-option click from closing the autocomplete panel
    this.toggleSelection(option);
  }
  // Adds the suggestion after selecting it to the top if the option was aleady chosen or add it at the bottom if not
  toggleSelection(option: string) {
    if(this.selectedOptions){
    const idx = this.selectedOptions.indexOf(option);
    if (idx > -1) {
      this.selectedOptions.splice(idx, 1);
    } else {
      this.selectedOptions.push(option);
    }
    this.formEntity.setValue('');}
  }

  submit( first_date:string, last_date:string){
    this.submitted=true;
    this.firstDate=first_date;
    this.lastDate=last_date;
    if(this.selectedOptions && !this.selectedTopic){
      console.log("Entity service called");
      this.searchService.searchEntity(this.selectedOptions, this.firstDate, this.lastDate)
    .subscribe({
    next: (result) => {
      // Handle the data received from the search
      console.log('Search results:', result);
      alert(JSON.stringify(result)); // Using JSON.stringify to display the result object in alert
    },
    error: (error) => {
      // Handle any errors that occur during the search
      console.error('Search failed:', error);
      alert('Search failed, please try again.');
    }
  });}
    else if(this.selectedTopic && this.selectedOptions){
      console.log("Entity-Topic service called");
      this.searchService.searchEntityTopic(this.selectedOptions, this.firstDate, this.lastDate,this.selectedTopic)
      .subscribe({
        next: (result2) => {
          // Handle the data received from the search
          console.log('Search results:', result2);
          alert(JSON.stringify(result2)); // Using JSON.stringify to display the result object in alert
        },
        error: (error2) => {
          // Handle any errors that occur during the search
          console.error('Search failed:', error2);
          alert('Search failed, please try again.');
        }
      });
    }
    //TODO CSS à modifier
    console.log('Submitted values:', this.selectedOptions,this.firstDate,this.lastDate, this.selectedTopic);

  }

}
