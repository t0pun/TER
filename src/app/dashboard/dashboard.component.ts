import { Component, inject } from '@angular/core';
import { Graph1Component } from './graph1/graph1.component';
import { Graph2Component } from './graph2/graph2.component';
import { Graph3Component } from './graph3/graph3.component';
import { Graph4Component } from './graph4/graph4.component';
import { Graph5Component } from '../graph5/graph5.component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { AppComponent } from '../app.component';
import { ClaimsSummaryComponent } from '../claims-summary/claims-summary.component';
import { FiltreComponent } from './filtre/filtre.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Graph1Component,Graph2Component,Graph3Component,Graph4Component,Graph5Component,AppComponent,ClaimsSummaryComponent,FiltreComponent,NavigationBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
