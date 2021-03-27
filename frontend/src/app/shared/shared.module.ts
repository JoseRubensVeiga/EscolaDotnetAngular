import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SidenavComponent } from './sidenav';
import { TopbarComponent } from './topbar';

@NgModule({
  declarations: [SidenavComponent, TopbarComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [SidenavComponent, TopbarComponent],
})
export class SharedModule {}
