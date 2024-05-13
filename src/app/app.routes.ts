import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomePageComponent,
      title: 'Home page'
    },
    {
      path: 'apropos',
      component: AboutComponent,
      title: 'A propos'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard'
    },  
    {
        path: 'search',
        component: SearchComponent,
        title: 'Search'
      }

  ];
  
  export default routeConfig;
