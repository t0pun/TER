import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgFor, NgIf,  CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { Graph3Component } from "./graph3/graph3.component";
import { Graph2Component } from "./graph2/graph2.component";
import { Graph1Component } from "./graph1/graph1.component";
@Component({
    selector: 'app-by-entity-by-topic',
    standalone: true,
    templateUrl: './by-entity-by-topic.component.html',
    styleUrl: './by-entity-by-topic.component.css',
    imports: [MatTooltipModule, MatChipsModule, MatIconModule, CommonModule, NgIf, FormsModule, NgFor, MatAutocompleteModule, MatInputModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, NavigationBarComponent, Graph3Component, Graph2Component, Graph1Component]
})
export class ByEntityByTopicComponent  {
  topics: string[] = [];
  selectedTopic: string ="";
  formEntity = new FormControl({ value: '', disabled: true });

  suggestions!: Observable<string[]>;
  selectedOptions: string[]=[] ;
  submitted : boolean = false;
  firstDate:string="";
  lastDate:string="";
  entityData: any;
  entityData2: any;
  entityData3: any;

  
  constructor(private suggestionService: SuggestionService, private searchService: SearchService){

this.suggestions = this.formEntity.valueChanges.pipe(
    startWith(''),
    map(value => value || ''), // Ensure the value is never null
    debounceTime(300), // Add a delay to prevent calling API on each keystroke
    distinctUntilChanged(), // Skip consecutive duplicate values
    filter(term => term.trim().length >= 2), // Check that the term is at least two characters long
    switchMap((term: string) =>
        this.suggestionService.getSuggestionsTopic(term,this.selectedTopic) || of([]) // Call your service only if the above filter passes
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
  onTopicChange() {
    console.log("changein");
    if (this.selectedTopic) {
      this.formEntity.enable();
    } else {
      this.formEntity.disable();
    }
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
       if(this.selectedTopic && this.selectedOptions){
      console.log("Entity-Topic service called");
      this.searchService.searchTopicEntity1(this.selectedOptions, this.firstDate, this.lastDate,this.selectedTopic)
      .subscribe({
        next: (result1) => {
          // Handle the data received from the search
          console.log('Search results dates:', result1);
          this.entityData=result1; // Emit the result to parent component
        },
        error: (error1) => {
          // Handle any errors that occur during the search
          console.error('Search failed:', error1);
          alert('Search failed, please try again.');
        }
      });
    
    
    this.searchService.searchTopicEntity2(this.selectedOptions, this.firstDate, this.lastDate,this.selectedTopic)
      .subscribe({
        next: (result2) => {
          // Handle the data received from the search
          console.log('Search results labels:', result2);
          this.entityData2=result2;
        },
        error: (error2) => {
          // Handle any errors that occur during the search
          console.error('Search failed:', error2);
          alert('Search failed, please try again.');
        }
      });
    
    this.searchService.searchTopicEntity3(this.selectedOptions, this.firstDate, this.lastDate,this.selectedTopic)
      .subscribe({
        next: (result3) => {
          // Handle the data received from the search
          console.log('Search results sources:', result3);
          this.entityData3=result3;
        },
        error: (error3) => {
          // Handle any errors that occur during the search
          console.error('Search failed:', error3);
          alert('Search failed, please try again.');
        }
      });
    }
  
    console.log('Submitted values:', this.selectedOptions,this.firstDate,this.lastDate, this.selectedTopic);

  }

}
