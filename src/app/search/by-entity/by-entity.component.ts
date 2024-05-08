import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-by-entity',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './by-entity.component.html',
  styleUrl: './by-entity.component.css'
})
export class ByEntityComponent {
  submitted : boolean = false;
  topic: string = "";

  submit(topic:string){
    this.submitted=true;
    this.topic=topic;
    console.log('Submitted value:', this.topic);
  }
}
