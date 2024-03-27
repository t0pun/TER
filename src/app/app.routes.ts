import { Routes } from '@angular/router';
import { PagePrincipaleComponent } from './page-principale/page-principale.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routeConfig: Routes = [
    {
      path: '',
      component: PagePrincipaleComponent,
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
