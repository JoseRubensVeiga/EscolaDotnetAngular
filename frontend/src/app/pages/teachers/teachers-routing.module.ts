import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherFormComponent } from './teacher-form';

import { TeachersComponent } from './teachers.component';

const routes: Routes = [
  { path: '', component: TeachersComponent },
  { path: ':id', component: TeacherFormComponent },
  { path: ':id/edit', component: TeacherFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRoutingModule {}
