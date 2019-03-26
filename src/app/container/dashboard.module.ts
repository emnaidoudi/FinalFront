import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';

import {RouterModule } from '@angular/router';







/* Material UI imports ends here */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // MatToolbarModule,
    // MatIconModule,
    // MatListModule,
    // MatSidenavModule,
    // MatFormFieldModule
  ],
  declarations: [SidebarComponent]
})
export class DashboardModule { }
