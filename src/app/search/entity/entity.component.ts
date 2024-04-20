import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphLabelDateComponent } from "./graph-label-date/graph-label-date.component";
@Component({
    selector: 'app-entity',
    standalone: true,
    templateUrl: './entity.component.html',
    styleUrl: './entity.component.css',
    imports: [NgIf, FormsModule, GraphLabelDateComponent]
})
export class EntityComponent {
  submitted : boolean = false;
  entity: string = "";

  submit(entity:string){
    this.submitted=true;
    this.entity=entity;
    console.log('Submitted value:', this.entity);
  }
}
