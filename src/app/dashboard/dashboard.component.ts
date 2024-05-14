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
import { PagePrincipaleComponent } from '../page-principale/page-principale.component';
import { ClaimsSummaryComponent } from '../claims-summary/claims-summary.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [ClaimsSummaryComponent,CommonModule,RouterOutlet,FormsModule,PagePrincipaleComponent,ReactiveFormsModule,HttpClientModule, Graph1Component, Graph2Component, Graph3Component,Graph5Component, ResumeComponent]
})
export class DashboardComponent {
    data: any;
    private apiUrl = "http://127.0.0.1:5000/resume"
    private http = inject(HttpClient)
    constructor(){
      this.fetchData()
    }
    fetchData(){

    }
  }