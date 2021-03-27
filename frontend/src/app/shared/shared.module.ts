import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav';
import { TopbarComponent } from './topbar';

@NgModule({
  declarations: [SidenavComponent, TopbarComponent],
  imports: [CommonModule],
  exports: [SidenavComponent, TopbarComponent],
})
export class SharedModule {}
