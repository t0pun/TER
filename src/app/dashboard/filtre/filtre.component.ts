import { Component, inject } from '@angular/core';
import { FormControl,FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltreService } from '../../filtre.service';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,RouterOutlet],
  templateUrl: './filtre.component.html',
  styleUrl: './filtre.component.css'
})
export class FiltreComponent {

  selectedOption = ''
  filtreService = inject(FiltreService)
  displayDate: boolean = true;

  applyForm = new FormGroup({

    granularite: new FormControl(''),
    date1: new FormControl(''),
    date2: new FormControl(''),

  });

  displayElement(): void {
    if(this.displayDate==true){
      this.displayDate = false;
    }else{
      this.displayDate = true;
    }
  }

  onSubmit(){
    this.filtreService.onSubmit(
      this.applyForm.get('selectedOption')?.value ?? 'a',
      this.applyForm.value.date2 ?? '',
      this.applyForm.value.date1 ?? '',
    )
  }

  isOption1Checked() {
    return this.applyForm.get('selectedOption')?.value === 'Annee';
  }

  onClick(){
    // console.log(this.data)
  }

}
