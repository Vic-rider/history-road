import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeManagementComponent } from './home-management.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path: '',
          component: HomeManagementComponent,
          children: [
            {
              path: '',
              component: HomeComponent
            },
            {
              path: 'about',
              component: AboutComponent
            },
            {
              path: 'contact',
              component: ContactComponent
            },
            {
              path: 'page1',
              component: Page1Component
            },
            {
              path: 'page2',
              component: Page2Component
            }
          ]
        },
        {
          path: '**',
          redirectTo: '',
          pathMatch: 'full'
        }
      ]
    )
  ],
  declarations: [
    HomeManagementComponent,
    AboutComponent,
    ContactComponent,
    Page1Component,
    Page2Component
  ]
})
export class HomeManagementModule { }
