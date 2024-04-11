import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
<<<<<<< HEAD

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
=======
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, RouterModule],
>>>>>>> fe1a469bc0de1c4571770cc49cbbd6af44ecede6
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
<<<<<<< HEAD
=======
  title="ClaimsKG statistical"
>>>>>>> fe1a469bc0de1c4571770cc49cbbd6af44ecede6
}
