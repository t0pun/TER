import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph4',
  standalone: true,
  imports: [],
  templateUrl: './graph4.component.html',
  styleUrl: './graph4.component.css'
})
export class Graph4Component implements OnInit{
  ngOnInit(): void {
    this.buildChart();
  }

  private buildChart(): void {}
}
