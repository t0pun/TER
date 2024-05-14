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

  filtreService = inject(FiltreService)
  displayDate: boolean = true;

  applyForm = new FormGroup({

    mois: new FormControl(''),
    annee : new FormControl(''),
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
    var granularite = ""
    if(this.applyForm.value.annee=="Annee"){
      granularite = "/"+"annee"
    }else if(this.applyForm.value.mois=="Mois"){
      granularite = "/"+"mois"
    }
    this.filtreService.onSubmit(
      granularite,
      this.applyForm.value.date2 ?? '',
      this.applyForm.value.date1 ?? ''
    )
  }

  isOption1Checked() {
    return this.applyForm.get('selectedOption')?.value === 'Annee';
  }

  onClick(){
    // console.log(this.data)
  }

}
