import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-by-topic',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './by-topic.component.html',
  styleUrl: './by-topic.component.css'
})
export class ByTopicComponent {
  submitted : boolean = false;
  source: string = "";

  submit(source:string){
    this.submitted=true;
    this.source=source;
    console.log('Submitted value:', this.source);
  }
}
