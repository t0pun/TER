import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomePageComponent,
      title: 'Statistical Observatory'
    },
    {
      path: 'about',
      component: AboutComponent,
      title: 'About'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard'
    },  
    {
        path: 'search',
        component: SearchComponent,
        title: 'Search Graphs'
    },
    {
      path: 'contact',
      component: ContactComponent,
      title: 'Contact'
    }

  ];
  
  export default routeConfig;
