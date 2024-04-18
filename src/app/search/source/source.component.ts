import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-source',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './source.component.html',
  styleUrl: './source.component.css'
})
export class SourceComponent {
  submitted : boolean = false;
  source: string = "";

  submit(source:string){
    this.submitted=true;
    this.source=source;
    console.log('Submitted value:', this.source);
  }
}
