import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { AppSideLoginComponent } from './authentication/side-login/side-login.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Starter' },
      ],
    },
  },

  // {
  //   path: '',
  //   component: AppSideLoginComponent,
  //   data: {
  //     title: 'login',
  //     urls: [
  //       { title: 'login', url: '/authentication/login' },
  //       { title: 'login' },
  //     ],
  //   },
  // },


  // {path: '', redirectTo: 'authentication/login', pathMatch: 'full', children: [
  //   {
  //     path: 'authentication/login', component: AppSideLoginComponent, title: 'Login'
  //   },
  // ]},
];
