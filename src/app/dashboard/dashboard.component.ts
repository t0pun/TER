import { Component, inject } from '@angular/core';
import { Graph1Component } from './graph1/graph1.component';
import { Graph2Component } from './graph2/graph2.component';
import { Graph3Component } from './graph3/graph3.component';
import { FiltreComponent } from './filtre/filtre.component';
// import { Graph4Component } from './graph4/graph4.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from '../home-page/home-page.component';
import { ClaimsSummaryComponent } from '../claims-summary/claims-summary.component';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [ClaimsSummaryComponent, CommonModule, RouterOutlet, FormsModule, HomePageComponent, ReactiveFormsModule, HttpClientModule, Graph1Component, Graph2Component, Graph3Component, FiltreComponent, NavigationBarComponent]
})
export class DashboardComponent {
    data: any;
    displayDate: boolean = true;

  }