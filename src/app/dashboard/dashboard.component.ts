import { Component, inject } from '@angular/core';
import { Graph1Component } from './graph1/graph1.component';
import { Graph2Component } from './graph2/graph2.component';
import { Graph3Component } from './graph3/graph3.component';
import { Graph5Component } from './graph5/graph5.component';
// import { Graph4Component } from './graph4/graph4.component';
import { ResumeComponent } from "../resume/resume.component";
import { ApiService } from '../api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Graph4Component } from './graph4/graph4.component';
import { AppComponent } from '../app.component';
import { PagePrincipaleComponent } from '../page-principale/page-principale.component';
import { ClaimsSummaryComponent } from '../claims-summary/claims-summary.component';
import { FiltreComponent } from './filtre/filtre.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Graph1Component,Graph2Component,Graph3Component,Graph4Component,AppComponent,PagePrincipaleComponent,ClaimsSummaryComponent,FiltreComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
