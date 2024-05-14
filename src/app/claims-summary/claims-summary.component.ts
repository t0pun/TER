import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-claims-summary',
  standalone: true,
  imports: [],
  templateUrl: './claims-summary.component.html',
  styleUrl: './claims-summary.component.css'
})
export class ClaimsSummaryComponent {
  data: any;
  private apiUrlFalse = "http://127.0.0.1:5000/number_false"
  private apiUrlTrue = "http://127.0.0.1:5000/number_true"
  private apiUrlMixture = "http://127.0.0.1:5000/number_mixture"
  private apiUrlOther = "http://127.0.0.1:5000/number_other"
  private http = inject(HttpClient)
  trueNumber: any;
  mixtureNumber: any;
  falseNumber: any;
  otherNumber: any;

  ngOnInit(): void {
    this.fetchData();
  }

  private buildSummary(data1: string,data2: string,data3: string,data4: string): void {
    this.trueNumber = data1+" true claims";
    this.falseNumber = data2+" false claims";
    this.mixtureNumber = data3+" mixture claims";
    this.otherNumber = data4+" other claims";
}

  fetchData() {
    fetch(this.apiUrlTrue)
      .then(response => response.json())
      .then(data1 => {
        fetch(this.apiUrlFalse)
          .then(response => response.json())
          .then(data2 => {
            fetch(this.apiUrlMixture)
              .then(response => response.json())
              .then(data3 => {
                fetch(this.apiUrlOther)
                  .then(response => response.json())
                  .then(data4 => {
                    console.log()
                    this.buildSummary(data1['counts'],data2['counts'],data3['counts'],data4['counts'])
                  })
              })
          })
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}
