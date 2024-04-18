import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-entity',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.css'
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
