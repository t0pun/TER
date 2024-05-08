import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf,  CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../search.service';
@Component({
  selector: 'app-by-topic',
  standalone: true,
  imports: [CommonModule,NgIf, FormsModule,NgFor, ReactiveFormsModule],
  templateUrl: './by-topic.component.html',
  styleUrl: './by-topic.component.css'
})
export class ByTopicComponent {
  topics: string[] = [];
  selectedTopic: string ="";

  formEntity= new FormControl('');

  submitted : boolean = false;
  firstDate:string="";
  lastDate:string="";


  
  constructor(private searchService: SearchService){
    this.searchService.getTopics().subscribe((data) => {
      this.topics = data;
    });
  }
  submit( first_date:string, last_date:string){
    this.submitted=true;
    this.firstDate=first_date;
    this.lastDate=last_date;
    if(this.selectedTopic){
      console.log("Entity service called");
      this.searchService.searchTopic(this.firstDate, this.lastDate,this.selectedTopic)
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

    console.log('Submitted values:', this.firstDate,this.lastDate, this.selectedTopic);

  }

}


