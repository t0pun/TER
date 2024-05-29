import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltreService } from '../filtre.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { ListeentityService } from '../listeentity.service';

@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterOutlet,
    MatTooltipModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css']
})
export class FiltreComponent {
  filtreService = inject(FiltreService);
  displayDate: boolean = true;
  suggestions!: Observable<string[]>;
  listeEntity: string[] = [];
  selectedEntity: string[] = [];

  applyForm = new FormGroup({
    granularite: new FormControl(''),
    date1: new FormControl(''),
    date2: new FormControl(''),
    selectedOption: new FormControl(''),
  });

  constructor(private listeEntityService: ListeentityService) {
    this.listeEntityService.data$.subscribe((data) => {
      this.listeEntity = data;
      this.updateDatalist();
    });
  }

  updateDatalist() {
    // Check if the datalist element already exists
    var datalist = document.getElementById('liste_entity');
    if (datalist) {
      datalist.innerHTML = ''; // Clear existing options
    } else {
      datalist = document.createElement('select');
      datalist.id = 'liste_entity';
      var div = document.getElementById('datalist');
      div?.appendChild(datalist);
    }

    // Add new options to the datalist
    this.listeEntity.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.innerHTML = option;
      datalist?.appendChild(optionElement);
    });
  }

  selectOption() {
    var inputElement = <HTMLInputElement>document.getElementById('liste_entity');
    var selectedValue = inputElement.value;

    if (selectedValue && !this.selectedEntity.includes(selectedValue)) {
      this.selectedEntity.push(selectedValue);

      var divContainer = <HTMLDivElement>document.getElementById('selected_entity');
      var newDiv = document.createElement('div');
      newDiv.className = 'selected-entity-item';
      newDiv.innerText = selectedValue;
      divContainer.appendChild(newDiv);
    }
  }

  displayElement(): void {
    this.displayDate = !this.displayDate;
  }

  onSubmit() {
    var granularite = '';
    
    if (this.applyForm.value.granularite === 'Annee') {
      granularite = 'annee';
    } else if (this.applyForm.value.granularite === 'Mois') {
      granularite = 'mois';
    }
    console.log("Granularité : "+granularite)
    this.filtreService.onSubmit(
      this.selectedEntity,
      granularite,
      this.applyForm.value.date2 ?? '',
      this.applyForm.value.date1 ?? ''
    );
  }

  isOption1Checked() {
    return this.applyForm.get('selectedOption')?.value === 'Annee';
  }

  onClick() {
    // Custom logic on click
  }
}
