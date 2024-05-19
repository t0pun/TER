import { Component, inject } from '@angular/core';
import { FormControl,FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltreService } from '../filtre.service';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule} from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { ListeentityService } from '../listeentity.service';

@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,RouterOutlet,MatTooltipModule, MatChipsModule,MatIconModule,MatAutocompleteModule,MatInputModule,MatSelectModule,MatFormFieldModule],
  templateUrl: './filtre.component.html',
  styleUrl: './filtre.component.css'
})
export class FiltreComponent {

  filtreService = inject(FiltreService)
  displayDate: boolean = true;
  suggestions!: Observable<string[]>;
  listeEntity: string[] = [];
  selectedEntity : string[] = [];

  applyForm = new FormGroup({

    month: new FormControl(''),
    year : new FormControl(''),
    date1: new FormControl(''),
    date2: new FormControl(''),
    selectedOption : new FormControl(''),

  });

  constructor(private listeEntityService : ListeentityService){
    this.listeEntityService.data$.subscribe((data) => {
      this.listeEntity = data;
      
      // Créer l'élément <input>
      var inputElement = document.createElement('input');
      inputElement.id = "liste_entity";

      // Créer l'élément <datalist>
      var div = document.getElementById('datalist');
      var datalist = document.createElement('select')
      datalist.id = "liste_entity"
      this.listeEntity.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.innerHTML = option;

      datalist.appendChild(optionElement);

  });

  // Ajouter le <datalist> à l'<input>
      div?.appendChild(datalist)
    });

  }
  selectOption(): any {
    var inputElement = <HTMLInputElement>document.getElementById("liste_entity")
      this.selectedEntity.push(inputElement.value)
      var div = <HTMLDivElement>document.getElementById("selected_entity")
      div.innerHTML = this.selectedEntity.toString()
  }


  displayElement(): void {
    if(this.displayDate==true){
      this.displayDate = false;
    }else{
      this.displayDate = true;
    }
  }

  onSubmit(){
    var granularite = ""
    if(this.applyForm.value.year=="Year"){
      granularite = "/"+"annee"
    }else if(this.applyForm.value.month=="Month"){
      granularite = "/"+"mois"
    }
    this.filtreService.onSubmit(
      granularite,
      this.applyForm.value.date2 ?? '',
      this.applyForm.value.date1 ?? ''
    )
  }

  isOption1Checked() {
    return this.applyForm.get('selectedOption')?.value === 'Year';
  }

  onClick(){
    // console.log(this.data)
  }

}
