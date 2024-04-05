import { Component, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Requester } from '../../models/Requester';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  constructor() {}

  onSubmit(form: NgForm) {
    const formValues = form.value;
    const query = new Requester();
    query.configureWithQueyParams(formValues);
    console.log(query.toSPARQL());
  }
}

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ SearchComponent ],
  bootstrap:    [ SearchComponent ]
})
export class AppModule { }