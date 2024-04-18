import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {
  submitted : boolean = false;
  topic: string = "";

  submit(topic:string){
    this.submitted=true;
    this.topic=topic;
    console.log('Submitted value:', this.topic);
  }
}
